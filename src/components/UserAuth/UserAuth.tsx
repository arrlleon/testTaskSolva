import { useAppDispatch, useAppSelector } from '../../hook/hook'
import { login} from '../../features/userSlice'
import { useNavigate } from 'react-router-dom';
import { useEffect} from 'react'
import { useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  login: yup
    .string()
    .required("Введите логин")
    .max(20, "Логин должен содержать не более 20 символов")
    .matches(/^[A-Za-z]+$/i, "Логин может содержать только буквы латинского алфавита"),
  password: yup
    .string()
    .required("Введите пароль")
    .min(8, "Пароль должен содержать минимум 8 символов"),
}).required();
  type FormData = yup.InferType<typeof schema>;

export default function UserAuth() {



    const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuth } = useAppSelector(
    (state) => state.store,
  )
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isAuth) {
        navigate('/items-list');
    }
}, [isAuth, navigate]); 

  
  const onSubmit = (data: FormData) => {
    if(!Object.keys(errors).length){
      dispatch(login(data))
    }
  }

  return (
    <div className='container'>
      <h1>Authorization</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("login")} className='login' type='text' placeholder="Login" />
        {errors.login && <p role='alert' className="error-message">{errors.login.message}</p>}
        
        <input {...register("password")} type='password' className='password' placeholder="Password" />
        {errors.password && <p role='alert' className="error-message">{errors.password.message}</p>}
        
        <button type='submit'>Log in</button>
      </form>
    </div>
  );
}
