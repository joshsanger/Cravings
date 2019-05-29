import React, {Component} from 'react';
import {connect} from 'react-redux';
import Top from "./Top";
import * as actionTypes from "../store/actions";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };

        const cravings = (JSON.parse(localStorage.getItem('cravings')) || {});
        this.props.updateCravings(cravings);


    }
    render() {
        return (
            <div>
                <Top />
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCravings: payload => {
            type: actionTypes.UPDATE_CRAVINGS,
                payload
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);