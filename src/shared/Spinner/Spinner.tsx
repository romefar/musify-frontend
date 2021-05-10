import { Spin } from 'antd';

import styles from './Spinner.module.scss';

export const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <Spin size='large'/>
    </div>
  );
};
