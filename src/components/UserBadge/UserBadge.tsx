import { Avatar, Button, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLazyQuery } from '@apollo/client';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../AuthContext';
import { useLogout } from '../../hooks/useLogout';
import { GET_USER_INFO } from '../../graphql/queries/user';
import { User } from '../../models';
import styles from './UserBadge.module.scss';

interface UserInfoVars {
  id: string;
}

interface UserInfoModel {
  user: User;
}

export const UserBadge = () => {
  const { getUserId } = useContext(AuthContext);
  const logout = useLogout();
  const userId = getUserId();

  const [getUserInfo, { data }] = useLazyQuery<UserInfoModel, UserInfoVars>(GET_USER_INFO, {
    errorPolicy: 'all',
  });

  useEffect(() => {
    if (userId && !data) {
      getUserInfo({ variables: { id: userId } });
    }
  }, [getUserInfo, userId, data]);

  return (
    <div className={styles.userBadge}>
      <Avatar size={50} icon={<UserOutlined />} />
      <Typography.Text className={styles.userName}>{data?.user?.name ?? 'N/A'}</Typography.Text>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
