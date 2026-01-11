// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";
// import DashboardLayout from "../components/layouts/DashboardLayout";

// const Summary = () => {
//   const [summaries, setSummaries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSummaries();
//   }, []);

//   const fetchSummaries = async () => {
//     try {
//       const res = await axiosInstance.get(
//         API_PATHS.DASHBOARD.GET_SUMMARIES
//       );

//       // ✅ HANDLE BOTH CASES SAFELY
//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.data || [];

//       setSummaries(data);
//     } catch (err) {
//       console.error("Failed to fetch summaries", err);
//       setSummaries([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <p className="p-8">Loading summaries...</p>;

//   return (
//     <DashboardLayout activeMenu="Summaries">
//       <h2 className="text-2xl font-bold mb-4">Summaries</h2>

//       {summaries.length === 0 && (
//         <p className="text-gray-500">No summaries available</p>
//       )}

//       {summaries.map((s) => (
//         <div
//           key={s.id}
//           className="bg-gray-100 p-4 mb-3 rounded shadow"
//         >
//           <p className="text-gray-800">{s.summaryText}</p>
//           <p className="text-sm text-gray-500">
//             Document ID: {s.documentId}
//           </p>
//         </div>
//       ))}
//  </DashboardLayout>
//   );
// };

// export default Summary;






// import React, { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";
// import DashboardLayout from "../components/layouts/DashboardLayout";

// const Summary = () => {
//   const [summaries, setSummaries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSummaries();
//   }, []);

//   const fetchSummaries = async () => {
//     try {
//       setLoading(true);
//       // Fetch all summaries from /api/summaries
//       const res = await axiosInstance.get(API_PATHS.DASHBOARD.GET_ALL_SUMMARIES);
      
//       setSummaries(res.data || []);
//     } catch (err) {
//       console.error("Failed to fetch summaries", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <DashboardLayout activeMenu="Summaries">
//       <div className="min-h-[calc(100vh-150px)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
//         <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Summaries</h2>

//         {loading ? (
//           <p className="text-gray-500">Loading summaries...</p>
//         ) : summaries.length === 0 ? (
//           <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
//             <p className="text-gray-500 text-lg">No summaries found. Upload a document to get started!</p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {summaries.map((s) => (
//               <div
//                 key={s.id}
//                 className="group border border-gray-200 p-6 rounded-2xl hover:border-blue-400 transition-all bg-white"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
//                     {s.language || 'English'}
//                   </span>
//                   <span className="text-xs text-gray-400">
//                     {new Date(s.generatedAt).toLocaleDateString()}
//                   </span>
//                 </div>
                
//                 <p className="text-gray-700 leading-relaxed text-lg mb-4">
//                   {s.summaryText}
//                 </p>

//                 <div className="pt-4 border-t border-gray-50 flex items-center text-sm text-gray-400">
//                    Document Ref ID: <span className="ml-2 font-mono text-gray-600">{s.docFile?.id || 'N/A'}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Summary;



// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { API_PATHS } from "../utils/apiPaths";
// import DashboardLayout from "../components/layouts/DashboardLayout";

// const Summary = () => {
//   const [summaries, setSummaries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSummaries = async () => {
//       try {
//         // This hits GET /api/summaries (the getAllSummaries method in your controller)
//         const res = await axiosInstance.get("/summaries");
//         setSummaries(res.data || []);
//       } catch (err) {
//         console.error("Failed to fetch summaries", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSummaries();
//   }, []);

//   return (
//     <DashboardLayout activeMenu="Summaries">
//       <div className="min-h-[calc(100vh-150px)] bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
//         <h2 className="text-2xl font-bold mb-8 text-gray-900">Your AI Summaries</h2>

//         {loading ? (
//           <div className="flex justify-center p-10"><div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div></div>
//         ) : summaries.length === 0 ? (
//           <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100">
//             <p className="text-gray-400 text-lg">No summaries yet. Upload a document to start.</p>
//           </div>
//         ) : (
//           <div className="grid gap-6">
//             {summaries.map((s) => (
//               <div key={s.id} className="p-6 rounded-2xl border border-gray-100 bg-gray-50/30 hover:shadow-md transition-shadow">
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
//                     {s.language}
//                   </span>
//                   <span className="text-sm text-gray-400">
//                     {new Date(s.generatedAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="bg-white border border-gray-100 p-5 rounded-xl shadow-sm">
//                    <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
//                     {s.summaryText}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Summary;






import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import DashboardLayout from "../components/layouts/DashboardLayout";
import { Toaster } from "react-hot-toast";
const Summary = () => {
  const [summaries, setSummaries] = useState([]); // Initialized as array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummaries();
  }, []);

const fetchSummaries = async () => {
  try {
    setLoading(true);
    const res = await axiosInstance.get("/summaries");

    console.log("Raw Response:", res.data);

    // Check if the response is directly an array
    if (Array.isArray(res.data)) {
      setSummaries(res.data);
    } 
    // Check if the summaries are nested inside a 'summaries' property
    else if (res.data && Array.isArray(res.data.summaries)) {
      setSummaries(res.data.summaries);
    }
    // If it's a single object (like your log shows), wrap it in an array so .map works
    else if (res.data && typeof res.data === 'object') {
      setSummaries([res.data]); 
    }
    else {
      setSummaries([]);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    setSummaries([]);
  } finally {
    setLoading(false);
  }
};
  return (
    <DashboardLayout activeMenu="Summaries">
      <div className="min-h-[calc(100vh-150px)] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Summaries</h2>

        {loading ? (
           <Toaster 
    toastOptions={{
      className:"",
      style:{
        fontSize:"13px",
        
      },
    }}
    />
        ) : summaries.length === 0 ? (
          <p className="text-gray-500">No summaries available</p>
        ) : (
          <div className="space-y-4">
            {summaries.map((s) => (
              <div key={s.id} className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-sm">
                <p className="text-gray-800 text-lg leading-relaxed mb-3">
                  {s.summaryText}
                </p>
                <div className="text-sm text-gray-400 flex gap-4">
                  <span>Language: {s.language}</span>
                  <span>ID: {s.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Summary;