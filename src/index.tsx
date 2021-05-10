import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './components/App';
import { Layout } from './layout';
import { ApolloWrapper } from './components/ApolloWrapper';
import { AuthContextProvider } from './components/AuthContext';

ReactDOM.render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <ApolloWrapper>
          <Layout>
            <App />
          </Layout>
        </ApolloWrapper>
      </AuthContextProvider>
    </Router>
  </StrictMode>,
  document.getElementById('root'),
);
