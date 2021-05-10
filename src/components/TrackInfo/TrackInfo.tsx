import { FC } from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_TRACK_INFO } from '../../graphql/queries/track';
import { TrackInfoModel } from '../../models';

import defaultCover from '../../assets/covers/cover1.jpg';
import { ReactComponent as ListenIcon } from '../../assets/icons/headphones.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play-button.svg';
import { ReactComponent as DurationIcon } from '../../assets/icons/duration.svg';
import { ReactComponent as PublishIcon } from '../../assets/icons/up-arrow.svg';
import { ReactComponent as LastFmIcon } from '../../assets/icons/lastfm.svg';

import styles from './TrackInfo.module.scss';
import { Link } from 'react-router-dom';
import { selectImageSize } from '../../utils/selectImageSize';
import { calculateDuration } from '../../utils/calculateDuration';
import { Spinner } from '../../shared/Spinner';
import { ErrorCard } from '../ErrorCard';

export interface TrackInfoProps {
  options: {
    artist: string;
    track: string;
    mbid?: string;
  }
}

interface TrackInfoVars {
  artist: string;
  track: string;
  mbid?: string;
}

export const TrackInfo: FC<TrackInfoProps> = ({ options }) => {
  const { loading, error, data } = useQuery<TrackInfoModel, TrackInfoVars>(GET_TRACK_INFO, {
    variables: {
     ...options
    }
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorCard />;
  }

  const duration = calculateDuration(data?.track?.duration);
  const playcount = data?.track?.playcount ?? '-';
  const listeners = data?.track?.listeners ?? '-';
  const isAlbumInfoExist = data?.track?.album;
  const isWikiInfoExist = data?.track?.wiki;
  const image = data?.track?.album?.image ? selectImageSize(data.track.album.image) : defaultCover;

  return (
    <section className={styles.trackInfoContainer}>
      <img src={image} alt={data?.track?.name} title={data?.track?.name} className={styles.trackImage} />
      <div>
        <h2 className={styles.trackName}>{data?.track?.name ?? '-'}</h2>
        <h3 className={styles.trackArtist}>
          <Link to={{
            pathname: '/artist',
            state: {
              artist: data?.track?.artist.name,
              mbid: data?.track?.artist.mbid,
            }
          }}>
            {data?.track?.artist.name ?? '-'}
          </Link>
        </h3>
        <div className={styles.trackStatContainer}>
          <div className={styles.trackStatIcon}>
            <ListenIcon />
          </div>
          <p className={styles.trackStatCount}>{`Listeners: ${listeners}`}</p>
        </div>
        <div className={styles.trackStatContainer}>
          <div className={styles.trackStatIcon}>
            <PlayIcon />
          </div>
          <p className={styles.trackStatCount}>{`Play count: ${playcount}`}</p>
        </div>
        <div className={styles.trackStatContainer}>
          <div className={styles.trackStatIcon}>
            <DurationIcon />
          </div>
          <p className={styles.trackStatCount}>{`Duration: ${duration}`}</p>
        </div>
        <div className={styles.trackStatContainer}>
          <div className={styles.trackStatIcon}>
            <PublishIcon />
          </div>
          <p className={styles.trackStatCount}>{`Published: ${data?.track?.wiki?.published || '-'}`}</p>
        </div>
        {isAlbumInfoExist && (
          <div className={styles.albumContainer}>
            <p className={styles.albumText}>From album: </p>
            <Link to={{
              pathname: '/album',
              state: {
                artist: data?.track.artist?.name,
                album: data?.track.album?.title,
                mbid: data?.track?.album?.mbid
              }
            }}>
              {data?.track?.album?.title}
            </Link>
          </div>
        )}
        <Button
          type="link"
          icon={<LastFmIcon className={styles.lasfmIcon} />}
          className={styles.lastFmLink}
          href={data?.track?.url || '#'}
        >
          Listen on LastFM
         </Button>
      </div>
      {isWikiInfoExist && (
        <div className={styles.trackSummary}>
          <p>{data?.track?.wiki?.summary.replace(/<\/?a[^>]*>/g, "")}</p>
          <p>{data?.track?.wiki?.content.replace(/<\/?a[^>]*>/g, "")}</p>
        </div>
      )}
    </section>
  )
}
