import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getAffiliateDashboard = async () => {
  const res = await axios.get(`${API}/api/affiliate/dashboard`, {
    withCredentials: true,
  });
  return res.data;
};

export const requestWithdrawal = async () => {
  const res = await axios.post(
    `${API}/api/affiliate/withdraw`,
    {},
    { withCredentials: true }
  );
  return res.data;
};