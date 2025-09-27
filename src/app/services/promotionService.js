import axios from 'axios';

const API_URL = '/api/promotions';

export const getPromotions = async () => {
  const response = await axios.get(`${API_URL}/web`);
  return response.data;
};

export const getAdminPromotions = async (token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

export const createPromotion = async (promotionData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.post(`${API_URL}/new`, promotionData, config);
  return response.data.promotion;
};

export const updatePromotion = async (id, promotionData, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const response = await axios.put(`${API_URL}/${id}`, promotionData, config);
  return response.data.promotion;
};

export const deletePromotion = async (id, token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  await axios.delete(`${API_URL}/${id}`, config);
};
