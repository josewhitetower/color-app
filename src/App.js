import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Palette from './components/Palette';
import PaleteList from './components/PaletteList'
import seedColors from './seedColors'
import {generatePalette} from './helpers/colorHelpers'

function App() {

  function findPalett(id) {
    return seedColors.find(palette => palette.id === id)
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <PaleteList palettes={seedColors} />}/>
        <Route exact path="/palette/:id" render={(routeProps)=> <Palette palette={generatePalette(findPalett(routeProps.match.params.id))}/>}/>
      </Switch>
    </div>
  );
}

export default App;
