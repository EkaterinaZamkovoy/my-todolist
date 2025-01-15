import { Button, Container } from 'common/components';

export const Login = () => {
  return (
    <Container className='container-login'>
      <Container className='container-login-wrapper'>
        <h2>Войти</h2>
        <div className='form-group'>
          <label htmlFor='username'>Имя пользователя</label>
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Введите имя пользователя'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Введите email'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Пароль</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Введите пароль'
            required
          />
        </div>
        <Button onClick={() => {}} title='Войти' />
      </Container>
    </Container>
  );
};
