import {createStore, applyMiddleware,compose} from 'redux';
import rootSaga from './sagas/rootSaga';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';

const initialState = {};

const sagaMiddleware = createSagaMiddleware();

const middleware = [thunk,sagaMiddleware];

const store = createStore(rootReducer,initialState,compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

sagaMiddleware.run(rootSaga)

export default store;
