import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';

function Loginform(props) {
  const [email, setEmail] = useState('');
  const [isChecking, setChecking] = useState(false);
  const [message, setMessage] = useState('');

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!email) setMessage('Email is required');
    if (email) setChecking(true);
  };

  return (
    <form className="form-control form">
      <p className="h3 text-center text-light m-3">LOGIN</p>
      <hr className="text-light fw-bold" />
      <div className="form-floating">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
          disabled={isChecking}
          placeholder="Enter Email"
          required
        />
        <label htmlFor="email">Enter Email</label>
      </div>
      {!isChecking ? (
        <input
          type="submit"
          value={'Continue'}
          className="btn btn-primary w-100 mt-2 p-2"
          onClick={handleContinue}
        />
      ) : (
        <button
          class="btn btn-primary w-100 mt-2 p-2 d-flex align-items-center justify-content-center gap-2"
          disabled
        >
          <span class="spinner-border spinner-border-sm "></span>
          Continue..
        </button>
      )}
      <p className="text-light text-center mt-2">or</p>
      <button className="btn btn-light w-100 m-1 p-2">
        <Mail size={22} /> Sign in with Mail
      </button>
      <button className="btn btn-light w-100 m-1 p-2">
        <Github size={22} /> Sign in with GitHub
      </button>
      <br />
      <p className="text-warning text-center mt-2">{message}</p>
      <p className="text-center text-white mt-3">
        Do not have an account?{' '}
        <Link to="/user/signup" className="text-decoration-none">
          <b className="text-info">Signup</b>
        </Link>
      </p>
    </form>
  );
}

export { Loginform };
