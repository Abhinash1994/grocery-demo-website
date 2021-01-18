import React, { Component } from 'react'

export default class Complete extends Component {
    render() {
        return (
            <div className="card checkout-step-one" style={{ paddingTop: '4rem' }}>

                <section className="breadcrumb-bg mt-5">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-sm-12 text-center">
                                <div className="page-title order-done ">

                                    <i className="mdi mdi-check-circle-outline text-success" />

                                    <h1>Thank You</h1>
                                    <p className="col-sm-6 mx-auto">Congratulations! Your Order has been Accepted.</p>
                                </div>


                                <a className="next-btn16 hover-btn" href="/">Return to store</a>

                            </div>
                        </div>
                    </div>
                </section>
                {/* END SECTION BREADCRUMB */}


                {/* START SECTION CONTACT */}
                <section className="pt-5">
                    <div className="container">
                        <div className="row">

                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
