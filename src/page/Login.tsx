import { useEffect, useRef, useState } from "react";
export interface IUser {
  id: number;
  fullname: string;
  email: string;
  password: string;
}
const DUMMY_USERS: IUser[] = [
  {
    id: 1,
    fullname: "Demo User",
    email: "user@example.com",
    password: "password123", // In a real app, this would be hashed
  },
];

const LoginPage = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // --- Mock Authentication ---
    const user = DUMMY_USERS.find((u) => u.email === email);

    if (user && user.password === password) {
      setCurrentUser(user);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans text-white p-4">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleLogin}
          className="bg-gray-800 shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">
              Sign in to continue to Movie Showcase
            </p>
          </div>
          {error && (
            <p className="bg-red-500/20 text-red-400 text-center p-3 rounded-lg mb-4">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={emailRef}
              className="bg-gray-700 text-white shadow appearance-none border-2 border-gray-700 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition"
              id="email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-gray-700 text-white shadow appearance-none border-2 border-gray-700 rounded-lg w-full py-3 px-4 leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition"
              id="password"
              type="password"
              placeholder="password123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 Movie Showcase. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
