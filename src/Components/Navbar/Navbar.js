import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import './Navbar.scss';

export default function Navbar({ menuOpen, setMenuOpen }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    //sets session to current login user data
    setSession(supabase.auth.session());

    //calls event listener for any change in auth
    //if logout user sets session to null
    //if login user sets session to current user data see line 10
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className={'navbar ' + (menuOpen && 'active')}>
      {!session ? (
        <div className="navbar-content">
          <Link to="/stretches">Stretches</Link>
          <Link to="/signup">Create Account</Link>
          <Link to="/login">Login</Link>
        </div>
      ) : (
        <div className="navbar-content">
          <Link to="/stretches">Stretches</Link>
          <Link to="/routines">Routines</Link>
          <Link to="/account">My Account</Link>
        </div>
      )}
    </div>
  );
}
