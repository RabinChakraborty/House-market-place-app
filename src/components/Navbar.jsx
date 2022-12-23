/* eslint-disable no-unused-vars */
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as OfferIcon } from '../assets/svg/localOfferIcon.svg';
import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg';
import { ReactComponent as PersonOutlineIcon } from '../assets/svg/personOutlineIcon.svg';

const Navbar = () => {
  const Navigate = useNavigate();
  const Location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === Location.pathname) {
      return true;
    }
  };

  return (
    <>
      <footer className='navbar'>
        <nav className='navbarNav'>
          <ul className='navbarListItems'>
            <li className='navbarListItem' onClick={() => Navigate('/')}>
              <ExploreIcon
                fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
                width='36px'
                height='36px'
              />
              <p
                className={
                  pathMatchRoute('/')
                    ? 'navbarListItemNameActive'
                    : 'navbarListItemName'
                }
              >
                Explore
              </p>
            </li>
            <li className='navbarListItem' onClick={() => Navigate('/Offers')}>
              <OfferIcon
                fill={pathMatchRoute('/Offers') ? '#2c2c2c' : '#8f8f8f'}
                width='36px'
                height='36px'
              />
              <p
                className={
                  pathMatchRoute('/Offers')
                    ? 'navbarListItemNameActive'
                    : 'navbarListItemName'
                }
              >
                Offers
              </p>
            </li>
            <li className='navbarListItem' onClick={() => Navigate('/Profile')}>
              <PersonOutlineIcon
                fill={pathMatchRoute('/Profile') ? '#2c2c2c' : '#8f8f8f'}
                width='36px'
                height='36px'
              />
              <p
                className={
                  pathMatchRoute('/Profile')
                    ? 'navbarListItemNameActive'
                    : 'navbarListItemName'
                }
              >
                Profile
              </p>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
};

export default Navbar;
