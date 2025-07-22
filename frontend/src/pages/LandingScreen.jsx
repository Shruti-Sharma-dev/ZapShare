import { Link } from 'react-router-dom';
import codeImage from '../assets/2910708.jpg';

export default function LandingScreen() {
  return (
    <div className="flex h-screen items-center justify-center px-4 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      <div className="flex flex-col lg:flex-row items-center justify-between bg-white p-6 sm:p-10 rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] max-h-[700px] overflow-hidden">

        {/* Text + Buttons Section */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center h-full justify-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-violet-600 leading-tight mb-4">
            Send Now.<br />See It Live.
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
            Get Started With <span className="text-fuchsia-500">ZapShare</span>
          </h2>

          {/* Buttons */}
          <div className="flex flex-col gap-4 w-full max-w-sm mt-10">
            <Link to="/login" className="w-full flex justify-center">
              <button className="w-[70%] rounded-lg bg-violet-500 hover:bg-violet-700 text-white py-2 text-base font-semibold transition duration-300 shadow-md">
                Login
              </button>
            </Link>
            <Link to="/register" className="w-full flex justify-center">
              <button className="w-[70%] rounded-lg bg-fuchsia-500 hover:bg-fuchsia-700 text-white py-2 text-base font-semibold transition duration-300 shadow-md">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center h-full">
          <img
            src={codeImage}
            alt="Realtime File Sharing Illustration"
            className="w-[280px] sm:w-[360px] md:w-[480px] lg:w-[500px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
