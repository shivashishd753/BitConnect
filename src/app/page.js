// "use client";

// import { useState } from "react";

// const branches = [
//   "Chemical Engineering",
//   "Civil Engineering",
//   "Computer Science & Engineering",
//   "Electrical Engineering",
//   "Electronics & Communication Engineering",
//   "Information Technology",
//   "Mechanical Engineering",
//   "Metallurgical Engineering",
//   "Mining Engineering",
//   "Production Engineering",
// ];

// const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

// const inputClass =
//   "w-full rounded-xl border border-white/10 bg-[#111426] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20";

// const labelClass = "mb-2 block text-sm font-medium text-slate-300";

// export default function Home() {
//   const [mode, setMode] = useState("login");
//   const [step, setStep] = useState(1);
//   const [selectedYear, setSelectedYear] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [message, setMessage] = useState("");
//   const [demoEmail, setDemoEmail] = useState("");

//   const isSignup = mode === "signup";

//   function switchMode(nextMode) {
//     setMode(nextMode);
//     setStep(1);
//     setSelectedYear("");
//     setMessage("");
//     setShowPassword(false);
//     setShowConfirmPassword(false);
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     setMessage("");

//     const data = new FormData(e.currentTarget);

//     if (isSignup) {
//       if (step === 1) {
//         if (!selectedYear) return;
//         setStep(2);
//         return;
//       }

//       const password = String(data.get("password") || "");
//       const confirmPassword = String(data.get("confirmPassword") || "");

//       if (password.length < 8 || password !== confirmPassword) return;

//       // UI prototype only. No account is created yet.
//       setDemoEmail(String(data.get("email") || ""));
//       setMode("login");
//       setStep(1);
//       setSelectedYear("");
//       setShowPassword(false);
//       setShowConfirmPassword(false);
//       return;
//     }

//     // Login will be connected to Supabase later.
//   }

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#090914] text-white selection:bg-fuchsia-500/40">
//       {/* COLORFUL BACKGROUND */}
//       <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/20 blur-[140px]" />
//       <div className="pointer-events-none absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-cyan-500/15 blur-[140px]" />
//       <div className="pointer-events-none absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-600/10 blur-[120px]" />

//       <div className="relative mx-auto flex min-h-screen w-full max-w-[1400px] items-center px-4 py-5 sm:px-8 lg:px-12">
//         <div className="grid w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#10101d]/90 shadow-2xl shadow-black/40 lg:min-h-[740px] lg:grid-cols-[1.05fr_0.95fr]">
//           {/* LEFT: BRANDING */}
//           <section className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 p-6 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
//             <div className="pointer-events-none absolute -right-20 top-28 h-64 w-64 rounded-full border border-fuchsia-400/10" />
//             <div className="pointer-events-none absolute -right-8 top-40 h-40 w-40 rounded-full border border-cyan-300/10" />

//             <div className="relative">
//               <a href="#" className="inline-flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-violet-600 text-2xl shadow-lg shadow-fuchsia-600/25">
//                   ⚡
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-black tracking-tight">
//                     BIT<span className="text-fuchsia-400">Connect</span>
//                   </h1>
//                   <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-500">
//                     The campus is yours
//                   </p>
//                 </div>
//               </a>

//               <div className="my-10 sm:my-14 lg:my-20">
//                 <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-fuchsia-300">
//                   <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
//                   Made for BIT Sindri
//                 </div>

//                 <h2 className="max-w-xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
//                   College life.
//                   <br />
//                   <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">
//                     Levelled up.
//                   </span>
//                 </h2>

//                 <p className="mt-6 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
//                   Find your squad. Play your game. Show up for the moments
//                   that make college unforgettable.
//                 </p>
//               </div>
//             </div>

//             {/* COMMUNITY ACTIVITY CARDS */}
//             <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
//               <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-fuchsia-400/30 sm:p-5">
//                 <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-400/10 text-2xl">
//                   🏏
//                 </div>
//                 <h3 className="font-bold">Find your squad</h3>
//                 <p className="mt-1 text-xs leading-5 text-slate-500">
//                   Matches, sports and teammates.
//                 </p>
//               </div>

//               <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-400/30 sm:p-5">
//                 <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
//                   🎬
//                 </div>
//                 <h3 className="font-bold">Make plans</h3>
//                 <p className="mt-1 text-xs leading-5 text-slate-500">
//                   Movie nights and campus scenes.
//                 </p>
//               </div>

