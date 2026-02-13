import { Link, useNavigate } from 'react-router-dom';
const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 fixed top-0 left-0 right-0 bottom-0">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-800 relative">
            404
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse">
              404
            </span>
          </h1>
        </div>

        {/* Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg">
            It seems like you've ventured into uncharted territory. The page
            you're looking for might have been moved or doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() =>
              window.history.length > 1 ? navigate(-1) : navigate('/')
            }
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
          >
            Go Back
          </button>
          <Link
            to={'/'}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
          >
            Home Page
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
