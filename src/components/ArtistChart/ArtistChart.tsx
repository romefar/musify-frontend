import { useQuery } from '@apollo/client';
import InfiniteScroll from 'react-infinite-scroller';

import { GET_ARTIST_TOP } from '../../graphql/queries/artists';
import { ArtistTop } from '../../models';
import { Spinner } from '../../shared/Spinner';
import { ArtistCard } from '../ArtistCard';
import { ErrorCard } from '../ErrorCard';
import styles from './ArtistChart.module.scss';

interface ArtistTopResponse {
  topArtists: ArtistTop;
}

interface TopArtistVars {
  page: number;
  limit?: number;
}

export const ArtistChart = () => {
  const { loading, error, data, fetchMore } = useQuery<ArtistTopResponse, TopArtistVars>(GET_ARTIST_TOP, {
    variables: {
      page: 1,
      limit: 30,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorCard />;
  }

  return (
    <section className={styles.artistChart}>
      <h2 className={styles.title}>Top Artists</h2>
      <InfiniteScroll
        pageStart={data?.topArtists.page || 1}
        loadMore={(page: number) => {
          fetchMore({ variables: { page } });
        }}
        hasMore={!!data?.topArtists.artists.length}
        loader={<div className='loader' key={0}>Loading ...</div>}
        initialLoad={false}
        useWindow={true}
      >
        <div className={styles.container}>
          {data?.topArtists.artists.map(artist => (
            <ArtistCard key={`${artist.url}${artist.mbid}${artist.name}`} item={artist} />
          ))}
        </div>
      </InfiniteScroll>
    </section >
  );
};
