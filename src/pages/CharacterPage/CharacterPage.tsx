import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Spinner } from '../../helpers/Spinner/Spinner';

interface Character {
    name: string;
    gender: string;
    birth_year: string;
}

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        setCharacters(response.data.results);
      } catch (err) {
        setError("Ошибка при загрузке данных.");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page]);

  return (
    <div className='container'>
      <h1>Characters</h1>
      
      {loading && <Spinner />} 

      {error && <p className='error'>{error}</p>} 

      {!loading && !error && (
        <table className='table'>
          <thead className='thead'>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Birth Year</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <tr key={character.name}>
                <td><Link to={`/characters/${character.name}`} className='character-name'>{character.name}</Link></td>
                <td className='chatacter-gender'>{character.gender}</td>
                <td className='character-birth'>{character.birth_year}</td>
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

