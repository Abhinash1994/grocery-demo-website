import React, { Component } from 'react';
import { GetProductDetails } from '../../../services';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../../store/actions/cartActions';
import { NotificationManager } from 'react-notifications';
import './index.css'
import Filterbycategory from './Filtersbycategory';
import CircularProgress from '@material-ui/core/CircularProgress';
class Shopdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], limit:12, isloaded: false
        }
    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        try {
            let p = await GetProductDetails.getAllProductList(lastSegment);
            if (p) {
                this.setState({ list: p.data.products, isloaded: true })
            }
        } catch (e) {
            NotificationManager.error("Empty data in category", "Data");
        }
    }
    onLoadMore =event=> {
        this.setState({ limit: this.state.limit+6})
    }
    handleChangeByCategory(value) {
        if (value) {
            this.setState({ isloaded: true, list: value.data })
        }
    }
    render() {
        let { list, isloaded, limit } = this.state;
        return (
            <div>
                <section className="pt-3 pb-3 page-info section-padding border-bottom bg-white single-product-header-bk">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <a href="#"><strong><span className="mdi mdi-home" /> Home</strong></a> <span className="mdi mdi-chevron-right" /> <a href="#">Fruits &amp; Vegetables</a> <span className="mdi mdi-chevron-right" /> <a href="#">Fruits</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* All product */}
                <div className="all-product-grid">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product-top-dt">
                                    <div className="product-left-title">
                                        <h2>All Products</h2>
                                    </div>
                                    <Filterbycategory onSelectFilterCategory={this.handleChangeByCategory.bind(this)} />
                                    <div className="product-sort">
                                        <select className="form-control">
                                            <option className="item" value={0}>Sort by Products</option>
                                            <option className="item" value={1}>Price - Low to High</option>
                                            <option className="item" value={2}>Price - High to Low</option>
                                            <option className="item" value={3}>Alphabetical</option>
                                            <option className="item" value={4}>Saving - High to Low</option>
                                            <option className="item" value={5}>Saving - Low to High</option>
                                            <option className="item" value={6}>% Off - High to Low</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* End product */}
                {/* product section */}
                <section className="shop-list section-padding">
                    {!isloaded ? <div className="progress-bar-bk"><CircularProgress color="secondary" /></div> :
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row no-gutters">
                                        {
                                            list.slice(0, limit).map((row, index) => (
                                                <div key={index} className="col-md-4">
                                                    <div className="item">
                                                        <div className="product">
                                                            <Link to={{
                                                                pathname: `/p/${row.slug}/${row.id}`,
                                                                state: row
                                                            }}>
                                                                <div className="product-header">
                                                                    <span className="badge badge-success">{row.discountPer}% OFF</span>
                                                                    <img className="img-fluid" src={row.photo} alt="product" />
                                                                    <span className="veg text-success mdi mdi-circle" />
                                                                </div>
                                                                <div className="product-body">
                                                                    <h5>{row.name}</h5>
                                                                    <h6><strong><span className="mdi mdi-approval" /> Available in</strong> - {row.unitSize}</h6>
                                                                </div>
                                                            </Link>
                                                            <div className="product-footer">
                                                                <button type="button" className="btn btn-secondary btn-sm float-right" onClick={() => this.props.addToCart(row)}><i className="mdi mdi-cart-outline" /> Add To Cart</button>
                                                                <p className="offer-price mb-0">&#x20B9;{row.netPrice}  <i className="mdi mdi-tag-outline" /><br /><span className="regular-price">&#x20B9;{row.price} </span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>

                                    <div class="more-product-btn">
                                        <button class="show-more-btn hover-btn" onClick={this.onLoadMore}>Show More</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }
                </section>


                {/* end product section */}
            </div>
        )
    }
}
export default connect(null, { addToCart })(Shopdetails);