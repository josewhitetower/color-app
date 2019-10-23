import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";

const styles = {
  Palette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  },
  colors: {
    height: "90%"
  }
};
class Palette extends Component {
  state = {
    level: 500,
    format: "hex"
  };

  changeLevel = level => this.setState({ level });

  changeFormat = format => this.setState({ format });

  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = colors[this.state.level].map(color => {
      return (
        <ColorBox
          background={color[this.state.format]}
          name={color.name}
          key={color.id}
          colorId={color.id}
          paletteId={id}
          moreUrl={`/palette/${id}/${color.id}`}
          showingFullPalette={true}
        />
      );
    });
    return (
      <div className={classes.Palette}>
        <Navbar
          level={this.state.level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showLevel
        />
        <div className={classes.colors}>{colorBoxes}</div>
        <Footer palette={{ paletteName, emoji }} />
      </div>
    );
  }
}

export default withStyles(styles)(Palette);
