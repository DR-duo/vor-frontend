import RuneterraAPI from "./RuneterraAPI";

export default class RuneterraAdapter {
  constructor() {
    this.api = new RuneterraAPI();
    this.screenSize = null;
  }

  /**
   * According to docs, TopLeftX and TopLeftY have origins from bottom left
   * Therefore, we check for the following
   *
   *   ---------> TopLeftX
   *               ____________________
   *   TopLeftY   |                    |
   *      ^       |                    |
   *      |       |                    |
   *      |       |        CARD        | Height
   *      |       |                    |
   *      |       |                    |
   *      |       |____________________|
   *                     Width
   */
  getCardAtCord(x, y) {
    return this.api.endpointPositionalRectangles().then(data => {
      console.log(data.Rectangles);
      window.Twitch.ext.rig.log(data.Screen);
      window.Twitch.ext.rig.log(this.screenSize);

      const ratioX = data.Screen.ScreenWidth / this.screenSize.x;
      const ratioY = data.Screen.ScreenHeight / this.screenSize.y;

      const card = data.Rectangles.find(
        ({ CardCode, TopLeftX, TopLeftY, Height, Width }) => {
          const left = TopLeftX;
          const right = TopLeftX + Width;
          const top = TopLeftY;
          const bottom = TopLeftY - Height;
          const gameX = x * ratioX;
          const gameY = -(y * ratioY - data.Screen.ScreenHeight);

          if (
            gameX >= left &&
            gameX <= right &&
            gameY <= top &&
            gameY >= bottom
          ) {
            return true;
          }
        }
      );

      return card || null;
    });
  }

  getAllCards() {
    return this.api.endpointPositionalRectangles().then(data =>
      data.Rectangles.map(card => {
        const ratioX = this.screenSize.x / data.Screen.ScreenWidth;
        const ratioY = this.screenSize.y / data.Screen.ScreenHeight;

        return {
          Width: card.Width * ratioX,
          Height: card.Height * ratioY,
          TopLeftX: card.TopLeftX * ratioX,
          TopLeftY: -(card.TopLeftY * ratioY - this.screenSize.y),
          CardID: card.CardID,
          CardCode: card.CardCode,
          LocalPlayer: card.LocalPlayer
        };
      })
    );
  }

  /**
   * Sets screen size
   * @param number x
   * @param number y
   */
  updateScreenSize(x, y) {
    this.screenSize = { x, y };
  }
}
