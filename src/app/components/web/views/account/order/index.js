import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Details from './detail';
import List from './list';

export default class Order extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={List} />
                        <Route path={[`${match.path}/details`]} component={Details} />
                    </Switch>
                </main>
            </div>
        );
    }
}