//               <div className="col-span-2 flex items-center gap-4 rounded-2xl border border-violet-400/15 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/5 p-4 sm:p-5">
//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-2xl">
//                   ✨
//                 </div>
//                 <div>
//                   <h3 className="font-bold">Your people. Your memories.</h3>
//                   <p className="mt-1 text-xs text-slate-400">
//                     One campus, a thousand ways to connect.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* RIGHT: AUTH FORM */}
//           <section className="flex items-center justify-center p-5 sm:p-10 lg:p-12">
//             <div className="w-full max-w-md">
//               <div className="mb-8">
//                 <p className="text-xs font-bold uppercase tracking-[0.25em] text-fuchsia-400">
//                   {isSignup ? "YOUR STORY STARTS HERE" : "GOOD TO SEE YOU"}
//                 </p>

//                 <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
//                   {isSignup
//                     ? step === 1
//                       ? "Join the crew."
//                       : "Let's get you in."
//                     : "Welcome back."}
//                 </h2>

//                 <p className="mt-3 text-sm text-slate-400">
//                   {isSignup
//                     ? step === 1
//                       ? "First things first — what year are you in?"
//                       : "Fill in your details to get started."
//                     : "Your campus people are waiting."}
//                 </p>
//               </div>

//               {/* TABS */}
//               <div className="mb-8 grid grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-black/30 p-1.5">
//                 <button
//                   type="button"
//                   onClick={() => switchMode("login")}
//                   className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
//                     !isSignup
//                       ? "bg-white text-[#11101c] shadow-lg"
//                       : "text-slate-400 hover:text-white"
//                   }`}
//                 >
//                   Log in
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => switchMode("signup")}
//                   className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
//                     isSignup
//                       ? "bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-lg shadow-fuchsia-600/20"
//                       : "text-slate-400 hover:text-white"
//                   }`}
//                 >
//                   Sign up
//                 </button>
//               </div>

//               {/* YEAR SELECTION */}
//               {isSignup && step === 1 && (
//                 <div className="space-y-3">
//                   {years.map((item, index) => (
//                     <button
//                       key={item}
//                       type="button"
//                       onClick={() => setSelectedYear(item)}
//                       className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition sm:p-5 ${
//                         selectedYear === item
//                           ? "border-fuchsia-400 bg-fuchsia-500/10"
//                           : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]"
//                       }`}
//                     >
//                       <div className="flex items-center gap-4">
//                         <div
//                           className={`flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black ${
//                             selectedYear === item
//                               ? "bg-fuchsia-500 text-white"
//                               : "bg-white/5 text-slate-400"
//                           }`}
//                         >
//                           0{index + 1}
//                         </div>
//                         <div>
//                           <p className="font-bold">{item}</p>
//                           <p className="mt-1 text-xs text-slate-500">
//                             {index === 0 ? "First year" : "Continuing year"}
//                           </p>
//                         </div>
//                       </div>

//                       <span className="text-lg text-fuchsia-300">
//                         {selectedYear === item ? "✓" : "↗"}
//                       </span>
//                     </button>
//                   ))}

//                   <button
//                     type="button"
//                     disabled={!selectedYear}
//                     onClick={() => {
//                       setStep(2);
//                       setMessage("");
//                     }}
//                     className="mt-3 w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-4 text-sm font-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
//                   >
//                     Continue <span className="ml-1">→</span>
//                   </button>
//                 </div>
//               )}

//               {/* FORMS */}
//               <form
//                 key={`${mode}-${step}`}
//                 onSubmit={handleSubmit}
//                 className={`space-y-5 ${
//                   isSignup && step === 1 ? "hidden" : ""
//                 }`}
//               >
//                 {isSignup && step === 2 && (
//                   <>
//                     <div className="flex items-center justify-between rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/[0.06] px-4 py-3">
//                       <span className="text-sm font-semibold text-fuchsia-200">
//                         {selectedYear}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => setStep(1)}
//                         className="text-xs font-bold text-slate-400 transition hover:text-white"
//                       >
//                         Change
//                       </button>
//                     </div>

