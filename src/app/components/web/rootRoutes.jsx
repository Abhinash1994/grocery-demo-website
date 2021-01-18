import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from '../header';
import Footer from '../footer';
import Home from '../web/views/home';
import Productview from '../web/views/product';
import Singleproduct from './views/single-product';
import Checkout from './views/checkout';
import Shopdetails from './views/shop-details';
import Login from './views/checkout/login';
import Register from './views/checkout/register';
import NotFound from '../../NotFound';
import Complete from './views/checkout/complete';
import Account from './views/account';
import Failed from './views/checkout/failed';

export default class rootRoutes extends Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/p/:slug/:id' component={Singleproduct} />
                    <Route exact path='/shop/:slug' component={Shopdetails} />
                    <Route path='/checkout' component={Checkout} /> 
                    <Route path='/product/catalogsearch/result' component={Productview} /> 
                    <Route path='/order/success' component={Complete} /> 
                    <Route path='/order/failed' component={Failed} />  

                    <Route path='/account' component={Account} />                    
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route component={NotFound} />
                </Switch>
                <Footer />

            </div>
        )
    }
}
