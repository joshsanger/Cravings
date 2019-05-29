import React, {Component} from 'react';
import {connect} from 'react-redux';
import Craving from "./Craving";

class Cravings extends Component {
    render() {
        return (
            <section id="cravings-wrapper">
                {
                    this.props.cravings.map((craving, key) => <Craving id={`craving${key}`} craving={craving}/>)
                }
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cravings: state.cravings
    };
};

export default connect(mapStateToProps)(Cravings);