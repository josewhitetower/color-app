import React, { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox.js";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default class SinglePalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shades: this.gatherShades(),
      format: "hex"
    };
  }

  gatherShades = () => {
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
    return shades.slice(1);
  };

  changeFormat = format => this.setState({ format });

  render() {
    console.log(this.state.shades);
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const coloBoxes = this.state.shades.map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.name}
        showLink={false}
      />
    ));
    return (
      <div className="SingleColorPalette Palette">
        <Navbar handleChange={this.changeFormat} />
        <div className="Palette-colors">
          {coloBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${id}`} className="back-button">
              GO BACK
            </Link>
          </div>
        </div>
        <Footer palette={{ paletteName, emoji }} />
      </div>
    );
  }
}
