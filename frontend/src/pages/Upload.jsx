// import { useState } from "react";

// import { API_PATHS } from "../utils/apiPaths";
// import axiosInstance from "../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import DashboardLayout from "../components/layouts/DashboardLayout";

//  const Upload = () => {
//    const [file, setFile] = useState(null);
//    const [loading, setLoading] = useState(false);
//    const navigate = useNavigate();

//    const handleUpload = async () => {
//      if (!file) return alert("Please select a file");

//      const formData = new FormData();
//      formData.append("file", file);

//      try {
//        setLoading(true);

//        // 1️⃣ Upload document
//        const uploadRes = await axiosInstance.post(
//          API_PATHS.DASHBOARD.UPLOAD,
//          formData,
//          { headers: { "Content-Type": "multipart/form-data" } }
//        );

//        const documentId = uploadRes.data.id;

//        // 2️⃣ Generate summary
//        await handleGenerateSummary(documentId);

//      } catch (err) {
//        console.error("Upload failed", err);
//      } finally {
//        setLoading(false);
//      }
//    };

//    // ✅ PLACE THIS FUNCTION HERE
//    const handleGenerateSummary = async (documentId) => {
//      try {
//        await axiosInstance.post(
//          API_PATHS.DASHBOARD.GENERATE_SUMMARY(documentId)
//        );

//        alert("Summary generated successfully");

//        // 3️⃣ Go to summary page
//        navigate("/summary");

//      } catch (err) {
//        console.error("Summary generation failed", err);
//      }
//    };

//   return (
//      <DashboardLayout activeMenu="Documents">
//           <h2 className="text-xl font-bold mb-4">Upload Document</h2>

//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             className="mb-4"
//           />

//           <button
//             onClick={handleUpload}
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {loading ? "Processing..." : "Upload & Generate Summary"}
//           </button>
//         </DashboardLayout>

//   );
// }

// export default Upload;



import { useState } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/layouts/DashboardLayout";
import toast from "react-hot-toast";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); 
  const navigate = useNavigate();

 const handleUpload = async () => {
  if (!file) return toast.error("Please select a file");
  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true);
    setStatus("Uploading document...");

    const uploadRes = await axiosInstance.post(
      API_PATHS.DASHBOARD.UPLOAD,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    // If you used the Step 1 Fix, uploadRes.data will be exactly {id: X, filename: "..."}
    const documentId = uploadRes.data.id; 

    if (!documentId) {
      throw new Error("Failed to retrieve Document ID from server response");
    }

    setStatus("Generating AI Summary...");
    
    await axiosInstance.post(API_PATHS.DASHBOARD.GENERATE_SUMMARY(documentId));

    toast.success("Summary generated successfully!");
    navigate("/summary");

  } catch (err) {
    console.error("Process failed", err);
    toast.error(err.message || "An error occurred");
  } finally {
    setLoading(false);
    setStatus("");
  }
};
  return (
    <DashboardLayout activeMenu="Documents">
      <div className="min-h-[calc(100vh-150px)] bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload & Summarize</h2>
        
        <div className="h-100 border-2 border-dashed border-gray-200 rounded-xl p-8 mb-7 text-center bg-gray-50">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-6"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? status : "Upload & Process"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Upload;