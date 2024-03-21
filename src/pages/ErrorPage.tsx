import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div>
      <p>Something went wrong... </p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default ErrorPage;
