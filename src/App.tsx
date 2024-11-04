import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import UserAuth from './components/UserAuth/UserAuth';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemsList from './components/ItemsList/ItemsList';
import CharactersPage from './pages/CharacterPage/CharacterPage';
import ShipsPage from './pages/StarshipsPage/StarshipsPage';
import PlanetPage from './pages/PlanetPage/PlanetPage';
import ProtectedRoute from './helpers/ProtectedRoute/ProtectedRoute';
import CharacterDetails from './pages/CharacterPage/CharacterDetails';
import PlanetDetails from './pages/PlanetPage/PlanetDetails';
import StarshipDetails from './pages/StarshipsPage/StarshipsDetails';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserAuth />} />
          <Route
            path="/items-list"
            element={
              <ProtectedRoute>
                <ItemsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/characters"
            element={
              <ProtectedRoute>
                <CharactersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/planets"
            element={
              <ProtectedRoute>
                <PlanetPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/starships"
            element={
              <ProtectedRoute>
                <ShipsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details"
            element={
              <ProtectedRoute>
                <CharacterDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/characters/:name"
            element={
              <ProtectedRoute>
                <CharacterDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/planets/:name"
            element={
              <ProtectedRoute>
                <PlanetDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/starships/:name"
            element={
              <ProtectedRoute>
                <StarshipDetails/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
