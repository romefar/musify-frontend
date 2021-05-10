import { FC, useMemo } from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { ArtistTopInfo } from '../../models';
import { getRandomCover } from '../../utils/getRandomCover';

import styles from './ArtistCard.module.scss';

export interface ArtistCardProps {
  item: ArtistTopInfo;
}

export const ArtistCard: FC<ArtistCardProps> = (props) => {
  const { item } = props;
  const { name } = item;

  const imageSrc = useMemo(() => getRandomCover(), []);

  return (
    <Card className={styles.cardItem} hoverable bodyStyle={{ padding: '8px 10px' }}>
      <Link to={{
        pathname: '/artist',
        state: {
          artist: item.name,
          mbid: item.mbid
        }
      }}>
        <LazyLoad throttle={200} height={300} classNamePrefix={styles.lazyImage}>
          <img src={imageSrc} title={name} alt={name} className={styles.coverImage} />
        </LazyLoad>
        <p className={styles.artistName}>
          {name}
        </p>
      </Link>
    </Card>
  );
}
