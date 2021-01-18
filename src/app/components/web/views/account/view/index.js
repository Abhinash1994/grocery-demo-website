import React, { Component } from 'react'
import { GetUserLogin } from '../../../../services';
import '../css/index.css'
export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
        };
    }
    async componentDidMount() {
        let email = sessionStorage.getItem('email')
        if (email) {
            let value = await GetUserLogin.getCustomerDetail(email);
            if (value) {
                this.setState({ user: value.data })
            }
        }
    }
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }
    render() {
        let { user } = this.state;
        return (
            <div className="wrapper">
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">Home</li>
                                        <li className="breadcrumb-item active" aria-current="page">User Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-group">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="user-dt">
                                    <div className="user-img">
                                        <img src="/img/avatar/img-5.jpg" alt />
                                        <div className="img-add">
                                            <input type="file" id="file" />
                                            <label htmlFor="file"><i className="uil uil-camera-plus" /></label>
                                        </div>
                                    </div>
                                    <h4>{user.firstName}</h4>
                                    <p>+977 {user.phone}</p>
                                    <div className="earn-points"><img src="images/Dollar.svg" alt />Points : <span>20</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4">
                                <div className="left-side-tabs">
                                    <div className="dashboard-left-links">
                                        <a href="/account/view" className="user-item active"><i className="uil uil-apps" />Overview</a>
                                        <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />My profile</a>
                                        <a href="/account/order/list" className="user-item"><i className="uil uil-box" />My Orders</a>
                                        <a href="/account/rewards" className="user-item"><i className="uil uil-gift" />My Rewards</a>
                                        <a href="/account/wishlist" className="user-item"><i className="uil uil-heart" />Shopping Wishlist</a>
                                        <a href="/account/address" className="user-item"><i className="uil uil-location-point" />My Address</a>
                                        <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Logout</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4><i className="uil uil-apps" />Overview</h4>
                                            </div>
                                            <div className="welcome-text">
                                                <h2>Hi! {user.firstName}</h2>
                                            </div>
                                        </div>
                                        {/* <div className="col-lg-6 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="pdpt-title">
                                                    <h4>My Rewards</h4>
                                                </div>
                                                <div className="ddsh-body">
                                                    <h2>6 Rewards</h2>
                                                    <ul>
                                                        <li>
                                                            <a href="#" className="small-reward-dt hover-btn">Won $2</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="small-reward-dt hover-btn">Won 40% Off</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="small-reward-dt hover-btn">Caskback $1</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="rewards-link5">+More</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <a href="#" className="more-link14">Rewards and Details <i className="uil uil-angle-double-right" /></a>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="pdpt-title">
                                                    <h4>My Orders</h4>
                                                </div>
                                                <div className="ddsh-body">
                                                    <h2>2 Recently Purchases</h2>
                                                    <ul className="order-list-145">
                                                        <li>
                                                            <div className="smll-history">
                                                                <div className="order-title">2 Items <span data-inverted data-tooltip="2kg broccoli, 1kg Apple" data-position="top center">?</span></div>
                                                                <div className="order-status">On the way</div>
                                                                <p>$22</p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <a href="#" className="more-link14">All Orders <i className="uil uil-angle-double-right" /></a>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="pdpt-title">
                                                    <h4>My Wallet</h4>
                                                </div>
                                                <div className="wllt-body">
                                                    <h2>Credits $100</h2>
                                                    <ul className="wallet-list">
                                                        <li>
                                                            <a href="#" className="wallet-links14"><i className="uil uil-card-atm" />Payment Methods</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="wallet-links14"><i className="uil uil-gift" />3 offers Active</a>
                                                        </li>
                                                        <li>
                                                            <a href="#" className="wallet-links14"><i className="uil uil-coins" />Points Earning</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <a href="#" className="more-link14">Rewards and Details <i className="uil uil-angle-double-right" /></a>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
