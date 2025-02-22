import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import your Navbar component
import Footer from "../components/Footer";

// Schema for form validation
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Simulate login logic (replace with actual API call)
    if (
      data.email === "backer@example.com" &&
      data.password === "Password123!"
    ) {
      navigate("/backer-dashboard"); // Redirect to backer dashboard
    } else if (
      data.email === "fundraiser@example.com" &&
      data.password === "Password123!"
    ) {
      navigate("/fundraiser-dashboard"); // Redirect to fundraiser dashboard
    } else if (
      data.email === "admin@example.com" &&
      data.password === "Password123!"
    ) {
      navigate("/admin-dashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <Navbar userRole="guest" /> {/* Show guest navbar */}
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e] "
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a1a2e] text-white py-2 px-4 rounded-lg hover:bg-[#16213e] transition duration-300"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-[#1a1a2e] hover:underline">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
