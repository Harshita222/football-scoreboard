import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"
import { Eye, EyeOff } from "lucide-react";
// import FootballDashboard from "./Dashboard";

export default function AuthUI() {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6"
      >
        <div className="flex flex-col items-center mb-6">
          {/* <FootballDashboard size={38} className="text-indigo-600" /> */}
          <h1 className="text-2xl font-bold mt-2">
            Velocity Football Scoreboard
          </h1>
          <p className="text-slate-500 text-sm">
            {isSignup ? "Create your player account" : "Welcome back!"}
          </p>
        </div>
        {isSignup ? (
          <SignupForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        ) : (
          <SigninForm
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        )}
        <div className="text-center mt-4 text-sm">
          {isSignup ? (
            <span>
              Already have an account?{" "}
              <button
                className="text-indigo-600 font-medium"
                onClick={() => setIsSignup(false)}
              >
                Sign in
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{" "}
              <button
                className="text-indigo-600 font-medium"
                onClick={() => setIsSignup(true)}
              >
                Sign up
              </button>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
function SignupForm({ showPassword, setShowPassword }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const  handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Signup Data:", formData);

    setFormData({
      fullName: "",
      email: "",
      password: "",
    });

    const res = await axios.post({formData})
    console.log(res)
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg border-slate-300"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg border-slate-300"
        />
      </div>
      <PasswordInput
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-xl mt-2 shadow hover:bg-indigo-700 transition"
      >
        Sign Up
      </button>
      <p className="text-xs text-slate-500 text-center mt-2">
        Role is <strong>Player</strong> by default.
      </p>
    </form>
  );
}
function SigninForm({ showPassword, setShowPassword }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full p-2 border rounded-lg border-slate-300"
        />
      </div>
      <PasswordInput
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-xl mt-2 shadow hover:bg-indigo-700 transition"
      >
        Sign In
      </button>
    </form>
  );
}
function PasswordInput({ showPassword, setShowPassword, value, onChange }) {
  return (
    <div className="relative">
      <label className="text-sm font-medium">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        name="password"
        value={value}
        onChange={onChange}
        className="mt-1 w-full p-2 pr-10 border rounded-lg border-slate-300"
      />
      <button
        type="button"
        className="absolute right-3 top-9 text-slate-500"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
