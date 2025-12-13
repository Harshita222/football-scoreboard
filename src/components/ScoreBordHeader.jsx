import axios from "axios";
import { LogOut, Users } from "lucide-react";
import React, { useState } from "react";
import { FaFutbol } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
function ScoreboardHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/sign-out`, {
        withCredentials: true,
      });
      dispatch(signOutSuccess());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="sticky top-0 z-50">
      <div
        className="
          backdrop-blur-lg bg-white/20
          border-b border-white/30
          shadow-md
        "
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 text-white p-3 rounded-full shadow">
              <FaFutbol size={20} />
            </div>
            <h1 className="text-xl font-bold text-gray-900">
              Arena Football Scoreboard
            </h1>
          </div>
          {/* RIGHT: STATUS */}
          <div className="flex items-center gap-4">
            {currentUser?.safeUser?.role == "organizer" && (
              <>
                <span className="text-sm font-medium text-gray-800">
                  <Link to={"/organiser/create-match"}>Create Match</Link>
                </span>
                <span className="text-sm font-medium text-gray-800">
                  <Link to={"/organiser/create-team"}>Create Team</Link>
                </span>
              </>
            )}
            <span className="px-4 py-1 rounded-full text-sm font-semibold bg-red-500 text-white animate-pulse">
              LIVE
            </span>
            <span className="text-sm font-medium text-gray-800">
              {currentUser?.safeUser?.role} Panel
            </span>
            <div className="flex items-center gap-4 relative">
              <button
                onClick={() => setOpen(!open)}
                className="bg-white p-2 rounded-full shadow-sm cursor-pointer"
              >
                <Users size={18} />
              </button>
              {open && currentUser?.safeUser && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-xl w-32">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  >
                    <LogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default ScoreboardHeader;