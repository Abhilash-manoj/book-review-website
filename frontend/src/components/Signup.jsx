import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";



export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await registerUser(formData);
      setSuccess(res.data.message || "Registered successfully!");
      setTimeout(() => navigate("/signin"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{backgroundImage: 'linear-gradient(rgba(19, 16, 34, 0.85), rgba(19, 16, 34, 0.95)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjSwLfOG-h1cwL6c9WOxMLJif7i_nV_DslF9601QoZpHQ-d-hVviqmxBTI8y8au060wVQ3833oFoiJJYDIkfl9Bm359gb6SNcuuN_aygANj1Jw5JGwC3LJg4YNYaXy7Scq74oBJEcdfHkv72FlGshn3BC7snrQFMDOdsjC4TSuiwjQjRzhhUTcIzOYtYTfJhIoDPUWMy3BelOo-vkTYEyb6_T8fw6x4kWLnNKJQyD1TukF1lIJ9K1rmHEaAGFuh677sQUfiUc3aIk")'}}
    >
      <div className="w-full max-w-md bg-[#1e293b]/60 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/10">
        <h2 className="text-3xl font-bold text-center text-white mb-2">Create an Account</h2>
        <p className="text-center text-gray-400 mb-6">Join the BookVerse community</p>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="name">Full Name</label>
            <input
              id="name"
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="email">Email Address</label>
            <input
              id="email"
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-300 block mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              className="w-full p-3 bg-gray-700/50 border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="w-full p-3 bg-indigo-600 text-white rounded-md font-bold hover:bg-indigo-700 transition duration-300 disabled:bg-indigo-800 disabled:cursor-not-allowed"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        {success && <p className="text-green-400 text-center mt-4">{success} Redirecting...</p>}
        
        <div className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-400 hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

