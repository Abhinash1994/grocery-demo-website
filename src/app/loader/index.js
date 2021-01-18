import React, { Component } from 'react';
import Loading from 'react-fullscreen-loading';
class Loader extends Component {
    render() {
        return (
            <div>
                <Loading loading loaderColor="#f55d2c" />
            </div>
        );
    }
}

export default Loader;