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
                {!!this.props.fetching && (
                    <div>
                        <div className="main-overlay"></div>
                        <div className="spinner-overlay"></div>
                        <div className="spinner fixed">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        fetching: state.fetching,
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