import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Palette.css";
import NavBar from "./NavBar";

export default class Palette extends Component {
  state = {
    level: 500
  };

  changeLevel = level => this.setState({ level });
  render() {
    const colorBoxes = this.props.palette.colors[this.state.level].map(
      color => {
        return <ColorBox background={color.hex} name={color.name} />;
      }
    );
    return (
      <div className="Palette">
        <NavBar changeLevel={this.changeLevel} level={this.state.level} />
        <div className="Palette-colors">{colorBoxes}</div>
      </div>
    );
  }
}
