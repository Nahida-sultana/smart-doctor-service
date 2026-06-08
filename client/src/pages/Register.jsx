import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 px-4 py-10">

      <div className="w-full max-w-lg backdrop-blur-md bg-white/60 border border-white/60 rounded-3xl shadow-2xl p-8">

        <div className="flex flex-col items-center mb-6">

          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-3">
            <UserPlus className="text-white w-8 h-8" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900">
            Create Account
          </h2>

        </div>

        <form className="space-y-4">

          <input placeholder="Full Name" className="w-full p-4 rounded-xl border border-gray-200" />

          <input placeholder="Age" className="w-full p-4 rounded-xl border border-gray-200" />

          <input placeholder="Height (cm)" className="w-full p-4 rounded-xl border border-gray-200" />

          <input placeholder="Weight (kg)" className="w-full p-4 rounded-xl border border-gray-200" />

          <input placeholder="Occupation" className="w-full p-4 rounded-xl border border-gray-200" />

          <select className="w-full p-4 rounded-xl border border-gray-200">
            <option>Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <input placeholder="Phone Number" className="w-full p-4 rounded-xl border border-gray-200" />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl border border-gray-200"
          />

          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-cyan-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;