/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: name });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      Navigate('/');
    } catch (error) {
      toast.error('Bad User Registration, please try again');
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome, Please Sign Up!</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            className='nameInput'
            placeholder='Name'
            value={name}
            id='name'
            onChange={onChange}
          />
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
            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#fffffff' width='34px' height='34px' />
              </button>
            </div>
          </div>
        </form>
        <Link to='/signIn' className='registerLink'>
          Sign In instead
        </Link>
      </div>
    </>
  );
};

export default SignUp;
