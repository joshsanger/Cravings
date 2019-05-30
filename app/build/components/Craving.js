import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionTypes from "../store/actions";

class Craving extends Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }


    /**
     * 01.06. GET PREVIEW IMAGE
     * Loops through all returned images and returns one that matches the desired size
     *
     * @param       images      array       The images to loop through
     * @param       size        integer     The desired image size
     *
     * @return      image       object      The image that meets the size. If none found, will be false
     */
    get_previewImage = (images = [], size = 400) => {

        let image = false;

        for (let i of images) {
            if (i.width >= size) {
                image = i;
                break;
            }
        }

        return image;
    };

    handleRemove() {
        this.props.removeCraving(this.props.craving.id);
    };


    render() {

        let image = this.get_previewImage((this.props.craving.images || []));

        return (
            <div className="craving" style={(!!image ? {backgroundImage: `url(${image.url})`} : '')}>
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
};

const mapDispatchToProps = dispatch => {
    return {
        removeCraving: payload => dispatch({
            type: actionTypes.REMOVE_CRAVING,
            payload
        })
    };
};

export default connect(null, mapDispatchToProps)(Craving);

