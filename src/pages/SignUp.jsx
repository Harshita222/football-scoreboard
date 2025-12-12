// function SignupForm({ showPassword, setShowPassword }) {
//   return (
//     <form className="space-y-4">
//       <div>
//         <label className="text-sm font-medium">Full Name</label>
//         <input type="text" placeholder="John Doe" className="mt-1 w-full p-2 border rounded-lg border-slate-300" />
//       </div>
//       <div>
//         <label className="text-sm font-medium">Email</label>
//         <input type="email" placeholder="john@example.com" className="mt-1 w-full p-2 border rounded-lg border-slate-300" />
//       </div>
//       <PasswordInput showPassword={showPassword} setShowPassword={setShowPassword} />
//       <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-xl mt-2 shadow hover:bg-indigo-700 transition">Sign Up</button>
//       <p className="text-xs text-slate-500 text-center mt-2">Role is <strong>Player</strong> by default.</p>
//     </form>
//   );
// }
// function PasswordInput({ showPassword, setShowPassword }) {
//   return (
//     <div className="relative">
//       <label className="text-sm font-medium">Password</label>
//       <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="mt-1 w-full p-2 pr-10 border rounded-lg border-slate-300" />
//       <button type="button" className="absolute right-3 top-9 text-slate-500" onClick={() => setShowPassword(!showPassword)}>
//         {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//       </button>
//     </div>
//   );
// }