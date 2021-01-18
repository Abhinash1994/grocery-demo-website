import React, { Component } from 'react'

export default class Failed extends Component {
    render() {
        return (
            <div className="card checkout-step-one" style={{ paddingTop: '4rem' }}>

                <section className="breadcrumb-bg mt-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-sm-12 text-center">
                                <div className="page-title order-done ">

                                    <i className="mdi mdi-close-circle-outline text-secondary" />

                                   <h1>Transaction Failed</h1>
                                    <p className="col-sm-6 mx-auto">Oops! Your payment has been declined. Please try again later</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               
            </div>
        )
    }
}
