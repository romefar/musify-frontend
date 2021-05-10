import { FC, useContext } from 'react';
import { Button, Layout as AntLayout, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { NavMenu } from './NavMenu';
import { UserBadge } from '../components/UserBadge';
import { AuthContext } from '../components/AuthContext';
import styles from './Layout.module.scss';

const { Header, Footer, Content } = AntLayout;

export const Layout: FC = ({ children }) => {
  const { isAuthorized } = useContext(AuthContext);

  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <Typography.Text className={styles.appName}>
          <Link to='/' className={styles.appLink}>
            Musify
          </Link>
        </Typography.Text>
        <NavMenu />
        {!isAuthorized && (
          <Link to='/auth'>
            <Button>
              Sign in
          </Button>
          </Link>
        )}
        {isAuthorized && <UserBadge />}
      </Header>
      <Content className={styles.main}>{children}</Content>
      <Footer>Musify, 2021. Powered by lastfm</Footer>
    </AntLayout>
  );
};
