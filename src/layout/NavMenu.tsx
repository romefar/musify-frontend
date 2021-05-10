import { Menu } from 'antd';
import { useContext } from 'react';
import { useHistory } from 'react-router';

import { AuthContext } from '../components/AuthContext';

export const NavMenu = () => {
  const { isAuthorized } = useContext(AuthContext);
  const history = useHistory();

  return (
    <Menu mode='horizontal' theme='dark'>
      <Menu.Item key='1' onClick={() => history.push('/track/top')}>
        Top Tracks
      </Menu.Item>
      <Menu.Item key='2' onClick={() => history.push('/artist/top')}>Top Artist</Menu.Item>
      {isAuthorized && <Menu.Item key='3' onClick={() => history.push('/track/search')}>Tracks</Menu.Item>}
      {isAuthorized && <Menu.Item key='4' onClick={() => history.push('/artist/search')}>Artists</Menu.Item>}
      {isAuthorized && <Menu.Item key='5' onClick={() => history.push('/album/search')}>Albums</Menu.Item>}
    </Menu>
  );
};
