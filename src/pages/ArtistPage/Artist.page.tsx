import { useLocation } from 'react-router-dom';

import { ArtistInfo } from '../../components/ArtistInfo';
import { ArtistInfoOptions } from '../../models';

export const ArtistPage = () => {
  const location = useLocation<ArtistInfoOptions>();
  const { artist, mbid } = location.state;
  console.log(location.state);

  return (
    <ArtistInfo options={{ artist, mbid }} />
  );
};
