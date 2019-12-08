import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Home, Map, Review, NotFound, Game } from 'pages';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            {/** 구체적 URL부터 작성 */}
            <Route exact path="/map/:type" component={Map} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/review/:name" component={Review} />
            <Route exact path="/review" component={Review} />
            <Route exact path="/game" component={Game} />
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
