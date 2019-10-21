import React, { Component } from "react";
import ColorBox from "./ColorBox.js";

export default class SinglePalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shades: this.gatherShades()
    };
  }

  gatherShades = () => {
    //return all sahdes of given color
    let shades = [];
    const { colorId, palette } = this.props;
    for (const key in palette.colors) {
      const color = palette.colors[key].find(color => color.id === colorId);
      shades.push(color);
    }
    // Object.keys(palette.colors).forEach(key => {
    //   const color = palette.colors[key].find(color => color.id === colorId);
    //   shades.push(color);
    // });
    return shades;
  };
  render() {
    const coloBoxes = this.state.shades.map(color => (
      <ColorBox
        background={color.hex}
        name={color.name}
        key={color.name}
        colorId={color.id}
        showLink={false}
      />
    ));
    return (
      <div className="Palette">
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">{coloBoxes}</div>
      </div>
    );
  }
}
