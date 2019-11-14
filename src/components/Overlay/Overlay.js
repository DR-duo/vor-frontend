import React from "react";

import "./Overlay.css";
import RuneterraAdapter from "../../util/Runeterra/RuneterraAdapter";

export default class Overlay extends React.Component {
  constructor() {
    super();
    this.state = {
      finishedLoading: false,
      lastClick: {
        x: null,
        y: null
      },
      windowSize: {
        x: 0,
        y: 0
      }
    };
    this.api = new RuneterraAdapter();
  }

  componentDidMount() {
    this.setState({ finishedLoading: true });
  }

  handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;

    this.setState(
      {
        windowSize: {
          x: document.getElementById("vor-overlay").clientWidth,
          y: document.getElementById("vor-overlay").clientHeight
        }
      },
      () => {
        this.api.getCardAtCord(x, y).then(card => {
          console.log(card);
        });
      }
    );
  }

  render() {
    if (this.state.finishedLoading) {
      return (
        <div
          id="vor-overlay"
          ref={el => (this.container = el)}
          style={{ height: "100%", width: "100%" }}
          onClick={event => this.handleClick(event)}
        >
          Window Size X: {this.state.windowSize.x}
          Window Size Y: {this.state.windowSize.y}
        </div>
      );
    } else {
      return (
        <div id="vor-overlay" style={{ height: "100%", width: "100%" }}></div>
      );
    }
  }
}
