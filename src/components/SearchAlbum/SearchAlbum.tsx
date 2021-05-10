import { useLazyQuery } from "@apollo/client"
import { Typography } from "antd";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';
import { SEARCH_ALBUM } from "../../graphql/queries/album";
import { AlbumSearchResult } from "../../models"
import { AlbumCard } from "../AlbumCard";
import { SearchInput } from "../SearchInput";

import styles from './SearchAlbum.module.scss';

interface SearchAlbumVars {
  album: string;
  limit?: number;
  page?: number;
}

interface SearchArtistModel {
  searchAlbum: AlbumSearchResult;
}

export const SearchAlbum = () => {
  const [searchText, setSearchText] = useState('');
  const [searchAlbum, { data, loading, fetchMore }] = useLazyQuery<SearchArtistModel, SearchAlbumVars>(SEARCH_ALBUM, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  });
  const hasMore = data ? !(data?.searchAlbum?.totalResults === data?.searchAlbum?.albums?.length) : false;

  return (
    <section className={styles.searchAlbumContainer}>
      <Typography className={styles.title}>Search albums</Typography>
      <div className={styles.searchInput}>
        <SearchInput placeholder="Search by album name" onSearch={(text: string) => {
          setSearchText(text);

          if (text) {
            searchAlbum({ variables: { page: 1, album: text } });
          }
        }}
        />
      </div>
      {data && data.searchAlbum.albums.length && <Typography.Paragraph className={styles.resultCount}>{`Found ${data.searchAlbum.totalResults} artists`}</Typography.Paragraph>}
      {searchText && !data?.searchAlbum.albums.length && !loading && <Typography.Paragraph className={styles.resultCount}>No results</Typography.Paragraph>}
      <InfiniteScroll
        pageStart={data?.searchAlbum.page || 1}
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
        <div className={styles.albumItemsContainer}>
          {data?.searchAlbum.albums.map(album => (
            <AlbumCard
              key={`${album.url}${album.mbid}${album.name}`}
              item={album}
            />
          ))}
        </div>
      </InfiniteScroll>
    </section>
  )
};
