import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Spinner } from '../../helpers/Spinner/Spinner';

interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    hyperdrive_rating: string;
    MGLT: string;
    starship_class: string;
}

const schema = yup.object({
    name: yup.string().required("данная строка не может быть пустой"),
    model: yup.string().required("данная строка не может быть пустой"),
    manufacturer: yup.string().required("данная строка не может быть пустой"),
    cost_in_credits: yup.string().required("данная строка не может быть пустой"),
    length: yup.string().required("данная строка не может быть пустой"),
    max_atmosphering_speed: yup.string().required("данная строка не может быть пустой"),
    crew: yup.string().required("данная строка не может быть пустой"),
    passengers: yup.string().required("данная строка не может быть пустой"),
    cargo_capacity: yup.string().required("данная строка не может быть пустой"),
    consumables: yup.string().required("данная строка не может быть пустой"),
    hyperdrive_rating: yup.string().required("данная строка не может быть пустой"),
    MGLT: yup.string().required("данная строка не может быть пустой"),
    starship_class: yup.string().required("данная строка не может быть пустой"),
});

export default function StarshipDetails() {
    const { name } = useParams<{ name: string }>();
    const [starship, setStarship] = useState<Starship | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, setValue, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const fetchStarship = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await axios.get(`https://swapi.dev/api/starships/?search=${name}`);
                
                if (response.data.results.length > 0) {
                    const starshipData = response.data.results[0];
                    setStarship(starshipData);
                    
                    setValue("name", starshipData.name);
                    setValue("model", starshipData.model);
                    setValue("manufacturer", starshipData.manufacturer);
                    setValue("cost_in_credits", starshipData.cost_in_credits);
                    setValue("length", starshipData.length);
                    setValue("max_atmosphering_speed", starshipData.max_atmosphering_speed);
                    setValue("crew", starshipData.crew);
                    setValue("passengers", starshipData.passengers);
                    setValue("cargo_capacity", starshipData.cargo_capacity);
                    setValue("consumables", starshipData.consumables);
                    setValue("hyperdrive_rating", starshipData.hyperdrive_rating);
                    setValue("MGLT", starshipData.MGLT);
                    setValue("starship_class", starshipData.starship_class);
                } else {
                    setError("Корабль не найден");
                }
            } catch (err) {
                setError("Ошибка при загрузке данных");
            } finally {
                setLoading(false);
            }
        };

        fetchStarship();
    }, [name, setValue]);

    const onSubmit = (data: any) => {
        console.log("Edited Data:", data);
    };


    return (

        <div className='container'>
            <h1>{starship?.name}</h1>

            {loading && <Spinner />} 

            {error && <p className='error'>{error}</p>} 

            {!loading && !error && (

        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Name:</label>
            <input {...register("name")} />
                {errors.name && <p role='alert' className="error-message">{errors.name.message}</p>}
            <label>Model:</label>
            <input {...register("model")} />
                {errors.model && <p role='alert' className="error-message">{errors.model.message}</p>}
            <label>Manufacturer:</label>
            <input {...register("manufacturer")} />
                {errors.manufacturer && <p role='alert' className="error-message">{errors.manufacturer.message}</p>}
            <label>Cost in Credits:</label>
            <input {...register("cost_in_credits")} />
                {errors.cost_in_credits && <p role='alert' className="error-message">{errors.cost_in_credits.message}</p>}
            <label>Length:</label>
            <input {...register("length")} />
                {errors.length && <p role='alert' className="error-message">{errors.length.message}</p>}
            <label>Max Atmosphering Speed:</label>
            <input {...register("max_atmosphering_speed")} />
                {errors.max_atmosphering_speed && <p role='alert' className="error-message">{errors.max_atmosphering_speed.message}</p>}
            <label>Crew:</label>
            <input {...register("crew")} />
                {errors.crew && <p role='alert' className="error-message">{errors.crew.message}</p>}
            <label>Passengers:</label>
            <input {...register("passengers")} />
                {errors.passengers && <p role='alert' className="error-message">{errors.passengers.message}</p>}
            <label>Cargo Capacity:</label>
            <input {...register("cargo_capacity")} />
                {errors.cargo_capacity && <p role='alert' className="error-message">{errors.cargo_capacity.message}</p>}
            <label>Consumables:</label>
            <input {...register("consumables")} />
                {errors.consumables && <p role='alert' className="error-message">{errors.consumables.message}</p>}
            <label>Hyperdrive Rating:</label>
            <input {...register("hyperdrive_rating")} />
                {errors.hyperdrive_rating && <p role='alert' className="error-message">{errors.hyperdrive_rating.message}</p>}
            <label>MGLT:</label>
            <input {...register("MGLT")} />
                {errors.MGLT && <p role='alert' className="error-message">{errors.MGLT.message}</p>}
            <label>Starship Class:</label>
            <input {...register("starship_class")} />
                {errors.starship_class && <p role='alert' className="error-message">{errors.starship_class.message}</p>}
            <button type="submit">Save</button>
        </form>
            )}
        </div>
    );
}
