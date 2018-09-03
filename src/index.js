import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore,compose,applyMiddleware} from 'redux';
import rootReducers  from './reducers';
import reduxThunk from 'redux-thunk';
import './index.scss';



const store = createStore(
    rootReducers,
    compose(
     applyMiddleware(reduxThunk),
       // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

    )
)
const app= (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
