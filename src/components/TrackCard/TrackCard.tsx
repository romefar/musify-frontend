import { FC, useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

import { Track, TrackSearchItem } from '../../models';
import { getRandomCover } from '../../utils/getRandomCover';
import styles from './TrackCard.module.scss';

export interface TrackCardProps {
  item: Track | TrackSearchItem;
  trackLink: {
    track: string;
    artist: string,
    mbid?: string
  };
  artistLink: {
    artist: string;
    mbid?: string
  };
}

export const TrackCard: FC<TrackCardProps> = (props) => {
  const { item, trackLink, artistLink } = props;
  const { name, artist } = item;

  const imageSrc = useMemo(() => getRandomCover(), []);

  return (
    <Card className={styles.trackItem} hoverable bodyStyle={{ padding: '8px 10px' }}>
      <Link to={{
        pathname: '/track',
        state: trackLink,
      }}>
        <LazyLoad throttle={200} height={300} classNamePrefix={styles.lazyImage}>
          <img src={imageSrc} title={name} alt={name} className={styles.coverImage} />
        </LazyLoad>
        <p className={styles.songName}>
          {name}
        </p>
      </Link>
      <p className={styles.artistName}>
        <Link to={{
          pathname: '/artist',
          state: artistLink,
        }}>
          {typeof artist === 'string' ? artist : artist.name}
        </Link>
      </p>
    </Card>
  );
};
