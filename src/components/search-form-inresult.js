import React, { Component } from 'react';
import StartPointsList from '../containers/start_points_list';
import Destination from '../containers/destination';

export default class SearchFormInResult extends Component {
  render() {
    return (
        <div>
            <StartPointsList />
            <Destination />
        </div>
    );
  }
}
