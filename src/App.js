import React from 'react';
import { HashRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BlockPage from './pages/BlockPage';
import AccountPage from './pages/AccountPage';
import TransactionPage from './pages/TransactionPage';
import BlockListPage from './pages/BlockListPage';
import TransferListPage from './pages/TransferListPage';
import WitnessesListPage from './pages/WitnessesListPage';
import NodesListPage from './pages/NodesListPage';
import AccountsListPage from './pages/AccountsListPage';
import TokensListPage from './pages/TokensListPage';
import CreateWalletPage from './pages/CreateWalletPage';
import WalletPage from './pages/WalletPage';
import MarketPage from './pages/MarketPage';
import TransactionListPage from './pages/TransactionListPage';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.routes = [
      {
        name: 'home',
        path: '/',
        component: Dashboard,
      },
      {
        name: 'blockList',
        path: '/blocks',
        component: BlockListPage,
      },
      {
        name: 'block',
        path: '/blocks/:blockNumber',
        component: BlockPage,
      },
      {
        name: 'transferList',
        path: '/transfers',
        component: TransferListPage,
      },
      {
        name: 'transactionList',
        path: '/transactions',
        component: TransactionListPage,
      },
      {
        name: 'transaction',
        path: '/transactions/:hash',
        component: TransactionPage,
      },
      {
        name: 'accounts',
        path: '/accounts',
        component: AccountsListPage,
      },
      {
        name: 'account',
        path: '/accounts/:address',
        component: AccountPage,
      },
      {
        name: 'witnesses',
        path: '/witnesses',
        component: WitnessesListPage,
      },
      {
        name: 'nodes',
        path: '/nodes',
        component: NodesListPage,
      },
      {
        name: 'tokens',
        path: '/tokens',
        component: TokensListPage,
      },
      {
        name: 'wallet-new',
        path: '/wallet/new',
        component: CreateWalletPage,
      },
      {
        name: 'wallet',
        path: '/wallet',
        component: WalletPage,
      },
      {
        name: 'market',
        path: '/market',
        component: MarketPage,
      },
    ];

    this.routeTo = this.routeTo.bind(this);
  }

  routeTo(name, urlParams = {}) {
    const { history } = this.props;

    const route = this.routes.find(r => r.name === name);
    let path = route.path;
    path = Object.keys(urlParams).reduce((acc, a) => acc.split(`:${a}`).join(urlParams[a]), path);
    history.push(path);
  }

  render() {
    const { history } = this.props;

    return (
      <Layout history={history} routeTo={this.routeTo}>
        <Switch>
          {this.routes.map(r => (
            <Route
              key={r.name}
              exact
              path={r.path}
              render={props => <r.component {...props} routeTo={this.routeTo} />}
            />
          ))}
        </Switch>
      </Layout>
    );
  }
}

const RoutedApp = withRouter(App);

export default (
  <Router>
    <RoutedApp />
  </Router>
);
