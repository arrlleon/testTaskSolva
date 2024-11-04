import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../helpers/Spinner/Spinner';

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
}

const schema = yup.object({
    name: yup.string().required("данная строка не может быть пустой"),
    rotation_period: yup.string().required("данная строка не может быть пустой"),
    orbital_period: yup.string().required("данная строка не может быть пустой"),
    diameter: yup.string().required("данная строка не может быть пустой"),
    climate: yup.string().required("данная строка не может быть пустой"),
    gravity: yup.string().required("данная строка не может быть пустой"),
    terrain: yup.string().required("данная строка не может быть пустой"),
    surface_water: yup.string().required("данная строка не может быть пустой"),
    population: yup.string().required("данная строка не может быть пустой"),
});

export default function PlanetDetails() {
    const { name } = useParams<{ name: string }>();
    const [planet, setPlanet] = useState<Planet | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, setValue, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`https://swapi.dev/api/planets/?search=${name}`);
                
                if (response.data.results.length > 0) {
                    const planetData = response.data.results[0];
                    setPlanet(planetData);
                    
                    setValue("name", planetData.name);
                    setValue("rotation_period", planetData.rotation_period);
                    setValue("orbital_period", planetData.orbital_period);
                    setValue("diameter", planetData.diameter);
                    setValue("climate", planetData.climate);
                    setValue("gravity", planetData.gravity);
                    setValue("terrain", planetData.terrain);
                    setValue("surface_water", planetData.surface_water);
                    setValue("population", planetData.population);
                } else {
                    setError("Планета не найдена");
                }
            } catch (err) {
                setError("Ошибка при загрузке данных");
            } finally {
                setLoading(false);
            }
        };

        fetchPlanet();
    }, [name, setValue]);

    const onSubmit = (data: any) => {
        console.log("Edited Data:", data);
    };



    return (
        <div className='container'>
            {loading && <Spinner />} 

            {error && <p className='error'>{error}</p>} 

            <h2>{planet?.name}</h2>

            {!loading && !error &&(
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name:</label>
                <input {...register("name")} />
                {errors.name && <p role='alert' className="error-message">{errors.name.message}</p>}
                <label>Rotation Period:</label>
                <input {...register("rotation_period")} />
                {errors.rotation_period && <p role='alert' className="error-message">{errors.rotation_period.message}</p>}

                <label>Orbital Period:</label>
                <input {...register("orbital_period")} />
                {errors.orbital_period && <p role='alert' className="error-message">{errors.orbital_period.message}</p>}

                <label>Diameter:</label>
                <input {...register("diameter")} />
                {errors.diameter && <p role='alert' className="error-message">{errors.diameter.message}</p>}

                <label>Climate:</label>
                <input {...register("climate")} />
                {errors.climate && <p role='alert' className="error-message">{errors.climate.message}</p>}

                <label>Gravity:</label>
                <input {...register("gravity")} />
                {errors.gravity && <p role='alert' className="error-message">{errors.gravity.message}</p>}
                <label>Terrain:</label>
                <input {...register("terrain")} />
                {errors.terrain && <p role='alert' className="error-message">{errors.terrain.message}</p>}
                <label>Surface Water:</label>
                <input {...register("surface_water")} />
                {errors.surface_water && <p role='alert' className="error-message">{errors.surface_water.message}</p>}

                <label>Population:</label>
                <input {...register("population")} />
                {errors.population && <p role='alert' className="error-message">{errors.population.message}</p>}

                <button type="submit">Save</button>
            </form>
            )}
        </div>
    );
}
