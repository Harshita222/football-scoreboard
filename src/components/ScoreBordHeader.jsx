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
      backdrop-blur-xl
      bg-gradient-to-r
      from-slate-900/90 via-slate-800/90 to-slate-900/90
      border-b border-white/10
      shadow-lg shadow-black/30
    "
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* ================= LEFT : LOGO ================= */}
          <div className="flex items-center gap-3">
            <div
              className="
            bg-gradient-to-br from-cyan-400 to-indigo-600
            text-white p-3 rounded-full
            shadow-lg shadow-cyan-500/30
          "
            >
              <FaFutbol size={20} />
            </div>

            <h1 className="text-xl font-bold tracking-wide text-white">
              Arena Football Scoreboard
            </h1>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex items-center gap-6">
            {/* ===== ORGANIZER LINKS ===== */}
            {currentUser?.safeUser?.role === "organizer" && (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/organiser/dashboard"
                  className="
                px-4 py-2 rounded-full
                bg-white/10 backdrop-blur-lg
                border border-white/10
                text-sm font-semibold text-white
                hover:bg-white/20
                transition
              "
                >
                  Dashboard
                </Link>

                <Link
                  to="/organiser/create-match"
                  className="
                px-4 py-2 rounded-full
                bg-white/10 backdrop-blur-lg
                border border-white/10
                text-sm font-semibold text-white
                hover:bg-white/20
                transition
              "
                >
                  Create Match
                </Link>

                <Link
                  to="/organiser/create-team"
                  className="
                px-4 py-2 rounded-full
                bg-white/10 backdrop-blur-lg
                border border-white/10
                text-sm font-semibold text-white
                hover:bg-white/20
                transition
              "
                >
                  Create Team
                </Link>
              </div>
            )}

            {/* ===== USER PANEL ===== */}
            <div className="relative">
              {currentUser?.safeUser ? (
                <>
                  {/* ===== USER / ROLE BUTTON ===== */}
                  <button
                    onClick={() => setOpen(!open)}
                    className="
          flex items-center gap-2
          px-5 py-2
          rounded-full
          bg-gradient-to-r from-cyan-500/20 to-indigo-500/20
          backdrop-blur-xl
          border border-white/10
          text-white
          shadow-lg shadow-black/30
          hover:from-cyan-500/30 hover:to-indigo-500/30
          hover:scale-[1.04]
          transition-all duration-200
        "
                  >
                    <span className="text-sm font-semibold tracking-wide">
                      {currentUser.safeUser.role} Panel
                    </span>
                    <Users size={18} className="text-cyan-400" />
                  </button>

                  {/* ===== DROPDOWN ===== */}
                  {open && (
                    <div
                      className="
            absolute right-0 mt-3 w-40
            rounded-2xl
            bg-slate-900/95 backdrop-blur-xl
            border border-white/10
            shadow-xl shadow-black/40
            overflow-hidden
          "
                    >
                      <button
                        onClick={handleLogout}
                        className="
              flex items-center gap-2
              w-full px-4 py-3
              text-sm text-white
              hover:bg-white/10
              transition
            "
                      >
                        <LogOut size={14} className="text-rose-400" />
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* ===== LOGIN BUTTON ===== */
                <button
                  onClick={() => navigate("/auth")}
                  className="
        flex items-center gap-2
        px-5 py-2
        rounded-full
        bg-gradient-to-r from-indigo-500 to-cyan-500
        text-white
        shadow-lg shadow-black/30
        hover:scale-[1.05]
        transition-all duration-200
      "
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default ScoreboardHeader;
