import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import your Navbar component
import Footer from "../components/Footer";

// Schema for form validation
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string().required("Role is required"),
});

const RegisterPage = () => {
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
    // Simulate registration logic (replace with actual API call)
    console.log("Registration Data:", data);
    if (data.role === "backer") {
      navigate("/backer-dashboard"); // Redirect to backer dashboard
    } else if (data.role === "fundraiser") {
      navigate("/fundraiser-dashboard"); // Redirect to fundraiser dashboard
    } else {
      setError("Invalid role selected");
    }
  };

  return (
    <div>
      <Navbar userRole="guest" /> {/* Show guest navbar */}
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f6] mt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Register
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Role</label>
            <select
              {...register("role")}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a1a2e]"
            >
              <option value="">Select Role</option>
              <option value="backer">Branchker</option>
              <option value="fundraiser">Fundraiser</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#1a1a2e] text-white py-2 px-4 rounded-lg hover:bg-[#16213e] transition duration-300"
          >
            Register
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-[#1a1a2e] hover:underline">
                Login here
              </a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
