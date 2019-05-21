import React, {Component} from 'react';

class Top extends Component {
    render() {
        return (
            <section id="top">
                <div className="container">
                    <h1>What are you craving?</h1>
                    <form id="input-wrap" onSubmit={this.props.handle_submit}>
                        <div>
                            <input type="text" id="url-input" placeholder="Enter or paste the URL" value={this.props.url} onInput={this.props.handle_urlChange}/>
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

export default Top;