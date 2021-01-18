import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { GetUserLogin, GetOrderDetails, CartHelper } from '../../../services';
import { removeFromCart, incrementToCart, decreaseToCart } from "../../../../store/actions/cartActions";
import Deliverydetails from './delivery';
import Loader from '../../../../loader'
class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            subTotal: '', discount: '', deliveryCharge: 0, grandTotal: '', email: '', customer: '', paymentmethod: '', deliveryAddress: ''
        }
    }
    handleRadioChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleDeliveryAddress = (value) => {
        this.setState({ deliveryAddress: value })
    }
    async componentDidMount() {
        let email = sessionStorage.getItem('email')
        if (email) {
            let user = await GetUserLogin.getCustomerDetail(email);
            if (user) {
                this.setState({ customer: user.data, email: email })
            }
        }
        let cart = this.props.cartItems;
        let subTotal = cart.reduce((sum, i) => (sum += i.qty * i.netPrice), 0)
        let discount = cart.reduce((sum, i) => (sum += i.discount), 0)
        let grandTotal = subTotal + discount + this.state.deliveryCharge;

        this.setState({ subTotal: subTotal, discount: discount, grandTotal: grandTotal, deliveryCharge: this.state.deliveryCharge })

    }
    handlePlaceOrder = async (event) => {
        event.preventDefault();
        const { customer, grandTotal, deliveryAddress, paymentmethod } = this.state;
        let orderId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
        let { cartItems } = this.props
        let data = { customerId: customer.id, paymentmethod: paymentmethod, orderId: orderId, deliveryAddress: deliveryAddress, product: cartItems, grandTotal, grandTotal }
        if (data) {
            let order = await GetOrderDetails.getOrderCreateByUser(JSON.stringify(data));
            if (order) {
                NotificationManager.success("Successfully Ordered", "Order");
                setTimeout(
                    async function () {
                        CartHelper.emptyCart();
                    },
                    1000
                );
            } else {
                NotificationManager.error("Order is declined", "Order");
                setTimeout(
                    async function () {
                        window.location.href = "/failed"
                    },
                    1000
                );
            }
        }
    }

    loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    handlePaymentSystem = async (e) => {
        e.preventDefault();
        const { customer, grandTotal, deliveryAddress, paymentmethod } = this.state;
        let { cartItems } = this.props
        let orderId = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
        this.setState({ isLoaded: true})
        console.log("deliveryAddress", deliveryAddress)
        if(deliveryAddress){
            //payment system
        const res = await this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        //creating new order
        let data1 = { amount: grandTotal, order_id: orderId, "currency": "INR", payment_capture: 1 }
        const result = await GetOrderDetails.getPaymentValue(data1);
        if (!result.data) {
            alert("Server error. Are you online?");
            return;
        } else {
            const __DEV__ = document.domain === 'localhost';
            var options = {
                "key": __DEV__ ? "rzp_test_OkYZMYKswptVZX" : "rzp_test_OkYZMYKswptVZX",
                "currency": result.data.currency,
                "amount": result.data.amount * 100,
                "order_id": result.data.id,
                "name": "CityBaazar",
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "handler": async function (response) {
                    const list = {
                        custId: customer.id,
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                    };
                    const result = await GetOrderDetails.getPaymentOrderList(list);
                    if (result.data) {
                        const EMPTY_CART = { cartItems: [] }
                        const carts = cartItems || EMPTY_CART;
                         setTimeout(
                            async function () {
                    let data = { customerId: customer.id, paymentmethod: result.data.method, orderId: orderId, deliveryAddress: deliveryAddress, product: carts, grandTotal: result.data.amount / 100 }
                        
                            let order = await GetOrderDetails.getOrderCreateByUser(JSON.stringify(data));
                            if (order) {
                                NotificationManager.success("Successfully Ordered", "Order");
                                // this.setState({ isLoaded: false})
                                setTimeout(
                                    async function () {
                                        CartHelper.emptyCart();
                                    },
                                    1000
                                );
                        }
                            },
                            1000
                        );

                       
                    }else{
                        window.location.href = "/order/failed";
                    }
                    // console.log(result)
                },
                prefill: {
                    name: "",
                    email: '',
                    phone_number: ''
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            let payementObject = new window.Razorpay(options);
            payementObject.open();
        }
        }else{
            NotificationManager.error("Please! check address details", "Input Field");
        }
        

    }
    render() {
        const { cartItems } = this.props;
        const { subTotal, discount, deliveryCharge, grandTotal, email, customer, paymentmethod, isLoaded } = this.state;
        return (
            <div>
                <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <a href="/"><strong><span class="mdi mdi-home"></span> Home</strong></a> <span class="mdi mdi-chevron-right"></span> <a >Checkout</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="checkout-page section-padding">
                    <div className="container">
                        {
                            isLoaded ? <Loader />: ''
                        }
                        <div className="row">
                            <div className="col-md-8">
                                <div className="checkout-step">
                                    <div className="accordion" id="accordionExample">
                                        <div className="card checkout-step-one">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link checkout-login-bk" disabled>
                                                        <span className="number">1</span> Login <span className="mdi mdi-checkbox-marked-circle-outline"></span>
                                                    </button>
                                                    <div className="_2jDL7w"><div><span className="dNZmcB">{customer.firstName} </span><span className="_3MeY5j">{email}</span></div></div>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="card checkout-step-two">
                                            <div className="card-header" id="headingTwo">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                        <span className="number">2</span> Delivery Address
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <Deliverydetails onSelectDeliveryAddress={this.handleDeliveryAddress} />
                                            </div>
                                        </div>
                                        <div className="card">
                                            <div className="card-header" id="headingThree">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                        <span className="number">3</span> Payment
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                <div className="checkout-step-body">
                                                    <div className="payment_method-checkout">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="rpt100">
                                                                    <ul className="radio--group-inline-container_1">
                                                                        <li>
                                                                            <div className="radio-item_1">
                                                                                <input id="cashondelivery1" value="cash" name="paymentmethod" type="radio" onChange={this.handleRadioChange} />
                                                                                <label htmlFor="cashondelivery1" className="radio-label_1">Cash on Delivery</label>
                                                                            </div>
                                                                        </li>
                                                                        <li>
                                                                            <div className="radio-item_1" onClick={this.handlePaymentSystem}>
                                                                                {/* <input value="card" name="paymentmethod" type="button" onClick={this.handleRadioChange} /> */}
                                                                                <label htmlFor="card1" className="radio-label_1">Pay With Card</label>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                {
                                                                    paymentmethod === "cash" ?
                                                                        <button className="next-btn16 hover-btn" onClick={this.handlePlaceOrder}>Confirm Order</button>
                                                                        : ''
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <h5 className="card-header">My Cart <span className="text-secondary float-right">({cartItems.length} item)</span></h5>
                                    {
                                        cartItems.map((row, index) => (
                                            <div className="card-body pt-0 pr-0 pl-0 pb-0" key={index}>
                                                <div className="cart-list-product">
                                                    <img className="img-fluid" src={row.photo} alt="cart" />
                                                    <span className="badge badge-success">{row.discountPer}% OFF</span>
                                                    <h5>{row.name}</h5>
                                                    <h6><strong><span className="mdi mdi-approval" /> Available in</strong> - {row.unitSize} gm</h6>
                                                    <p className="offer-price mb-0">&#x20B9;{row.qty + '*' + row.netPrice} <i className="mdi mdi-tag-outline" /> <span className="regular-price">&#x20B9;{row.price}</span></p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="total-checkout-group">
                                        <div className="cart-total-dil">
                                            <h4>Sub Total</h4>
                                            <span>&#x20B9;{subTotal}</span>
                                        </div>
                                        <div className="cart-total-dil pt-3">
                                            <h4>Delivery Charges</h4>
                                            <span>&#x20B9;{deliveryCharge}</span>
                                        </div>
                                    </div>
                                    <div className="cart-total-dil saving-total ">
                                        <h4>Total Saving</h4>
                                        <span>&#x20B9;{discount}</span>
                                    </div>
                                    <div className="main-total-cart">
                                        <h2>Total</h2>
                                        <span>&#x20B9;{grandTotal}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </div>
        )
    }
}

export default connect(
    (state) => ({
        cartItems: state.cart.cartItems,
    }),
    { incrementToCart, decreaseToCart, removeFromCart }
)(Checkout);