import axios from "axios";

/**
 *  Class for using RuneterraAPI
 */

export default class RuneterraAPI {
  constructor(url = "localhost", port = 3000) {
    this.url = `http://${url}:${port}`;
  }

  /* Basic one to one with API */
  endpointPositionalRectangles() {
    const endpoint = `${this.url}/runeterra/positional-rectangles`;
    return axios
      .get(endpoint)
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}
