import errorImage from '../../assets/error.jpg';

import styles from './ErrorCard.module.scss';

export const ErrorCard = () => {
  return (
    <div className={styles.errorCard}>
      <img src={errorImage} alt='Error has occurred' className={styles.errorImage} />
    </div>
  );
}
