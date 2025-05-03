import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
toast;
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your register API here
    dispatch(register(form)).then((action) => {
      localStorage.setItem("token", action.payload.token);
    });
    toast.success("Registration successful!");
    // Reset form after submission
    setForm({ name: "", email: "", password: "", country: "" });
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#000957] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-[#344CB7]">
          Register
        </h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          required
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-4 p-3 border border-gray-300 rounded"
          required
        />

        <input
          type="text"
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
          className="w-full mb-6 p-3 border border-gray-300 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#FFEB00] text-[#000957] font-semibold py-2 rounded hover:bg-yellow-400 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
