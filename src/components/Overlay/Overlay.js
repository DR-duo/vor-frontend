import React from "react";

import "./Overlay.css";
import RuneterraAdapter from "../../util/Runeterra/RuneterraAdapter";

export default class Overlay extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: null
    };
    this.poll = null;
    this.api = new RuneterraAdapter();
  }

  componentDidMount() {
    setTimeout(() => {
      this.api.updateScreenSize(
        document.getElementById("vor-overlay").clientWidth,
        document.getElementById("vor-overlay").clientHeight
      );
    }, 100);
    this.poller = setInterval(() => this.updateCards(), 1000);
  }

  updateCards() {
    this.api.getAllCards().then(cards => {
      this.setState({ cards });
    });
  }

  handleClick(event) {
    const x = event.clientX;
    const y = event.clientY;

    this.api.getCardAtCord(x, y).then(card => {
      window.Twitch.ext.rig.log(card);
    });
  }

  render() {
    return (
      <div
        id="vor-overlay"
        ref={el => (this.container = el)}
        style={{ height: "100%", width: "100%", position: "relative" }}
        onClick={event => this.handleClick(event)}
      >
        {this.state.cards &&
          this.state.cards.map((card, index) => {
            return (
              <div
                key={`card-${index}`}
                style={{
                  backgroundColor: "red",
                  height: card.Height,
                  width: card.Width,
                  position: "absolute",
                  top: card.TopLeftY,
                  left: card.TopLeftX
                }}
              >
                {`${card.CardCode}-${index}`}
              </div>
            );
          })}
      </div>
    );
  }
}
