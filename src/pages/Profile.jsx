/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { async } from '@firebase/util';

const Profile = () => {
  const auth = getAuth();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    Navigate('/');
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error('Could not update profile details');
    }
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'> My Profile</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='personalDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
          <div className="profileCard">

            
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
          </div>
      </main>
    </div>
  );
};

export default Profile;
