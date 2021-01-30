import React, { Component } from 'react'
import Slider from "react-slick";
import { connect } from 'react-redux';
import { addToCart } from '../../../../../store/actions/cartActions';

import { Link } from 'react-router-dom';
import GroceryStampleDetails from '../../../../services/GroceryStampleDetails';
import CircularProgress from '@material-ui/core/CircularProgress';

class Topstample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productlist: [],isloaded:false
        }
    }
    async componentDidMount() {
        let list = await GroceryStampleDetails.getAllGroceryStaple();
        if(list){
            this.setState({ productlist: list.data, isloaded:true })
        }
    }
    render() {
        let list = this.state.productlist.products;
        console.log(list)
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        initialSlide: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <div>
                {/* New Item slider */}
                <section className="product-items-slider section-padding">
                    <div className="container" id="header-category-bk">
                        <div className="section-header">
                            <span>For You</span>
                            <h5 className="heading-design-h5">Grocery & Staples {/* <span className="badge badge-primary">20% OFF</span> */}
                                <Link to={{
                                    pathname: `/shop/${this.state.productlist.slug}`,
                                    state: list
                                }}><span className="float-right text-secondary">View All</span></Link>
                            </h5>
                        </div>
                        <Slider {...settings}>
                            {!this.state.isloaded ?<div className="progress-bar-bk"><CircularProgress color="secondary" /></div>:
                                list.map((row, index) => (
                                    <div key={index} className="item">
                                        <div className="product">
                                            <Link to={{
                                                pathname: `/p/${row.slug}/${row.id}`,
                                                state: row

                                            }}>
                                                <div className="product-header">
                                                    <span className="badge badge-success">{row.discountPer}% OFF</span>
                                                    <img className="img-fluid" src={row.photo} alt="product" />
                                                    {/* <span className="veg text-success mdi mdi-circle" /> */}
                                                </div>
                                                <div className="product-body">
                                                    <h5>{row.name}</h5>
                                                    <h6><strong><span className="mdi mdi-approval" /> Available in</strong> - {row.unitSize}</h6>
                                                </div>
                                            </Link>
                                            <div className="product-footer">
                                                <button type="button" className="btn btn-secondary btn-sm float-right" onClick={() => this.props.addToCart(row)}><i className="mdi mdi-cart-outline" /> Add To Cart</button>
                                                <p className="offer-price mb-0">&#x20B9;{row.price} <i className="mdi mdi-tag-outline" /><br /><span className="regular-price">&#x20B9;{row.netPrice}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                </section>

                {/* End New item slider */}
            </div>
        )
    }
}
export default connect(null, { addToCart })(Topstample);