import React, { Component } from "react";
import MiniPalette from "./MiniPalette";
import { withRouter, Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/PaletteListStyles";
class PaletteList extends Component {
  goToPalette = id => this.props.history.push(`/palette/${id}`);

  render() {
    const { palettes, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">Create palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                {...palette}
                goToPalette={() => this.goToPalette(palette.id)}
                key={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
// alternatively pass renderProps on the App.js Route
export default withRouter(withStyles(styles)(PaletteList));
