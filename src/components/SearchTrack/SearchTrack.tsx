import { useLazyQuery } from "@apollo/client"
import { Typography } from "antd";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { SEARCH_TRACK } from "../../graphql/queries/track"
import { TrackSearchResult } from "../../models"
import { SearchInput } from "../SearchInput";
import { TrackCard } from '../TrackCard';

import styles from './SearchTrack.module.scss';

interface SearchTrackVars {
  artist?: string;
  track: string;
  limit?: number;
  page?: number;
}

interface SearchTrackModel {
  searchTrack: TrackSearchResult;
}

export const SearchTrack = () => {
  const [searchText, setSearchText] = useState('');
  const [searchTracks, { data, loading, fetchMore }] = useLazyQuery<SearchTrackModel, SearchTrackVars>(SEARCH_TRACK, {
    errorPolicy: 'all',
    fetchPolicy: 'network-only',
  });

  return (
    <section className={styles.searchTrackContainer}>
      <Typography className={styles.title}>Search tracks</Typography>
      <div className={styles.searchInput}>
        <SearchInput placeholder="Search by track name" onSearch={(text: string) => {
          setSearchText(text);

          if (text) {
            searchTracks({ variables: { page: 1, track: text } });
          }
        }}
        />
      </div>
      {data && data.searchTrack.tracks.length &&<Typography.Paragraph className={styles.resultCount}>{`Found ${data.searchTrack.totalResults} tracks`}</Typography.Paragraph>}
      {searchText && !data?.searchTrack.tracks.length && !loading && <Typography.Paragraph className={styles.resultCount}>No results</Typography.Paragraph>}
      <InfiniteScroll
        pageStart={data?.searchTrack.page || 1}
        loadMore={(page: number) => {
          if (fetchMore) {
            fetchMore({ variables: { page, track: searchText } })
          }
        }}
        hasMore={!!data?.searchTrack.tracks.length}
        loader={<div className="loader" key={0}>Loading ...</div>}
        initialLoad={false}
        useWindow={true}
      >
        <div className={styles.trackItemsContainer}>
          {data?.searchTrack.tracks.map(track => (
            <TrackCard
              key={`${track.url}${track.mbid}${track.name}`}
              item={track}
              artistLink={{
                artist: track.artist,
                mbid: track.mbid
              }}
              trackLink={{
                artist: track.artist,
                track: track.name,
                mbid: track.mbid
              }}
            />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  )
};
