import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionTypes from "../store/actions";

class Craving extends Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    get_previewImage = (images = [], size = 400) => {

        let image = false;

        for (let i of images) {
            if (i.width >= size) {
                image = i;
                break;
            }
        }

        return image;
    }

    handleRemove() {
        this.props.removeCraving(this.props.craving.id);
    }

    render() {

        let image = this.get_previewImage((this.props.craving.images || []));

        console.log(image);

        return (
            <div className="craving" style={{backgroundImage: (!!image ? `url(${image.url})` : '')}}>
                <a href={this.props.craving.url} target="_blank"></a>
                <div>
                    <div>
                        <div className="actions">
                            <a href={this.props.craving.url} target="_blank"><i className="far fa-external-link"></i></a>
                            <span className="remove" onClick={this.handleRemove}><i className="far fa-trash"></i></span>
                        </div>
                    </div>

                    <div className="title">
                        <a href={this.props.craving.url} target="_blank">{(this.props.craving.title || 'Something delicious, I\'m sure!')}</a>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeCraving: payload => dispatch({
            type: actionTypes.REMOVE_CRAVING,
            payload
        })
    };
};

export default connect(null, mapDispatchToProps)(Craving);

