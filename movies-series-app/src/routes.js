import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {Component} from 'react';
import MoviePage from './containers/MoviePage/MoviePage';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={MoviePage} />
        <Route path="/movies" exact component={MoviePage} />
      </Switch>
    )
  }
}