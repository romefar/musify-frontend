import { FC, useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { ArtistTopTrack } from '../../../models';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as LastFmIcon } from '../../../assets/icons/lastfm.svg';
import { getRandomCover } from '../../../utils/getRandomCover';

import styles from './TopTrack.module.scss';

export interface TopTrackProps {
  track: ArtistTopTrack;
}

export const TopTrack: FC<TopTrackProps> = ({ track }) => {
  const { name, artist, url, mbid } = track;

  const coverSrc = useMemo(() => getRandomCover(), []);

  return (
    <Card className={styles.trackItem} hoverable bodyStyle={{ padding: '8px 10px' }}>
      <Link to={{
        pathname: '/track',
        state: {
          track: name,
          artist: artist?.name,
          mbid: mbid
        }
      }}>
        <LazyLoad throttle={200} height={200} classNamePrefix={styles.lazyImage}>
          <img src={coverSrc} title={name} alt={name} className={styles.coverImage} />
        </LazyLoad>
        <p className={styles.songName}>
          {name}
        </p>
      </Link>
      <Button
        type="link"
        icon={<LastFmIcon className={styles.lasfmIcon} />}
        className={styles.lastFmLink}
        href={url || '#'}
      >
        Discover on LastFM
      </Button>
    </Card>
  );
}
