import React, {Component} from 'react';
import {connect} from 'react-redux';
import Top from "./Top";
import * as actionTypes from "../store/actions";
import NoResults from "./NoResults";
import Cravings from "./Cravings";

class App extends Component {

    constructor(props) {
        super(props);

        const cravings = (JSON.parse(localStorage.getItem('cravings')) || []);
        this.props.updateCravings(cravings);
    }


    render() {


        return (
            <div>
                <Top />
                {!this.props.cravings.length && <NoResults />}
                {!!this.props.cravings.length && <Cravings />}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        cravings: state.cravings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateCravings: payload => dispatch({
            type: actionTypes.UPDATE_CRAVINGS,
            payload
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);