//                     <div>
//                       <label className={labelClass} htmlFor="fullName">
//                         Full name
//                       </label>
//                       <input
//                         id="fullName"
//                         name="fullName"
//                         className={inputClass}
//                         placeholder="Your full name"
//                         autoComplete="name"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className={labelClass} htmlFor="branch">
//                         Branch
//                       </label>
//                       <select
//                         id="branch"
//                         name="branch"
//                         defaultValue=""
//                         className={inputClass}
//                         required
//                       >
//                         <option value="" disabled>
//                           Choose your branch
//                         </option>
//                         {branches.map((branch) => (
//                           <option
//                             key={branch}
//                             value={branch}
//                             className="bg-[#111426]"
//                           >
//                             {branch}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label
//                         className={labelClass}
//                         htmlFor={
//                           selectedYear === "1st Year"
//                             ? "rollNumber"
//                             : "registrationNumber"
//                         }
//                       >
//                         {selectedYear === "1st Year"
//                           ? "College roll number"
//                           : "College registration number"}
//                       </label>
//                       <input
//                         id={
//                           selectedYear === "1st Year"
//                             ? "rollNumber"
//                             : "registrationNumber"
//                         }
//                         name={
//                           selectedYear === "1st Year"
//                             ? "rollNumber"
//                             : "registrationNumber"
//                         }
//                         className={inputClass}
//                         placeholder={
//                           selectedYear === "1st Year"
//                             ? "Enter your roll number"
//                             : "Enter your registration number"
//                         }
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className={labelClass} htmlFor="challanReference">
//                         Challan number / reference
//                       </label>
//                       <input
//                         id="challanReference"
//                         name="challanReference"
//                         className={inputClass}
//                         placeholder="Enter challan reference"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className={labelClass} htmlFor="phone">
//                         Phone number
//                       </label>
//                       <input
//                         id="phone"
//                         name="phone"
//                         type="tel"
//                         inputMode="numeric"
//                         autoComplete="tel"
//                         pattern="[0-9]{10}"
//                         title="Enter a 10-digit phone number"
//                         className={inputClass}
//                         placeholder="10-digit phone number"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className={labelClass} htmlFor="signupEmail">
//                         Email address
//                       </label>
//                       <input
//                         id="signupEmail"
//                         name="email"
//                         type="email"
//                         autoComplete="email"
//                         className={inputClass}
//                         placeholder="you@example.com"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className={labelClass} htmlFor="signupPassword">
//                         Create password
//                       </label>
//                       <div className="relative">
//                         <input
//                           id="signupPassword"
//                           name="password"
//                           type={showPassword ? "text" : "password"}
//                           autoComplete="new-password"
//                           minLength={8}
//                           className={`${inputClass} pr-20`}
//                           placeholder="At least 8 characters"
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword((v) => !v)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-fuchsia-300"
//                         >
//                           {showPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label
//                         className={labelClass}
//                         htmlFor="confirmPassword"
//                       >
//                         Confirm password
//                       </label>
//                       <div className="relative">
//                         <input
//                           id="confirmPassword"
//                           name="confirmPassword"
//                           type={showConfirmPassword ? "text" : "password"}
//                           autoComplete="new-password"
//                           minLength={8}
//                           className={`${inputClass} pr-20`}
//                           placeholder="Repeat your password"
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword((v) => !v)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-fuchsia-300"
//                         >
//                           {showConfirmPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex gap-3 pt-1">
//                       <button
//                         type="button"
//                         onClick={() => setStep(1)}
//                         className="rounded-xl border border-white/10 px-5 py-3.5 text-sm font-bold text-slate-300 transition hover:bg-white/5"
//                       >
//                         Back
//                       </button>

//                       <button
//                         type="submit"
//                         className="flex-1 rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-3.5 text-sm font-black transition hover:brightness-110"
//                       >
//                         Create account →
//                       </button>
//                     </div>
//                   </>
//                 )}

//                 {!isSignup && (
//                   <>
//                     <div>
//                       <label className={labelClass} htmlFor="loginEmail">
//                         Email or roll number
//                       </label>
//                       <input
//                         id="loginEmail"
//                         name="email"
//                         type="text"
//                         defaultValue={demoEmail}
//                         autoComplete="username"
//                         className={inputClass}
//                         placeholder="Enter email or roll number"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className={labelClass} htmlFor="loginPassword">
//                         Password
//                       </label>
//                       <div className="relative">
//                         <input
//                           id="loginPassword"
//                           name="password"
//                           type={showPassword ? "text" : "password"}
//                           autoComplete="current-password"
//                           className={`${inputClass} pr-20`}
//                           placeholder="Enter your password"
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword((v) => !v)}
//                           className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-fuchsia-300"
//                         >
//                           {showPassword ? "Hide" : "Show"}
//                         </button>
//                       </div>
//                     </div>

//                     <div className="flex items-center justify-between gap-3 text-sm">
//                       <label className="flex items-center gap-2 text-slate-400">
//                         <input
//                           type="checkbox"
//                           name="rememberMe"
//                           className="accent-fuchsia-500"
//                         />
//                         Remember me
//                       </label>

//                       <button
//                         type="button"
//                         onClick={() => {}}
//                         className="text-fuchsia-300 transition hover:text-fuchsia-200"
//                       >
//                         Forgot password?
//                       </button>
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-4 text-sm font-black transition hover:brightness-110"
//                     >
//                       Let's go →
//                     </button>
//                   </>
//                 )}
//               </form>

