import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from "../store/actions";

class Top extends Component {

    handleSubmit = (e) => {

        e.preventDefault();

        let theURL = this.props.url;

        if (this.props.url.indexOf('http') == -1) {
            if (this.props.url.indexOf('www.') == -1) {
                theURL = 'http://www.' + theURL;
            } else {
                theURL = 'http://' + theURL;
            }
        }

        // $('.spinner, .spinner-overlay').fadeIn(400);
        // clearInterval(this.errorInterval);
        // this.mainError.removeClass('show');
        document.activeElement.blur();

        fetch('ajax/get_url_details.php', {
            method: 'POST',
            body: JSON.stringify({url: theURL}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
            .then((r) => r.json())
            .then((response) => {
                console.log(response);
            }).catch((e) => {
            console.error(e);
        });
    }

    handleUrlChange = (e) => {
        this.props.inputUrl(e.target.value);
    }



    render() {
        return (
            <section id="top">
                <div className="container">
                    <h1>What are you craving?</h1>
                    <form id="input-wrap" onSubmit={this.handleSubmit}>
                        <div>
                            <input type="text" id="url-input" placeholder="Enter or paste the URL" value={this.props.url} onInput={this.handleUrlChange}/>
                            <span>
                                <i className="far fa-link"></i>
                            </span>
                        </div>
                        <button id="add-url" disabled={!(this.props.url.trim().length)}><i className="far fa-plus"></i> <span>Add</span></button>
                    </form>
                    <div className="main-error">
                        <div>
                            <div>
                                <i className="far fa-exclamation-triangle"></i>
                                <p>Oops. Something went wrong.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        url: state.url
    };
};

const mapDispatchToProps = dispatch => {
    return {
        inputUrl: (payload) => dispatch({
            type: actionTypes.INPUT_URL_FIELD,
            payload
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);