import { Typography } from 'antd';

import styles from './Home.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homeScreen}>
      <div>
        <Typography.Title className={styles.title}>Musify</Typography.Title>
        <Typography.Title className={styles.subTitle}>Provided by last.fm</Typography.Title>
      </div>
    </div>
  )
};
