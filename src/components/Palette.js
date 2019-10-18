import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";

export default class Palette extends Component {
  state = {
    level: 500,
    format: "hex"
  };

  changeLevel = level => this.setState({ level });

  changeFormat = format => this.setState({ format });

  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const colorBoxes = colors[this.state.level].map(color => {
      return (
        <ColorBox
          background={color[this.state.format]}
          name={color.name}
          key={color.id}
          colorId={color.id}
          paletteId={id}
        />
      );
    });
    return (
      <div className="Palette">
        <Navbar
          level={this.props.level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}
