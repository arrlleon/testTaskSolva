import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '../../helpers/Spinner/Spinner';

interface Character {
    name: string;
    gender: string;
    birth_year: string;
  }

export default function ShipsPage() {
  const [starships, setStarships] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 


  useEffect(() => {
    const fetchShips = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await axios.get(`https://swapi.dev/api/starships/?page=${page}`);
        setStarships(response.data.results);
      } catch (err) {
        setError("Ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    };

    fetchShips();
  }, [page]);

  return (
    <div className='container'>
      <h1>Starships</h1>

      {loading && <Spinner />} 

      {error && <p className='error'>{error}</p>} 

    {!loading && !error && (
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {starships.map((starship) => (
            <tr key={starship.name}>
              <td><Link to={`/starships/${starship.name}`}>{starship.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
}
