import React, { Component } from 'react';
import { GetProductDetails } from '../../../services';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../../../../store/actions/cartActions';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';
class Productview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [], categorybyproduct: [], isloaded: false, toggle: false, limit: 3
        }
    }
    async getFilterByProduct() {
        this.setState({ isloaded: false })
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();
        try {
            let p = await GetProductDetails.getProductByFilter(lastSegment);
            if (p) {
                this.setState({ list: p.data, isloaded: true })
            }
        } catch (e) {
            NotificationManager.error("Empty data in category", "Data");
        }

        //category filter

    }
    async componentDidMount() {
        window.scrollTo(0, 0);
        this.getFilterByProduct();
    }
    componentWillReceiveProps() {
        this.getFilterByProduct();
    }
    async handleFilterCategory(row) {
        let url = window.location.href.split('/');
        var lastSegment = url.pop() || url.pop();

        let data = { id: row.id, name: lastSegment }
        let category = await GetProductDetails.getProductBySubcategory(data);
        if (category) {
            this.setState({ categorybyproduct: category.data, isloaded: true, toggle: true })
        } else {
            NotificationManager.error("empty data in category", "Undefined");
        }
    }
    onLoadMore =event=> {
        this.setState({ limit: this.state.limit+3})
    }
    render() {
        let { list, categorybyproduct, toggle, isloaded, limit } = this.state;
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
                <section className="shop-list section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="shop-filters">
                                    <div id="accordion">
                                        <div className="card">
                                            <div className="card-header" id="headingOne">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        All Category <span className="mdi mdi-chevron-down float-right" />
                                                    </button>
                                                </h5>
                                            </div>
                                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                                <div className="card-body card-shop-filters">
                                                    {
                                                        isloaded ?
                                                            list.map((row, index) => {
                                                                return (
                                                                    <div className="card-body" key={index}>
                                                                        <div className="list-group bs-canvas-close" aria-label="Close" onClick={this.handleFilterCategory.bind(this, row)}>
                                                                            <span className="list-group-item list-group-item-action">{row.sub_name}</span>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                            : ''
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-9">
                                <div className="shop-head">
                                    <a href="#"><span className="mdi mdi-home" /> Home</a> <span className="mdi mdi-chevron-right" /> <a href="#">Fruits &amp; Vegetables</a> <span className="mdi mdi-chevron-right" /> <a href="#">Fruits</a>
                                    <div className="btn-group float-right mt-2">
                                        <button type="button" className="btn btn-dark dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Sort by Products &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <a className="dropdown-item" href="#">Relevance</a>
                                            <a className="dropdown-item" href="#">Price (Low to High)</a>
                                            <a className="dropdown-item" href="#">Price (High to Low)</a>
                                            <a className="dropdown-item" href="#">Discount (High to Low)</a>
                                            <a className="dropdown-item" href="#">Name (A to Z)</a>
                                        </div>
                                    </div>
                                    <h5 className="mb-3">Fruits</h5>
                                </div>
                                {!isloaded ? <div className="progress-bar-bk"><CircularProgress color="secondary" /></div> :
                                    toggle ?
                                        <div className="row no-gutters">
                                            {
                                                categorybyproduct ?
                                                    categorybyproduct.map((row) => (
                                                        row.products.slice(0,limit).map((row, index) => (
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
                                                        ))
                                                    )) : <div className="text-danger">Empty item in this category</div>}
                                        </div>
                                        :
                                        <div className="row no-gutters">
                                            {
                                                list ?
                                                    list.map((row) => (
                                                        row.products.slice(0,limit).map((row, index) => (
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
                                                        ))
                                                    )) : <div className="text-danger">Empty item in this category</div>}
                                        </div>}

                                <div class="more-product-btn">
                                    <button class="show-more-btn hover-btn" onClick={this.onLoadMore}>Show More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* end product section */}
            </div>
        )
    }
}
export default connect(null, { addToCart })(Productview);