//               <p className="mt-7 text-center text-sm text-slate-400">
//                 {isSignup ? "Already part of the crew?" : "New around here?"}{" "}
//                 <button
//                   type="button"
//                   onClick={() => switchMode(isSignup ? "login" : "signup")}
//                   className="font-bold text-fuchsia-300 transition hover:text-fuchsia-200"
//                 >
//                   {isSignup ? "Log in" : "Join BIT Connect"}
//                 </button>
//               </p>

//               <p className="mt-8 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-slate-600">
//                 BIT Sindri · Campus community
//               </p>
//             </div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BRANCHES = [
  "Chemical Engineering",
  "Civil Engineering",
  "Computer Science & Engineering",
  "Electrical Engineering",
  "Electronics & Communication Engineering",
  "Information Technology",
  "Mechanical Engineering",
  "Metallurgical Engineering",
  "Mining Engineering",
  "Production Engineering",
];

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

const INITIAL_SIGNUP = {
  fullName: "",
  branch: "",
  year: "",
  rollNumber: "",
  registrationNumber: "",
  challanNumber: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const INITIAL_LOGIN = {
  identifier: "",
  password: "",
  rememberMe: false,
};

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState("year");
  const [selectedYear, setSelectedYear] = useState("");
  const [signupForm, setSignupForm] = useState(INITIAL_SIGNUP);
  const [loginForm, setLoginForm] = useState(INITIAL_LOGIN);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  const touchStartX = useRef(null);
  const touchStartY = useRef(null);
  const mouseStartX = useRef(null);
  const isDragging = useRef(false);

  const isFirstYear = selectedYear === "1st Year";

  function switchMode(nextMode) {
    if (mode === nextMode) return;

    setMode(nextMode);
    setError("");
    setForgotPassword(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  function updateSignupField(event) {
    const { name, value } = event.target;

    setSignupForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  function updateLoginField(event) {
    const { name, value, type, checked } = event.target;

    setLoginForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  }

  function chooseYear(year) {
    setSelectedYear(year);

    setSignupForm((current) => ({
      ...current,
      year,
      rollNumber: "",
      registrationNumber: "",
    }));

    setError("");
  }

  function continueToSignup(event) {
    event.preventDefault();

    if (!selectedYear) {
      setError("Please select your academic year.");
      return;
    }

    setSignupForm((current) => ({
      ...current,
      year: selectedYear,
    }));

    setStep("form");
    setError("");
  }

 
async function handleSignup(event) {
  event.preventDefault();
  setError("");

  if (!signupForm.fullName.trim()) {
    setError("Please enter your full name.");
    return;
  }

  if (!signupForm.branch) {
    setError("Please select your branch.");
    return;
  }

  if (isFirstYear && !signupForm.rollNumber.trim()) {
    setError("Please enter your college roll number.");
    return;
  }

  if (!isFirstYear && !signupForm.registrationNumber.trim()) {
    setError("Please enter your college registration number.");
    return;
  }

  if (!signupForm.challanNumber.trim()) {
    setError("Please enter your challan number or reference.");
    return;
  }

  if (!signupForm.phone.trim()) {
    setError("Please enter your phone number.");
    return;
  }

  const email = signupForm.email.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Please enter a valid email address.");
    return;
  }

  if (signupForm.password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  if (signupForm.password !== signupForm.confirmPassword) {getUser
    setError("Passwords do not match.");
    return;
  }

  try {
    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password: signupForm.password,
      options: {
        data: {
          full_name: signupForm.fullName.trim(),
          branch: signupForm.branch,
          academic_year: Number(
            selectedYear.charAt(0)
          ),
          roll_number: isFirstYear
            ? signupForm.rollNumber.trim()
            : null,
          registration_number: isFirstYear
            ? null
            : signupForm.registrationNumber.trim(),
          challan_number: signupForm.challanNumber.trim(),
          phone: signupForm.phone.trim(),
        },
      },
    });

    if (signupError) throw signupError;

    setSignupForm(INITIAL_SIGNUP);
    setSelectedYear("");
    setStep("year");
    setMode("login");
    setLoginForm({
      ...INITIAL_LOGIN,
      identifier: email,
    });
    setError("Account created successfully! Please log in.");
   } catch (err) {
  console.error("Signup error:", err);

  const message = String(err?.message || "");
  const normalizedMessage = message.toLowerCase();

  if (message.includes("CHALLAN_REQUIRED")) {
    setError("Please enter your challan number.");
  } else if (message.includes("CHALLAN_INVALID_OR_USED")) {
    setError(
      "This challan number is invalid, already used, or revoked. Please check it and try again."
    );
  } else if (
    normalizedMessage.includes("database error saving new user")
  ) {
    setError(
      "Signup could not be completed. The challan verification database rejected the registration or encountered an error. Check your test challan and Supabase configuration, then try again."
    );
  } else {
    setError(
      message || "Could not create your account. Please try again."
    );
  }
}
}

 

async function handleLogin(event) {
  event.preventDefault();
  setError("");

  const identifier = loginForm.identifier.trim();

  if (!identifier || !loginForm.password) {
    setError("Please enter your email and password.");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)) {
    setError(
      "For now, please log in using your email address. Roll-number login is coming next."
    );
    return;
  }

  try {
    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email: identifier.toLowerCase(),
        password: loginForm.password,
      });

    if (loginError) {
      throw loginError;
    }

    router.push("/home");
  } catch (err) {
    setError(err.message || "Login failed. Please try again.");
  }
}
async function handleForgotPassword(event) {
  event.preventDefault();
  setError("");

  const email = loginForm.identifier.trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setError("Enter a valid email address first.");
    return;
  }

  try {
    const { error: resetError } =
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

    if (resetError) throw resetError;

    setError(
      "If the account is eligible, password recovery instructions will be sent to your email."
    );
  } catch (err) {
    console.error("Password recovery error:", err);
    setError(
      err.message || "Could not start password recovery. Please try again."
    );
  }
}

  function handleTouchStart(event) {
    const touch = event.touches[0];

    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  }

  function handleTouchEnd(event) {
    if (touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Ignore vertical scrolling and small movements.
    if (Math.abs(deltaX) < 65 || Math.abs(deltaX) < Math.abs(deltaY) * 1.3) {
      return;
    }

    // Swiping left opens signup; swiping right returns to login.
    if (deltaX < 0) {
      switchMode("signup");
    } else {
      switchMode("login");
    }
  }

  function handleMouseDown(event) {
    if (event.button !== 0) return;

    mouseStartX.current = event.clientX;
    isDragging.current = true;
  }

  function handleMouseUp(event) {
    if (!isDragging.current || mouseStartX.current === null) return;

    const deltaX = event.clientX - mouseStartX.current;

    mouseStartX.current = null;
    isDragging.current = false;

    if (Math.abs(deltaX) < 90) return;

    if (deltaX < 0) {
      switchMode("signup");
    } else {
      switchMode("login");
    }
  }

  function handleMouseLeave() {
    mouseStartX.current = null;
    isDragging.current = false;
  }

  function handleKeyDown(event) {
    const target = event.target;
    const isTyping =
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

    if (isTyping || event.altKey || event.ctrlKey || event.metaKey) return;

    if (event.key === "ArrowLeft") {
      switchMode("signup");
    } else if (event.key === "ArrowRight") {
      switchMode("login");
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-lg border border-[#3a3744] bg-[#18171d] px-3.5 py-3 text-sm text-[#f4f1fa] outline-none transition-colors placeholder:text-[#777380] focus:border-[#9a86df] focus:ring-2 focus:ring-[#8b75cf]/15";

  const labelClass = "block text-sm font-medium text-[#d9d5e2]";

  const primaryButton =
    "w-full rounded-lg bg-[#8370bd] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9380cf] focus:outline-none focus:ring-2 focus:ring-[#b7a7ef] focus:ring-offset-2 focus:ring-offset-[#201e25]";

  const secondaryButton =
    "text-sm font-medium text-[#bfb0ef] transition-colors hover:text-white";

  function renderPasswordField({
    label,
    name,
    value,
    visible,
    setVisible,
    autoComplete,
  }) {
    return (
      <div>
        <label htmlFor={name} className={labelClass}>
          {label}
        </label>

        <div className="relative mt-1.5">
          <input
            id={name}
            name={name}
            type={visible ? "text" : "password"}
            value={value}
            onChange={updateSignupField}
            autoComplete={autoComplete}
            className={`${inputClass} pr-16`}
            placeholder={label}
            required
          />

          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="absolute inset-y-0 right-3 text-xs font-medium text-[#b8b2c7] hover:text-white"
          >
            {visible ? "Hide" : "Show"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <main
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen overflow-x-hidden bg-[#111014] text-[#f4f1fa] selection:bg-[#8370bd]/40"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col lg:flex-row">
        {/* LEFT: LOGIN AND SIGNUP */}
        <section className="order-2 flex w-full flex-1 items-center justify-center px-5 pb-10 pt-4 sm:px-8 lg:order-1 lg:px-12 lg:py-12 xl:px-20">
          <div className="w-full max-w-[440px]">
            {/* Mobile branding */}
            <div className="mb-7 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#514666] bg-[#282332] font-bold tracking-tight text-[#d9ceff]">
                BC
              </div>

              <div>
                <h1 className="text-base font-semibold">BIT Connect</h1>
                <p className="mt-0.5 text-xs text-[#96919f]">
                  BIT Sindri student community
                </p>
              </div>
            </div>

            {/* Login/signup tabs */}
            <div className="mb-7 grid grid-cols-2 rounded-xl border border-[#34313c] bg-[#19181e] p-1">
              <button
                type="button"
                onClick={() => switchMode("login")}
                aria-pressed={mode === "login"}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  mode === "login"
                    ? "bg-[#302a3d] text-[#e6dcff] shadow-sm"
                    : "text-[#a6a1af] hover:text-white"
                }`}
              >
                Log in
              </button>

              <button
                type="button"
                onClick={() => switchMode("signup")}
                aria-pressed={mode === "signup"}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-[#302a3d] text-[#e6dcff] shadow-sm"
                    : "text-[#a6a1af] hover:text-white"
                }`}
              >
                Sign up
              </button>
            </div>

            {/* Sliding authentication content */}
            <div className="relative">
              <div
                key={`${mode}-${mode === "signup" ? step : forgotPassword ? "forgot" : "login"}`}
                className="animate-auth-enter"
              >
                {mode === "login" ? (
                  <>
                    <div className="mb-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ac99e5]">
                        Your campus account
                      </p>

                      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        {forgotPassword
                          ? "Reset password"
                          : "Welcome back"}
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-[#a29daa]">
                        {forgotPassword
                          ? "Enter your email address to continue."
                          : "Good to have you back. Log in to continue."}
                      </p>
                    </div>

                    {forgotPassword ? (
                      <form
                        onSubmit={handleForgotPassword}
                        className="space-y-5"
                      >
                        <div>
                          <label
                            htmlFor="recoveryIdentifier"
                            className={labelClass}
                          >
                            Email address
                          </label>

                          <input
                            id="recoveryIdentifier"
                            name="identifier"
                            type="email"
                            value={loginForm.identifier}
                            onChange={updateLoginField}
                            className={inputClass}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                          />
                        </div>

                        {error && (
                          <p
                            role="alert"
                            className="rounded-lg border border-[#63414a] bg-[#291d23] px-3 py-2.5 text-sm text-[#efb4bf]"
                          >
                            {error}
                          </p>
                        )}

                        <button type="submit" className={primaryButton}>
                          Continue
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setForgotPassword(false);
                            setError("");
                          }}
                          className="w-full py-2 text-sm text-[#b8b0c6] hover:text-white"
                        >
                          Back to login
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                          <label htmlFor="identifier" className={labelClass}>
                            Email or roll number
                          </label>

                          <input
                            id="identifier"
                            name="identifier"
                            type="text"
                            value={loginForm.identifier}
                            onChange={updateLoginField}
                            className={inputClass}
                            placeholder="Enter email or roll number"
                            autoComplete="username"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="loginPassword"
                            className={labelClass}
                          >
                            Password
                          </label>

                          <div className="relative mt-1.5">
                            <input
                              id="loginPassword"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              value={loginForm.password}
                              onChange={updateLoginField}
                              className={`${inputClass} pr-16`}
                              placeholder="Enter your password"
                              autoComplete="current-password"
                              required
                            />

                            <button
                              type="button"
                              onClick={() =>
                                setShowPassword((current) => !current)
                              }
                              className="absolute inset-y-0 right-3 text-xs font-medium text-[#b8b2c7] hover:text-white"
                            >
                              {showPassword ? "Hide" : "Show"}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                          <label className="flex cursor-pointer items-center gap-2 text-sm text-[#b1acb9]">
                            <input
                              type="checkbox"
                              name="rememberMe"
                              checked={loginForm.rememberMe}
                              onChange={updateLoginField}
                              className="h-4 w-4 rounded accent-[#9b88df]"
                            />
                            Remember me
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              setForgotPassword(true);
                              setError("");
                            }}
                            className={secondaryButton}
                          >
                            Forgot password?
                          </button>
                        </div>

                        {error && (
                          <p
                            role="alert"
                            className="rounded-lg border border-[#63414a] bg-[#291d23] px-3 py-2.5 text-sm text-[#efb4bf]"
                          >
                            {error}
                          </p>
                        )}

                        <button type="submit" className={primaryButton}>
                          Log in
                        </button>

                        <p className="pt-1 text-center text-sm text-[#a29daa]">
                          New to BIT Connect?{" "}
                          <button
                            type="button"
                            onClick={() => switchMode("signup")}
                            className={secondaryButton}
                          >
                            Create an account
                          </button>
                        </p>
                      </form>
                    )}
                  </>
                ) : step === "year" ? (
                  <form onSubmit={continueToSignup} className="space-y-6">
                    <div className="mb-6">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ac99e5]">
                        Get started
                      </p>

                      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                        Join BIT Connect
                      </h2>

                      <p className="mt-2 text-sm leading-relaxed text-[#a29daa]">
                        First, select your current academic year.
                      </p>
                    </div>

                    <fieldset>
                      <legend className={labelClass}>
                        Academic year
                      </legend>

                      <div className="mt-3 grid grid-cols-2 gap-3">
                        {YEARS.map((year) => {
                          const selected = selectedYear === year;

                          return (
                            <button
                              key={year}
                              type="button"
                              onClick={() => chooseYear(year)}
                              aria-pressed={selected}
                              className={`rounded-xl border px-4 py-4 text-left transition-all duration-200 ${
                                selected
                                  ? "border-[#9a86df] bg-[#2a2437] text-[#e8dfff]"
                                  : "border-[#3a3744] bg-[#1b1a20] text-[#c7c2d0] hover:border-[#655879] hover:bg-[#211f27]"
                              }`}
                            >
                              <span className="block text-base font-semibold">
                                {year}
                              </span>

                              <span className="mt-1 block text-xs text-[#96909f]">
                                {year === "1st Year"
                                  ? "Roll number"
                                  : "Registration number"}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {error && (
                      <p
                        role="alert"
                        className="text-sm text-[#efb4bf]"
                      >
                        {error}
                      </p>
                    )}

                    <button type="submit" className={primaryButton}>
                      Continue
                    </button>

                    <p className="text-center text-sm text-[#a29daa]">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => switchMode("login")}
                        className={secondaryButton}
                      >
                        Log in
                      </button>
                    </p>
                  </form>
                ) : (
                  <div>
                    <div className="mb-5">
                      <button
                        type="button"
                        onClick={() => {
                          setStep("year");
                          setError("");
                        }}
                        className="mb-4 text-sm text-[#b9abe5] hover:text-white"
                      >
                        ← Change academic year
                      </button>

                      <h2 className="text-2xl font-semibold tracking-tight">
                        Student details
                      </h2>

                      <p className="mt-1.5 text-sm text-[#a29daa]">
                        Complete your {selectedYear} signup.
                      </p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className={labelClass}>
                          Full name
                        </label>

                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          value={signupForm.fullName}
                          onChange={updateSignupField}
                          className={inputClass}
                          placeholder="Your full name"
                          autoComplete="name"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="branch" className={labelClass}>
                          Branch
                        </label>

                        <select
                          id="branch"
                          name="branch"
                          value={signupForm.branch}
                          onChange={updateSignupField}
                          className={inputClass}
                          required
                        >
                          <option value="">Select your branch</option>

                          {BRANCHES.map((branch) => (
                            <option key={branch} value={branch}>
                              {branch}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="academicYear" className={labelClass}>
                          Academic year
                        </label>

                        <input
                          id="academicYear"
                          name="year"
                          type="text"
                          value={selectedYear}
                          readOnly
                          className={`${inputClass} cursor-not-allowed text-[#aaa5b4]`}
                        />
                      </div>

                      {isFirstYear ? (
                        <div>
                          <label
                            htmlFor="rollNumber"
                            className={labelClass}
                          >
                            College roll number
                          </label>

                          <input
                            id="rollNumber"
                            name="rollNumber"
                            type="text"
                            value={signupForm.rollNumber}
                            onChange={updateSignupField}
                            className={inputClass}
                            placeholder="Enter your roll number"
                            required
                          />
                        </div>
                      ) : (
                        <div>
                          <label
                            htmlFor="registrationNumber"
                            className={labelClass}
                          >
                            College registration number
                          </label>

                          <input
                            id="registrationNumber"
                            name="registrationNumber"
                            type="text"
                            value={signupForm.registrationNumber}
                            onChange={updateSignupField}
                            className={inputClass}
                            placeholder="Enter your registration number"
                            required
                          />
                        </div>
                      )}

                      <div>
                        <label
                          htmlFor="challanNumber"
                          className={labelClass}
                        >
                          Challan number / reference
                        </label>

                        <input
                          id="challanNumber"
                          name="challanNumber"
                          type="text"
                          value={signupForm.challanNumber}
                          onChange={updateSignupField}
                          className={inputClass}
                          placeholder="Enter challan reference"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className={labelClass}>
                          Phone number
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={signupForm.phone}
                          onChange={updateSignupField}
                          className={inputClass}
                          placeholder="Enter phone number"
                          autoComplete="tel"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className={labelClass}>
                          Email address
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={signupForm.email}
                          onChange={updateSignupField}
                          className={inputClass}
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                        />
                      </div>

                      {renderPasswordField({
                        label: "Create password",
                        name: "password",
                        value: signupForm.password,
                        visible: showPassword,
                        setVisible: setShowPassword,
                        autoComplete: "new-password",
                      })}

                      {renderPasswordField({
                        label: "Confirm password",
                        name: "confirmPassword",
                        value: signupForm.confirmPassword,
                        visible: showConfirmPassword,
                        setVisible: setShowConfirmPassword,
                        autoComplete: "new-password",
                      })}

                      {error && (
                        <p
                          role="alert"
                          className="rounded-lg border border-[#63414a] bg-[#291d23] px-3 py-2.5 text-sm leading-relaxed text-[#efb4bf]"
                        >
                          {error}
                        </p>
                      )}

                      <button type="submit" className={primaryButton}>
                        Create account
                      </button>

                      <p className="text-center text-xs leading-relaxed text-[#888391]">
                        Already registered?{" "}
                        <button
                          type="button"
                          onClick={() => switchMode("login")}
                          className={secondaryButton}
                        >
                          Log in
                        </button>
                      </p>
                    </form>
                  </div>
                )}
              </div>
            </div>

            <p className="mt-8 text-center text-xs text-[#706b79]">
              BIT Connect · BIT Sindri
            </p>
          </div>
        </section>

        {/* RIGHT: BRANDING AND EXTRA DETAILS */}
        <aside className="order-1 flex w-full flex-col justify-center border-b border-[#34303e] bg-[#19171f] px-6 py-9 sm:px-10 lg:order-2 lg:min-h-screen lg:w-[46%] lg:border-b-0 lg:border-l lg:px-12 lg:py-16 xl:px-16">
          <div className="mx-auto w-full max-w-[480px]">
            {/* Desktop logo */}
            <div className="mb-12 hidden items-center gap-3 lg:flex">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#514666] bg-[#282332] text-base font-bold tracking-tight text-[#d9ceff]">
                BC
              </div>

              <div>
                <h1 className="text-lg font-semibold tracking-tight">
                  BIT Connect
                </h1>

                <p className="mt-1 text-xs text-[#9a94a5]">
                  BIT Sindri student community
                </p>
              </div>
            </div>

            <div className="max-w-md">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#b9a6f1]">
                Meet beyond the classroom
              </p>

              <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl xl:text-5xl">
                College feels better
                <span className="block text-[#b9a6ef]">
                  together.
                </span>
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-[#aaa5b4] sm:text-base">
                Find people to play with, discover campus activities, and
                make more of your time at BIT Sindri.
              </p>
            </div>

            {/* Feature details */}
            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-4 rounded-xl border border-[#36313f] bg-[#201e27] p-4 transition-colors hover:border-[#55476d]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#30283f] text-[#d0c1ff]">
                  <svg
                    viewBox="0 0 24 24"
                    width="21"
                    height="21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8 4.5 2.5 3.2-1 3.1-3.2 1.1M16 5l-1 3.5 2.8 2.2M9.5 16l2.5-1.7 3.7 1.2 1 3" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#eeeaf6]">
                    Play together
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#a19baa]">
                    Find teammates for cricket, football, badminton and more.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-[#36313f] bg-[#201e27] p-4 transition-colors hover:border-[#55476d]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#30283f] text-[#d0c1ff]">
                  <svg
                    viewBox="0 0 24 24"
                    width="21"
                    height="21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M16 3v4M8 3v4M3 10h18M8 14h3M8 17h6" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#eeeaf6]">
                    Find campus events
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#a19baa]">
                    Discover tournaments, movie plans and student meetups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-[#36313f] bg-[#201e27] p-4 transition-colors hover:border-[#55476d]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#30283f] text-[#d0c1ff]">
                  <svg
                    viewBox="0 0 24 24"
                    width="21"
                    height="21"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="10" cy="7" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#eeeaf6]">
                    Meet your people
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#a19baa]">
                    Connect with fellow students through shared interests.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#38333f] pt-5">
              <p className="text-xs text-[#898391]">
                Made for the BIT Sindri campus.
              </p>

              <div className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-5 rounded-full transition-colors ${
                    mode === "login" ? "bg-[#ad9ae8]" : "bg-[#514b5d]"
                  }`}
                />
                <span
                  className={`h-1.5 w-5 rounded-full transition-colors ${
                    mode === "signup" ? "bg-[#ad9ae8]" : "bg-[#514b5d]"
                  }`}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx global>{`
        @keyframes auth-enter {
          from {
            opacity: 0;
            transform: translateX(14px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-auth-enter {
          animation: auth-enter 260ms ease-out both;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-auth-enter {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}