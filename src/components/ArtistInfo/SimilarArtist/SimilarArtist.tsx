import { FC, useMemo } from 'react';
import { Card, Button } from 'antd';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import { SimilarArtist as SimilarArtistModel } from '../../../models';
import { ReactComponent as LastFmIcon } from '../../../assets/icons/lastfm.svg';
import { getRandomCover } from '../../../utils/getRandomCover';
import styles from './SimilarArtist.module.scss';
interface SimilarArtistProps {
  artist: SimilarArtistModel;
}

export const SimilarArtist: FC<SimilarArtistProps> = ({ artist }) => {
  const { name, url } = artist;

  const cover = useMemo(() => getRandomCover(), []);

  return (
    <Card className={styles.similarArtistItem} hoverable bodyStyle={{ padding: '8px 10px' }}>
      <Link to={{
        pathname: '/artist',
        state: {
          artist: name,
        },
      }}>
        <LazyLoad throttle={200} height={200} classNamePrefix={styles.lazyImage}>
          <img src={cover} title={name} alt={name} className={styles.coverImage} />
        </LazyLoad>
        <p className={styles.artistName}>
          {name}
        </p>
      </Link>
      <Button
        type='link'
        icon={<LastFmIcon className={styles.lasfmIcon} />}
        className={styles.lastFmLink}
        href={url || '#'}
      >
        Discover on LastFM
      </Button>
    </Card >
  );
};
