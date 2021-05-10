import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './layout';
import { ApolloWrapper } from './components/ApolloWrapper';
import { AuthContextProvider } from './components/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <ApolloWrapper>
          <Layout>
            <App />
          </Layout>
        </ApolloWrapper>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
