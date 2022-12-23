/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const Navigate = useNavigate();
  let onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        Navigate('/');
      }
    } catch (error) {
      toast.error('Bad User Data, please try again');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            value={email}
            id='email'
            onChange={onChange}
          />
          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              value={password}
              id='password'
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={(prevState) => !prevState}
            />

            <Link to='/ForgetPassword' className='forgotPasswordLink'>
              Forgot password?
            </Link>
            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#fffffff' width='34px' height='34px' />
              </button>
            </div>
          </div>
        </form>
        <Link to='/signUp' className='registerLink'>
          Sign Up instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
