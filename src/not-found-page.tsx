import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='h-screen flex flex-col justify-center items-center gap-5'>
      <h1 className='text-3xl'>404</h1>
      <p>Page not found. The page you are looking for does not exist.</p>
      <Link to='/' className='text-blue-500 underline'>
        Go back to the homepage
      </Link>
    </div>
  );
}
