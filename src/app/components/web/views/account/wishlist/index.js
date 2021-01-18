import React, { Component } from 'react'
import { GetUserLogin } from '../../../../services';
import '../css/index.css'

export default class Wishlist extends Component {
    handleLogout = async (event) => {
        event.preventDefault();
        await GetUserLogin.logout();
    }
    render() {
        return (
            <div className="wrapper">
                <div className="gambo-Breadcrumb">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
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
                                        <img src="images/avatar/img-5.jpg" alt />
                                        <div className="img-add">
                                            <input type="file" id="file" />
                                            <label htmlFor="file"><i className="uil uil-camera-plus" /></label>
                                        </div>
                                    </div>
                                    <h4>Johe Doe</h4>
                                    <p>+91999999999<a href="#"><i className="uil uil-edit" /></a></p>
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
                                        <a href="/account/view" className="user-item "><i className="uil uil-apps" />Overview</a>
                                        <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />My profile</a>
                                        <a href="/account/order/list" className="user-item"><i className="uil uil-box" />My Orders</a>
                                        <a href="/account/rewards" className="user-item"><i className="uil uil-gift" />My Rewards</a>
                                        <a href="/account/wishlist" className="user-item active"><i className="uil uil-heart" />Shopping Wishlist</a>
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
                                                <h4><i className="uil uil-heart" />Shopping Wishlist</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="wishlist-body-dtt">
                                                    <div className="cart-item">
                                                        <div className="cart-product-img">
                                                            <img src="images/product/img-11.jpg" alt />
                                                            <div className="offer-badge">4% OFF</div>
                                                        </div>
                                                        <div className="cart-text">
                                                            <h4>Product Title Here</h4>
                                                            <div className="cart-item-price">$15 <span>$18</span></div>
                                                            <button type="button" className="cart-close-btn"><i className="uil uil-trash-alt" /></button>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-product-img">
                                                            <img src="images/product/img-2.jpg" alt />
                                                            <div className="offer-badge">1% OFF</div>
                                                        </div>
                                                        <div className="cart-text">
                                                            <h4>Product Title Here</h4>
                                                            <div className="cart-item-price">$9.9 <span>$10</span></div>
                                                            <button type="button" className="cart-close-btn"><i className="uil uil-trash-alt" /></button>
                                                        </div>
                                                    </div>
                                                    <div className="cart-item">
                                                        <div className="cart-product-img">
                                                            <img src="images/product/img-14.jpg" alt />
                                                        </div>
                                                        <div className="cart-text">
                                                            <h4>Product Title Here</h4>
                                                            <div className="cart-item-price">$12</div>
                                                            <button type="button" className="cart-close-btn"><i className="uil uil-trash-alt" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
