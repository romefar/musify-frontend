import { useLazyQuery } from "@apollo/client"
import { Typography } from "antd";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { SEARCH_ARTIST } from "../../graphql/queries/artists";
import { ArtistSearchResult } from "../../models"
import { ArtistCard } from "../ArtistCard";
import { SearchInput } from "../SearchInput";

import styles from './SearchArtist.module.scss';

interface SearchArtistVars {
  artist: string;
  limit?: number;
  page?: number;
}

interface SearchArtistModel {
  searchArtist: ArtistSearchResult;
}

export const SearchArtist = () => {
  const [searchText, setSearchText] = useState('');
  const [searchArtist, { data, loading, fetchMore }] = useLazyQuery<SearchArtistModel, SearchArtistVars>(SEARCH_ARTIST, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });
  const hasMore = data ? !(data?.searchArtist?.totalResults === data?.searchArtist?.artists?.length) : false;

  return (
    <section className={styles.searchArtistContainer}>
      <Typography className={styles.title}>Search artists</Typography>
      <div className={styles.searchInput}>
        <SearchInput placeholder="Search by artist" onSearch={(text: string) => {
          setSearchText(text);

          if (text) {
            searchArtist({ variables: { page: 1, artist: text } });
          }
        }}
        />
      </div>
      {data && data.searchArtist.artists.length && <Typography.Paragraph className={styles.resultCount}>{`Found ${data.searchArtist.totalResults} artists`}</Typography.Paragraph>}
      {searchText && !data?.searchArtist.artists.length && !loading && <Typography.Paragraph className={styles.resultCount}>No results</Typography.Paragraph>}
      <InfiniteScroll
        pageStart={data?.searchArtist.page || 1}
        loadMore={(page: number) => {
          if (fetchMore) {
            fetchMore({ variables: { page, artist: searchText } })
          }
        }}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
        initialLoad={false}
        useWindow={true}
      >
        <div className={styles.artistItemsContainer}>
          {data?.searchArtist.artists.map(artist => (
            <ArtistCard
              key={`${artist.url}${artist.mbid}${artist.name}`}
              item={artist}
            />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  )
};
