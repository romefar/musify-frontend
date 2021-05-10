import { FC } from 'react';
import { Button } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_ALBUM_INFO } from '../../graphql/queries/album';
import { AlbumInfo as AlbumInfoModel } from '../../models';

import defaultCover from '../../assets/covers/cover2.jpg';
import { ReactComponent as ListenIcon } from '../../assets/icons/headphones.svg';
import { ReactComponent as PlayIcon } from '../../assets/icons/play-button.svg';
import { ReactComponent as PublishIcon } from '../../assets/icons/up-arrow.svg';
import { ReactComponent as LastFmIcon } from '../../assets/icons/lastfm.svg';

import styles from './AlbumInfo.module.scss';
import { Link } from 'react-router-dom';
import { selectImageSize } from '../../utils/selectImageSize';
import { calculateDuration } from '../../utils/calculateDuration';
import { Spinner } from '../../shared/Spinner';
import { ErrorCard } from '../ErrorCard';

export interface AlbumInfoProps {
  options: {
    artist: string;
    album: string;
    mbid?: string;
  }
}

interface AlbumInfoVars {
  artist: string;
  album: string;
  mbid?: string;
}

export const AlbumInfo: FC<AlbumInfoProps> = ({ options }) => {
  const { loading, error, data } = useQuery<AlbumInfoModel, AlbumInfoVars>(GET_ALBUM_INFO, {
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

  const playcount = data?.album?.playcount ?? '-';
  const listeners = data?.album?.listeners ?? '-';
  const isWikiInfoExist = data?.album?.wiki;
  const isSongListExist = !!data?.album?.tracks?.length;
  const image = data?.album?.image ? selectImageSize(data.album.image) : defaultCover;

  return (
    <section className={styles.albumInfoContainer}>
      <img src={image || defaultCover} alt={data?.album?.name} title={data?.album?.name} className={styles.albumImage} />
      <div>
        <h2 className={styles.albumName}>{data?.album?.name ?? '-'}</h2>
        <h3 className={styles.albumArtist}>
          <Link to={{
            pathname: '/artist',
            state: {
              track: data?.album.artist,
              mbid: data?.album.mbid
            }
          }}>
            {data?.album?.artist ?? '-'}
          </Link>
        </h3>
        <div className={styles.albumStatContainer}>
          <div className={styles.albumStatIcon}>
            <ListenIcon />
          </div>
          <p className={styles.albumStatCount}>{`Listeners: ${listeners}`}</p>
        </div>
        <div className={styles.albumStatContainer}>
          <div className={styles.albumStatIcon}>
            <PlayIcon />
          </div>
          <p className={styles.albumStatCount}>{`Play count: ${playcount}`}</p>
        </div>
        <div className={styles.albumStatContainer}>
          <div className={styles.albumStatIcon}>
            <PublishIcon />
          </div>
          <p className={styles.albumStatCount}>{`Published: ${data?.album?.wiki?.published ?? '-'}`}</p>
        </div>
        <Button
          type="link"
          icon={<LastFmIcon className={styles.lasfmIcon} />}
          className={styles.lastFmLink}
          href={data?.album?.url || '#'}
        >
          Listen on LastFM
         </Button>
      </div>
      {isSongListExist && (
        <div className={styles.albumSongListContainer}>
          <h3>Songs</h3>
          <ol className={styles.albumSongList}>
            {data?.album?.tracks.map((track, index) => {
              const duration = calculateDuration(track.duration, false);

              return (
                <li key={track.url}>
                  <Link to={{
                    pathname: '/track',
                    state: {
                      track: track.name,
                      artist: data.album.artist,
                    }
                  }}>
                    {`${track.name} - ${duration}`}
                  </Link>
                </li>
              )
            })}
          </ol>
        </div>
      )}
      {isWikiInfoExist && (
        <div className={styles.albumSummary}>
          <p>{data?.album?.wiki?.summary.replace(/<\/?a[^>]*>/g, "")}</p>
          <p>{data?.album?.wiki?.content.replace(/<\/?a[^>]*>/g, "")}</p>
        </div>
      )}
    </section>
  )
}
