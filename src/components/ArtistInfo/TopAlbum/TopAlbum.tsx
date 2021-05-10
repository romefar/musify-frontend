import { FC, useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { Album } from '../../../models';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import { ReactComponent as LastFmIcon } from '../../../assets/icons/lastfm.svg';
import { getRandomCover } from '../../../utils/getRandomCover';

import styles from './TopAlbum.module.scss';

export interface TopAlbumProps {
  album: Album;
}

export const TopAlbum: FC<TopAlbumProps> = ({ album }) => {
  const { name, artist, url, mbid } = album;

  const coverSrc = useMemo(() => getRandomCover(), []);

  return (
    <Card className={styles.albumItem} hoverable bodyStyle={{ padding: '8px 10px' }}>
      <Link to={{
        pathname: '/album',
        state: {
          album: name,
          artist: artist?.name,
          mbid: mbid
        }
      }}>
        <LazyLoad throttle={200} height={200} classNamePrefix={styles.lazyImage}>
          <img src={coverSrc} title={name} alt={name} className={styles.coverImage} />
        </LazyLoad>
        <p className={styles.albumName}>
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
