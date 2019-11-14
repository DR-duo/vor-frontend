import React from "react";

import "./Overlay.css";
import RuneterraAdapter from "../../util/Runeterra/RuneterraAdapter";

export default class Overlay extends React.Component {
  constructor() {
    super();
    this.state = {
      lastClick: {
        x: null,
        y: null
      }
    };
    this.api = new RuneterraAdapter();
  }

  handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;
    this.api.getCardAtCord(x, y).then(card => {
      console.log(card);
    });
  }

  render() {
    return (
      <div
        style={{ height: "100%", width: "100%" }}
        onClick={event => this.handleClick(event)}
      >
        Last clicked:
      </div>
    );
  }
}
