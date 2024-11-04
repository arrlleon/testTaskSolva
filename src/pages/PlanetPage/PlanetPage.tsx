import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '../../helpers/Spinner/Spinner';

interface Character {
    name: string;
    gender: string;
    birth_year: string;
  }

export default function PlanetPage() {
  const [planets, setPlanets] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 



  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await axios.get(`https://swapi.dev/api/planets/?page=${page}`);
        setPlanets(response.data.results);
      } catch (err) {
        setError("Ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, [page]);

  return (
    <div className='container'>
      <h1>Planets</h1>

      {loading && <Spinner />} 

      {error && <p className='error'>{error}</p>} 

      {!loading && !error && (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>

          </tr>
        </thead>
        <tbody>
          {planets.map((planet) => (
            <tr key={planet.name}>
              <td><Link to={`/planets/${planet.name}`}>{planet.name}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      )}

      <button className='btn-pagination' onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button className='btn-pagination' onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
}
