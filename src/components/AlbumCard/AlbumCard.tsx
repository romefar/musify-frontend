import { FC, useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { AlbumSearchItem } from '../../models';
import { getRandomCover } from '../../utils/getRandomCover';
import styles from './AlbumCard.module.scss';

export interface AlbumCardProps {
  item: AlbumSearchItem;
}

export const AlbumCard: FC<AlbumCardProps> = ({ item }) => {
  const { name, artist, mbid } = item;

  const coverSrc = useMemo(() => getRandomCover(), []);

  return (
    <Card className={styles.albumItem} hoverable bodyStyle={{ padding: '8px 10px' }}>
      <Link to={{
        pathname: '/album',
        state: {
          album: name,
          artist: artist,
          mbid: mbid,
        },
      }}>
        <LazyLoad throttle={200} height={300} classNamePrefix={styles.lazyImage}>
          <img src={coverSrc} title={name} alt={name} className={styles.coverImage} />
        </LazyLoad>
        <p className={styles.albumName}>
          {name}
        </p>
      </Link>
      <p className={styles.artistName}>
        <Link to={{
          pathname: '/artist',
          state: {
            artist: artist,
          },
        }}>
          {artist}
        </Link>
      </p>
    </Card>
  );
};
