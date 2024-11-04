import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../helpers/Spinner/Spinner';

interface Character {
    name: string;
    gender: string;
    birth_year: string;
}

const schema = yup.object({
    name: yup.string().required("данная строка не может быть пустой"),
    gender: yup.string().required("данная строка не может быть пустой"),
    birth_year: yup.string().required("данная строка не может быть пустой"),
});

export default function CharacterDetails() {
    const { name } = useParams<{ name: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`https://swapi.dev/api/people/?search=${name}`);
                
                if (response.data.results.length > 0) {
                    const characterData = response.data.results[0];
                    setCharacter(characterData);
                    
                    setValue("name", characterData.name);
                    setValue("gender", characterData.gender);
                    setValue("birth_year", characterData.birth_year);
                } else {
                    setError("Персонаж не найден");
                }
            } catch (err) {
                setError("Ошибка при загрузке данных");
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [name, setValue]);

    const onSubmit = (data: any) => {
        console.log("Edited Data:", data);
    };


    return (
        <div className='container'>
        <h2>{character?.name}</h2>

        {loading && <Spinner />} 

        {error && <p className='error'>{error}</p>} 

        {!loading && !error && (

        <form onSubmit={handleSubmit(onSubmit)} className='details'>
            <label>Name:</label>
            <input {...register("name")} />
            {errors.name && <p role='alert' className="error-message">{errors.name.message}</p>}
            <label>Gender:</label>
            <input {...register("gender")} />
            {errors.gender && <p role='alert' className="error-message">{errors.gender.message}</p>}

            <label>Birth Year:</label>
            <input {...register("birth_year")} />
            {errors.birth_year && <p role='alert' className="error-message">{errors.birth_year.message}</p>}
            <button type="submit">Save</button>
        </form>
        )}

        </div>
    );
}
