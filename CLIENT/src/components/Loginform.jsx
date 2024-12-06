import { useState } from 'react';
import { Link } from 'react-router-dom';

function Loginform(props) {
  const [email, setEmail] = useState('');
  const [isChecking, setChecking] = useState(false);

  const handleContinue = async (e) => {
    e.preventDefault();
    setChecking(true);
  };

  return (
    <form className="form-control form">
      <p className="h3 text-center text-success m-3"> 
        {props.role.toUpperCase()} LOGIN
      </p>
      <div className="form-floating">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          className="form-control"
          disabled={isChecking}
          placeholder='Enter Email'
        />
        <label htmlFor="email">Enter Email</label>
      </div>
      {!isChecking ? (
        <button
          className="btn btn-primary w-100 mt-2 p-2"
          onClick={handleContinue}
        >
          Continue
        </button>
      ) : (
        <button
          class="btn btn-primary w-100 mt-2 p-2 d-flex align-items-center justify-content-center gap-2"
          disabled
        >
          <span class="spinner-border spinner-border-sm "></span>
          Continue..
        </button>
      )}
      <p className="text-center text-white mt-3">
        Do not have an account?{' '}
        <Link to="/user/signup" className='text-decoration-none'>
          <b>Signup</b>
        </Link>
      </p>
    </form>
  );
}

export { Loginform };
