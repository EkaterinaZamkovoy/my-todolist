import { Button, Container } from 'common/components';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { Path } from 'common/routing/Routing';
import { loginTC } from 'features/auth/model/authSlice';
import { selectIsLoggedIn } from 'features/auth/model/authSelectors';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const dispatch = useAppDispatch();

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const onSubmit: SubmitHandler<Inputs> = data => {
    dispatch(loginTC(data));
    reset();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main);
    }
  }, [isLoggedIn]);

  return (
    <Container className='container-login'>
      <Container className='container-login-wrapper'>
        <h2>Войти</h2>
        <p>or use common test account credentials:</p>
        <p>
          <b>Email:</b> free@samuraijs.com
        </p>
        <p>
          <b>Password:</b> free
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'
          name='unique-form-name'>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              placeholder='Введите email'
              autoComplete='off'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Incorrect email address',
                },
              })}
            />
          </div>
          {errors.email && (
            <span className='errorMessage'>{errors.email.message}</span>
          )}
          <div className='form-group'>
            <label htmlFor='password'>Пароль</label>
            <input
              type='password'
              id='password'
              placeholder='Введите пароль'
              autoComplete='off'
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^.{3,}$/,
                  message: 'Password must be at least 3 characters long',
                },
              })}
            />
          </div>
          {errors.password && (
            <span className='errorMessage'>{errors.password.message}</span>
          )}
          <div className='form-group'>
            <label htmlFor='username'>Запомнить</label>
            <input
              type='checkbox'
              id='rememberMe'
              //   {...register('rememberMe', {
              //     required: true,
              //   })}
            />
          </div>
          <Button onClick={() => {}} title='Войти' />
        </form>
      </Container>
    </Container>
  );
};
