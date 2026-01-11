export const BASE_URL="http://localhost:8080/api";

//utils/apiPath.js
export const API_PATHS={
    AUTH:{
        LOGIN:"/auth/login",
        REGISTER:"/auth/register",
    },
DASHBOARD:{
    UPLOAD:"/documents/upload",
GENERATE_SUMMARY: (docId) => `/summaries/generate/${docId}`,
    GET_ALL_SUMMARIES: "/summaries", 
    GET_SINGLE_SUMMARY: (id) => `/summaries/${id}/text`,
},
  USER: {
    PROFILE: "/user/profile",
  },

}