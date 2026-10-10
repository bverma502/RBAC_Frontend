import api from "./api";
import { API_ENDPOINTS } from "../config/apiConfig";
import { MOCK_MENU } from "./mockData";

const isUseMockData = process.env.REACT_APP_USE_MOCK_DATA === "true";

const menuService = {
  getMenu: async () => {
    if (isUseMockData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ data: MOCK_MENU });
        }, 500);
      });
    }

    const response = await api.get(API_ENDPOINTS.MENU);
    return response;
  },
};

export default menuService;
