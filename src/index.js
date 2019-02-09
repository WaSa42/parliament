import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { I18nextProvider } from 'react-i18next';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import { vanillaPromise, readyStatePromise } from './middlewares/promise';
import errorMiddleware from './middlewares/errorMiddleware';
import reducers from './reducers';
import App from './components/App';
import SplashScreen from './components/SplashScreen';
import i18n from './i18n';

const middleWares = [thunk, errorMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleWares.push(createLogger());
}

// Should be pushed after redux-logger.
middleWares.concat([vanillaPromise, readyStatePromise]);

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['app'],
};

const persistedReducer = persistReducer(rootPersistConfig, reducers);

const store = createStore(persistedReducer, compose(applyMiddleware(...middleWares)));

const persistor = persistStore(store);

class Root extends React.Component {
  constructor() {
    super();
    this.state = { splash: true };
  }

  componentWillMount() {
    const splashMinimumDelay = 1500;
    setTimeout(() => {
      this.setState({ splash: false });
    }, splashMinimumDelay);
  }

  render() {
    const { splash } = this.state;
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            {splash ? <SplashScreen /> : <App />}
          </I18nextProvider>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));

export { store as default };
