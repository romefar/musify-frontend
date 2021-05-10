import { Switch, Route, Redirect } from 'react-router-dom';

import { AlbumPage } from '../pages/AlbumInfoPage';
import { AlbumSearchPage } from '../pages/AlbumSearchPage';
import { ArtistPage } from '../pages/ArtistPage';
import { ArtistSearchPage } from '../pages/ArtistSeachPage';
import { AuthPage } from '../pages/AuthPage';
import { HomePage } from '../pages/HomePage';
import { NotFoundPage } from '../pages/NotFound';
import { TopArtistPage } from '../pages/TopArtist';
import { TrackPage } from '../pages/TrackPage';
import { TrackSearchPage } from '../pages/TrackSearch';
import { TopTrackPage } from '../pages/TrackTopPage';

export const AppRouter = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/artist'>
        <ArtistPage />
      </Route>
      <Route exact path='/artist/top'>
        <TopArtistPage />
      </Route>
      <Route exact path='/artist/search'>
        <ArtistSearchPage />
      </Route>
      <Route exact path='/track'>
        <TrackPage />
      </Route>
      <Route exact path='/track/search'>
        <TrackSearchPage />
      </Route>
      <Route exact path='/track/top'>
        <TopTrackPage />
      </Route>
      <Route exact path='/album'>
        <AlbumPage />
      </Route>
      <Route exact path='/album/search'>
        <AlbumSearchPage />
      </Route>
      <Route exact path='/404'>
        <NotFoundPage />
      </Route>
      <Route exact path='/auth'>
        <AuthPage />
      </Route>
      <Redirect from='*' to='/404' />
    </Switch>
  );
};
