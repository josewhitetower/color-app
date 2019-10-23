import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox.js";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "./styles/PaletteStyles"

class SinglePalette extends Component {
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
    const { shades, classes } = this.props;
    const coloBoxes = shades.map(color => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.name}
        showingFullPalette={false}
      />
    ));
    return (
      <div className={classes.Palette}>
        <Navbar handleChange={this.changeFormat} />
        <div className={classes.colors}>
          {coloBoxes}
          <div className={classes.goBack}>
            <Link to={`/palette/${id}`}>
              GO BACK
            </Link>
          </div>
        </div>
        <Footer palette={{ paletteName, emoji }} />
      </div>
    );
  }
}

export default withStyles(styles)(SinglePalette);