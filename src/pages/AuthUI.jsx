import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function AuthUI() {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full max-w-md
          rounded-3xl
          bg-slate-900/70 backdrop-blur-xl
          border border-white/10
          shadow-2xl shadow-black/50
          p-8
        "
      >
        {/* ===== HEADER ===== */}
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-bold text-white tracking-wide">
            Velocity Football
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {isSignup ? "Create your player account" : "Welcome back"}
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

        {/* ===== SWITCH ===== */}
        <div className="text-center mt-4 text-sm text-slate-400">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                className="text-cyan-400 hover:text-cyan-300 font-medium transition"
                onClick={() => setIsSignup(false)}
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                className="text-cyan-400 hover:text-cyan-300 font-medium transition"
                onClick={() => setIsSignup(true)}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ===================== SIGN UP ===================== */

function SignupForm({ showPassword, setShowPassword }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/sign-up`,
        formData
      );

      dispatch(signInSuccess(res.data));
        navigate("/");
    } catch (err) {
      dispatch(signInFailure());
      console.log(err);
    } finally {
      setFormData({ fullName: "", email: "", password: "" });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <PasswordInput
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        value={formData.password}
        onChange={handleChange}
      />

      <PrimaryButton text="Sign Up" />

      <p className="text-xs text-slate-400 text-center">
        Role is <strong className="text-white">Player</strong> by default
      </p>
    </form>
  );
}

/* ===================== SIGN IN ===================== */

function SigninForm({ showPassword, setShowPassword }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/sign-in`,
        formData
      );
      dispatch(signInSuccess(res.data));
        navigate("/");
    } catch (err) {
      dispatch(signInFailure());
      console.log(err);
    }

    setFormData({ email: "", password: "" });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <PasswordInput
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        value={formData.password}
        onChange={handleChange}
      />

      <PrimaryButton text="Sign In" disabled={loading} />
    </form>
  );
}

/* ===================== REUSABLE COMPONENTS ===================== */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-slate-300 font-medium">{label}</label>
      <input
        {...props}
        className="
          mt-1 w-full px-4 py-2
          rounded-xl
          bg-slate-800/60
          border border-white/10
          text-white placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500/40
          transition
        "
      />
    </div>
  );
}

function PasswordInput({ showPassword, setShowPassword, value, onChange }) {
  return (
    <div className="relative">
      <label className="text-sm text-slate-300 font-medium">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className="
          mt-1 w-full px-4 py-2 pr-10
          rounded-xl
          bg-slate-800/60
          border border-white/10
          text-white placeholder-slate-400
          focus:outline-none focus:ring-2 focus:ring-cyan-500/40
        "
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-9 text-slate-400 hover:text-cyan-400 transition"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

function PrimaryButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="
        w-full mt-3 py-2 rounded-xl
        bg-gradient-to-r from-cyan-500 to-indigo-500
        text-white font-semibold
        shadow-lg shadow-cyan-500/20
        hover:scale-[1.03]
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
      "
    >
      {text}
    </button>
  );
}
