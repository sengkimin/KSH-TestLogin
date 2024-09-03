import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const LoginPage = ({ setUserData }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const loginData = {
      identifier: email,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      
      // Log the result of the login attempt
      console.log("Login result:", result);

      if (response.ok) {
        // Fetch user data including role information
        const userResponse = await fetch(`http://localhost:1337/api/users/me?populate=role`, {
          headers: {
            Authorization: `Bearer ${result.jwt}`,
          },
        });

        const userData = await userResponse.json();
        console.log("User data:", userData);

        // Ensure userData contains role property
        if (!userData.role) {
          setError("User role information is missing.");
          return;
        }

        // Role data is now part of userData
        const roleName = userData.role.name;
        console.log("User role:", roleName);

        if (!userData.confirmed) {
          setError("Your account is not confirmed. Please check your email.");
        } else {
          localStorage.setItem("jwtToken", result.jwt);

          // Store user role and navigate accordingly
          setUserData({ jwt: result.jwt, role: roleName });

          if (roleName === "Authenticated") {
            navigate("/students");
          } else if (roleName === "Education Team") {
            navigate("/students");
          } else if (roleName === "Partners") {
            navigate("/dashboard");
          } else {
            setError("Unauthorized role.");
          }
        }
      } else {
        setError(result.error?.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        {/* Email input */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaUser className="mr-2 text-gray-400" />
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>

        {/* Password input */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border rounded px-3 py-2">
            <FaLock className="mr-2 text-gray-400" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 outline-none"
              required
            />
          </div>
        </div>
                {/* Submit button */}
                <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 text-white rounded ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error message */}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;


       
