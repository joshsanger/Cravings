import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionTypes from "../store/actions";


class Top extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: false
        };
        this.interval = false;
        this.input = React.createRef();
    }


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
        this.setState({
            hasError: false
        });

        this.props.setFetching(true);

        clearInterval(this.interval);

        fetch('ajax/get_url_details.php', {
            method: 'POST',
            body: JSON.stringify({url: theURL}),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((r) => {

                if (r.status > 200) {
                    throw 'How embarrassing, something went wrong. Please try again later.'
                    return false;
                }

                return r.json();
            })
            .then((response) => {

                if (!!response.error) {
                    throw response.error;
                    return false;
                }

                this.props.addCraving({
                    id         : this.props.cravings.length,
                    title      : response.data.title || 'Something delicious I\'m sure!',
                    description: response.data.description || 'No description available, but I bet it\'s yummy!',
                    images     : response.data.images,
                    url        : response.data.url
                });
                this.props.inputUrl('');
            }).catch((e) => {
                this.setState({
                    hasError: true,
                    error: e || 'How embarrassing, something went wrong. Please try again later.'
                });
                this.input.current.focus();
                this.hideError();
            }).finally(() => {
                this.props.setFetching(false);
            });
    }

    hideError = () => {
        this.interval = setInterval(() => {
            this.setState({
                hasError: false
            });
        }, 6000);
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
                            <input ref={this.input} type="text" id="url-input" placeholder="Enter or paste the URL" value={this.props.url} onInput={this.handleUrlChange}/>
                            <span>
                                <i className="far fa-link"></i>
                            </span>
                        </div>
                        <button id="add-url" disabled={!(this.props.url.trim().length)}><i className="far fa-plus"></i> <span>Add</span></button>
                    </form>
                    <div className={`main-error ${this.state.hasError && 'show'}`}>
                        <div>
                            <div>
                                <i className="far fa-exclamation-triangle"></i>
                                <p>{this.state.error}</p>
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
        url: state.url,
        cravings: state.cravings
    };
};

const mapDispatchToProps = dispatch => {
    return {
        inputUrl: (payload) => dispatch({
            type: actionTypes.INPUT_URL_FIELD,
            payload
        }),
        addCraving: (payload) => dispatch({
            type: actionTypes.ADD_CRAVING,
            payload
        }),
        setFetching: (payload) => dispatch({
            type: actionTypes.SET_FETCHING,
            payload
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Top);