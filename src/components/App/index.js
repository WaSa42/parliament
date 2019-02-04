import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import moment from 'moment';
import 'moment/locale/fr';
import 'moment/locale/en-gb';

import numeral from 'numeral';
import 'numeral/locales/fr';
import 'numeral/locales/en-gb';

import { routes } from '../../helpers/routes';
import { localeTo } from '../../helpers/locales';

import './App.css';

import Layout from '../Layout';

import NotAllowed from '../../pages/NotAllowed';
import NoMatch from '../../pages/NoMatch';
import Home from '../../pages/Home';

class App extends React.Component {
  componentDidMount() {
    const { i18n } = this.props;
    moment.locale(localeTo(i18n.language, 'moment'));
    numeral.locale(localeTo(i18n.language, 'moment'));
  }

  componentDidUpdate(prevProps) {
    const { i18n } = this.props;
    if (prevProps.i18n.language !== i18n.language) {
      moment.locale(localeTo(i18n.language, 'moment'));
      numeral.locale(localeTo(i18n.language, 'moment'));
    }
  }

  render() {
    return (
      <div id="app">
        <ToastContainer />
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path={routes.home} component={Home} />
              <Route path={routes.notAllowed} component={NotAllowed} />
              <Route component={NoMatch} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = { i18n: PropTypes.shape({ language: PropTypes.string }) };
App.defaultProps = { i18n: { language: 'en' } };

export default translate()(App);
