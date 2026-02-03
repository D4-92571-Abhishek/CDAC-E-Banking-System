// import axios from "axios";

// const LogAPI = "http://localhost:5263/api/logs";

// export const sendLog=async (action,userId)=>{
//     try{
//         axios.post(LogAPI,{
//             Action: action,
//             UserId: userId,
//             IpAddress: window.location.hostname
//         });
//     }catch(error){
//         console.error("Logging failed:", error);
//     }};

// import axios from "axios";

// const LOG_API = "http://localhost:5263/api/logs";

// export const sendLog = async (action, userId) => {
//     try {
//         await axios.post(
//             LOG_API,
//             {
//                 userId: String(userId),
//                 action: action,
//                 ipAddress: window.location.hostname
//             },
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//         );
//     } catch (error) {
//         console.error("Logging failed:", error?.response?.data || error.message);
//     }
// };

import axios from "axios";

// Read from Vite env (Docker or Local)
const LOGGER_BASE = import.meta.env.VITE_LOGGER_BASE_URL;

export const sendLog = async (action, userId) => {
    try {
        await axios.post(
            `${LOGGER_BASE}/api/logs`,
            {
                userId: String(userId),
                action: action,
                ipAddress: window.location.hostname
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        console.error("Logging failed:", error?.response?.data || error.message);
    }
};

