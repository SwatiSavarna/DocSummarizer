// import { useState } from "react";

// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";

//  const Register = () => {
//   const [form, setForm] = useState({
//     fullname: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axiosInstance.post(API_PATHS.AUTH.REGISTER, form);
//     alert("Registered successfully");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-96">
//         <h2 className="text-2xl font-bold mb-4">Register</h2>

//         <input
//           className="w-full p-2 border mb-3"
//           placeholder="Full Name"
//           onChange={(e) => setForm({ ...form, fullname: e.target.value })}
//         />

//         <input
//           className="w-full p-2 border mb-3"
//           placeholder="Email"
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           type="password"
//           className="w-full p-2 border mb-3"
//           placeholder="Password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded">
//           Register
//         </button>
//       </form>

//       <div className='mt-6 pt-4 border-t border-gray-200 text-center'>
//     <p className='text-sm text-gray-600'>
//       Already have an account?{""}
//       <button
//       className='text-black font-medium hover:underline'
//       onClick={()=> navigate("/login")}
//       >
//         Sign in
//       </button>
//     </p>
//   </div>
//     </div>
//   );
// }
// export default Register;





import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(API_PATHS.AUTH.REGISTER, form);
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Start summarizing your documents today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="name@company.com"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all transform active:scale-[0.98] mt-2">
            Create Account
          </button>
        </form>

        {/* 🚀 DESIGNED "ALREADY HAVE AN ACCOUNT" SECTION */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors focus:outline-none"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;