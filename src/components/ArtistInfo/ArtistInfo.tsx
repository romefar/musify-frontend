import { useQuery } from '@apollo/client';
import { FC } from 'react';
import { Button, Divider } from 'antd';

import { GET_ARTIST_FULL_INFO } from '../../graphql/queries/artists';
import { ArtistFullInfo } from '../../models';
import { selectImageSize } from '../../utils/selectImageSize';
import defaultCover from '../../assets/covers/cover3.jpg';
import { ReactComponent as ListenIcon } from '../../assets/icons/headphones.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play-button.svg';
import { ReactComponent as TourIcon } from '../../assets/icons/flight.svg';
import { ReactComponent as PublishIcon } from '../../assets/icons/up-arrow.svg';
import { ReactComponent as LastFmIcon } from '../../assets/icons/lastfm.svg';
import { SimilarArtist } from './SimilarArtist';
import { TopTrack } from './TopTrack';
import { TopAlbum } from './TopAlbum';
import { Spinner } from '../../shared/Spinner';
import { ErrorCard } from '../ErrorCard';
import styles from './ArtistInfo.module.scss';
export interface ArtistInfoProps {
  options: {
    artist: string;
    mbid?: string;
  }
}

interface ArtistInfoVars {
  artist: string;
  mbid?: string;
  limit?: number;
}

export const ArtistInfo: FC<ArtistInfoProps> = ({ options }) => {
  const { loading, error, data } = useQuery<ArtistFullInfo, ArtistInfoVars>(GET_ARTIST_FULL_INFO, {
    variables: {
      ...options,
      limit: 12,
    },
  });

  const artist = data?.artist;
  const topTracks = data?.artistTopTracks;
  const topAlbums = data?.topAlbums;

  const isBioAvailable = artist?.bio;

  const image = artist?.image ? selectImageSize(artist?.image) : defaultCover;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorCard />;
  }

  return (
    <section className={styles.artistInfoContainer}>
      <img src={image || defaultCover} alt={artist?.name} title={artist?.name} className={styles.artistImage} />
      <div>
        <h2 className={styles.artistName}>{artist?.name ?? '-'}</h2>
        <div className={styles.artistStatContainer}>
          <div className={styles.artistStatIcon}>
            <ListenIcon />
          </div>
          <p className={styles.artistStatCount}>{`Listeners: ${artist?.stats.listeners}`}</p>
        </div>
        <div className={styles.artistStatContainer}>
          <div className={styles.artistStatIcon}>
            <PlayIcon />
          </div>
          <p className={styles.artistStatCount}>{`Play count: ${artist?.stats.playcount}`}</p>
        </div>
        {!!artist?.ontour && (
          <div className={styles.artistStatContainer}>
            <div className={styles.artistStatIcon}>
              <TourIcon />
            </div>
            <p className={styles.artistStatCount}>{'Currently on tour!'}</p>
          </div>
        )}
        <div className={styles.artistStatContainer}>
          <div className={styles.artistStatIcon}>
            <PublishIcon />
          </div>
          <p className={styles.artistStatCount}>{`Published: ${artist?.bio.published ?? '-'}`}</p>
        </div>
        <Button
          type='link'
          icon={<LastFmIcon className={styles.lasfmIcon} />}
          className={styles.lastFmLink}
          href={artist?.url || '#'}
        >
          Listen on LastFM
         </Button>
      </div>
      {isBioAvailable && (
        <div className={styles.artistBio}>
          <Divider orientation='left'>Biography</Divider>
          <p>{artist?.bio?.summary.replace(/<\/?a[^>]*>/g, '')}</p>
          <p>{artist?.bio?.content.replace(/<\/?a[^>]*>/g, '')}</p>
        </div>
      )}
      {artist?.similar && (
        <div className={styles.artistAdvanceInfoContainer}>
         <Divider orientation='left'>Similar Artists</Divider>
          <div className={styles.artistAdvanceInfoItems}>
            {artist.similar.map(item => (
              <SimilarArtist artist={item} key={item.url} />
            ))}
          </div>
        </div>
      )}
      {topTracks && (
        <div className={styles.artistAdvanceInfoContainer}>
          <Divider orientation='left'>Top Tracks</Divider>
          <div className={styles.artistAdvanceInfoItems}>
            {topTracks.map(item => (
              <TopTrack track={item} key={item.url} />
            ))}
          </div>
        </div>
      )}
      {topAlbums && (
        <div className={styles.artistAdvanceInfoContainer}>
          <Divider orientation='left'>Top Albums</Divider>
          <div className={styles.artistAdvanceInfoItems}>
            {topAlbums.albums.map(item => (
              <TopAlbum album={item} key={item.url} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
