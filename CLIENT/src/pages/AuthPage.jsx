import { Loginform } from '../components/Loginform';
import '../styles/authpage.css';

function AuthPage(props) {
  return (
    <div className="authpage">
      {props.role === 'user' && props.task === 'login' ? (
        <Loginform role="user" />
      ) : null}
    </div>
  );
}

export { AuthPage };
