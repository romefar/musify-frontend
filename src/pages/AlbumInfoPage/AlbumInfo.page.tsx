import { useLocation } from 'react-router-dom';
import { AlbumInfo } from '../../components/AlbumInfo';
import { AlbumInfoOptions } from '../../models';

export const AlbumPage = () => {
  const location = useLocation<AlbumInfoOptions>();
  const { artist, mbid, album } = location.state;

  return (
    <AlbumInfo options={{ artist, mbid, album }}/>
  )
};
