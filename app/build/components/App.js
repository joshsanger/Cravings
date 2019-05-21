import React, {Component} from 'react';
import Top from "./Top";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: ''
        };
        this.handle_submit = this.handle_submit.bind(this);
        this.handle_urlChange = this.handle_urlChange.bind(this);
    }

    handle_urlChange(e) {
        this.setState({
            url: e.target.value
        });
    }
    handle_submit(e) {

        e.preventDefault();

        let theURL = this.state.url;

        if (this.state.url.indexOf('http') == -1) {
            if (this.state.url.indexOf('www.') == -1) {
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
    render() {
        return (
            <div>
                <Top
                    handle_urlChange={this.handle_urlChange}
                    url={this.state.url}
                    handle_submit={this.handle_submit}
                />
            </div>
        );
    }
}

export default App;