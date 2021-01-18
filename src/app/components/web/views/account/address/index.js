import React, { Component } from 'react'
import { GetUserLogin } from '../../../../services';
import '../css/index.css'

export default class Address extends Component {
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
                                    {/* <div className="earn-points"><img src="images/Dollar.svg" alt />Points : <span>20</span></div> */}
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
                                        <a href="/account/view" className="user-item"><i className="uil uil-apps" />Overview</a>
                                        <a href="/account/profile" className="user-item"><i className="mdi mdi-account-outline" />My profile</a>
                                        <a href="/account/order/list" className="user-item"><i className="uil uil-box" />My Orders</a>
                                        <a href="/account/rewards" className="user-item"><i className="uil uil-gift" />My Rewards</a>
                                        <a href="/account/wishlist" className="user-item"><i className="uil uil-heart" />Shopping Wishlist</a>
                                        <a href="/account/address" className="user-item active"><i className="uil uil-location-point" />My Address</a>
                                        <a className="user-item" onClick={this.handleLogout}><i className="uil uil-exit" />Logout</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8">
                                <div className="dashboard-right">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="main-title-tab">
                                                <h4><i className="uil uil-location-point" />My Address</h4>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="pdpt-bg">
                                                <div className="pdpt-title">
                                                    <h4>My Address</h4>
                                                </div>
                                                <div className="address-body">
                                                    <a href="#" className="add-address hover-btn" data-toggle="modal" data-target="#address_model">Add New Address</a>
                                                    {
                                                        user ?
                                                            user.Addresses.map((row, index) => (
                                                                <div className="address-item" key={index}>
                                                                    <div className="address-icon1">
                                                                        <i className="uil uil-home-alt" />
                                                                    </div>
                                                                    <div className="address-dt-all">
                                                                        {/* <h4>Home</h4> */}
                                                                        <p>#{row.shipping+' , ' +row.area+' , ' +row.city+' , ' +row.discrict+' , ' +row.states}</p>
                                                                        <ul className="action-btns">
                                                                            <li><a href="#" className="action-btn"><i className="uil uil-edit" /></a></li>
                                                                            <li><a href="#" className="action-btn"><i className="uil uil-trash-alt" /></a></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>

                                                            ))
                                                            : <p>Loading...</p>}
                                                    
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
