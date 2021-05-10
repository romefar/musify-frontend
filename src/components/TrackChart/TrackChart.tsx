import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroller';
import { GET_CHART_TOP_TRACKS } from '../../graphql/queries/track';
import { TopTrack } from '../../models';
import { Spinner } from '../../shared/Spinner';
import { ErrorCard } from '../ErrorCard/';
import { TrackCard } from '../TrackCard';

import styles from './TrackChart.module.scss';

interface TopTrackData {
  topTracks: TopTrack;
}

interface TopTrackVars {
  page: number;
  limit?: number;
}

export const TrackChart = () => {
  const { loading, error, data, fetchMore } = useQuery<TopTrackData, TopTrackVars>(GET_CHART_TOP_TRACKS, {
    variables: {
      page: 1,
      limit: 30
    }
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorCard />
  }

  return (
    <section className={styles.trackChart}>
      <h2 className={styles.title}>Top Tracks</h2>
      <InfiniteScroll
        pageStart={data?.topTracks.page || 1}
        loadMore={(page: number) => {
          fetchMore({ variables: { page } })
        }}
        hasMore={!!data?.topTracks.tracks.length}
        loader={<div className="loader" key={0}>Loading ...</div>}
        initialLoad={false}
        useWindow={true}
      >
        <div className={styles.tracksContainer}>
          {data?.topTracks.tracks.map(track => (
            <TrackCard
              key={`${track.url}${track.mbid}${track.artist.name}`}
              item={track}
              trackLink={{
                track: track.name,
                artist: track.artist.name,
                mbid: track.mbid
              }}
              artistLink={{
                artist: track?.artist?.name,
                mbid: track?.artist?.mbid,
              }}
            />
          ))}
        </div>
      </InfiniteScroll>
    </section >
  );
};
