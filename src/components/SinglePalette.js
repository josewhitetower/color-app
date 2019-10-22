import React, { Component } from "react";
import { Link } from "react-router-dom";
import ColorBox from "./ColorBox.js";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default class SinglePalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "hex"
    };
  }

  changeFormat = format => this.setState({ format });

  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { shades } = this.props;
    const coloBoxes = shades.map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.name}
        showingFullPalette={false}
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
