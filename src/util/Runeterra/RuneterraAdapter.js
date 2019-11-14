import RuneterraAPI from "./RuneterraAPI";

export default class RuneterraAdapter {
  constructor() {
    this.api = new RuneterraAPI();
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
    return this.api.endpointPositionalRectangles().then(cards => {
      const card = cards.Rectangles.find(
        ({ TopLeftX, TopLeftY, Height, Width }) => {
          const left = TopLeftX;
          const right = TopLeftX + Width;
          const top = TopLeftY;
          const bottom = TopLeftY - Height;

          if (x >= left && x <= right && y <= top && y >= bottom) {
            return true;
          }
        }
      );

      return card || null;
    });
  }
}
