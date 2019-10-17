import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Palette from './components/Palette';
import seedColors from './seedColors'
import {generatePalette} from './helpers/colorHelpers'

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <h1>Main Route</h1>}/>
        <Route exact path="/palette/:id" render={()=><h1>Palette Route</h1>}/>
      </Switch>

      {/* <Palette palette={generatePalette(seedColors[5])}/> */}
    </div>
  );
}

export default App;
