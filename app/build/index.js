import 'whatwg-fetch'
import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/styles.less';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import reducer from './store/reducer';
const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('app'));
