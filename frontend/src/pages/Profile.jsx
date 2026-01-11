// import { useContext } from "react";
// // import { UserContext } from "../context/UserContext";
// import DashboardLayout from "../../components/layouts/DashboardLayout";
// import { UserContext } from "../context/UserContext";
import DashboardLayout from "../components/layouts/DashboardLayout";


// const Profile = () => {
//   const { user } = useContext(UserContext);

//   if (!user) return null;

//   return (
//     // <DashboardLayout activeMenu="Profile">
//       <div className="bg-white p-6 rounded-lg shadow max-w-xl">
//         <h2 className="text-xl font-semibold mb-4">Profile</h2>

//         <div className="space-y-3">
//           <p><strong>Name:</strong> {user.fullName}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//         </div>
//       </div>
//     // </DashboardLayout>
//   );
// };

// export default Profile;




import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
 const { user, fetchUserProfile } = useContext(UserContext);

  useEffect(() => {
    // This explicitly uses the API_PATHS.USER.PROFILE route via the context function
    if (!user) {
      fetchUserProfile();
    }
  }, [user, fetchUserProfile]);

  if (!user) {
    return <div className="p-6 text-gray-500">Loading profile data...</div>;
  }

  return (
   <DashboardLayout activeMenu="Profile">
      <div className="min-h-[calc(100vh-180px)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 text-gray-900">Account Settings</h2>

        <div className="space-y-6">
          {/* Full Name Field Box */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500 ml-1">Full Name</label>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <span className="text-xl font-medium text-gray-800">
                {user.fullName}
              </span>
            </div>
          </div>

          {/* Email Address Field Box */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500 ml-1">Email Address</label>
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl">
              <span className="text-xl font-medium text-gray-800">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;