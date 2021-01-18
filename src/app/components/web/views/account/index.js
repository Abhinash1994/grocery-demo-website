import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import View from './view';
import Reward from './rewards';
import Wishlist from './wishlist';
import Address from './address';
import Profile from './profile';
import Order from './order';

export default class Account extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/view`]} component={View} />
                        <Route path={[`${match.path}/profile`]} component={Profile} />
                        <Route path={[`${match.path}/order`]} component={Order} />
                        <Route path={[`${match.path}/rewards`]} component={Reward} />
                        <Route path={[`${match.path}/wishlist`]} component={Wishlist} />
                        <Route path={[`${match.path}/address`]} component={Address} />
                    </Switch>
                </main>
            </div>
        );
    }
}