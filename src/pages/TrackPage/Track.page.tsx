import { useLocation } from 'react-router-dom';
import { TrackInfo } from '../../components/TrackInfo';
import { TrackInfoOptions } from '../../models';

export const TrackPage = () => {
  const location = useLocation<TrackInfoOptions>();
  const { artist, mbid, track } = location.state;

  return (
    <TrackInfo options={{ artist, mbid, track }}/>
  )
};
