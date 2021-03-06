import axios from "axios";
import { push } from "connected-react-router";
import { routes } from "../containers/Router";

export const baseUrl =
  "https://us-central1-missao-newton.cloudfunctions.net/FourFoodA";

const token = window.localStorage.getItem("token");
const requestHeader = {
  headers: {
    auth: token,
  },
};

export const userLogin = (email, password) => async (dispatch) => {
  const login = {
    email,
    password,
  };
  try {
    const response = await axios.post(`${baseUrl}/login`, login);

    window.localStorage.setItem("token", response.data.token);
    if (response.data.user.hasAddress === false) {
      window.alert(
        "Você não tem nenhum endereço cadastrado. Por favor, cadastre agora."
      );
      dispatch(push(routes.signupPageAddress));
    } else {
      dispatch(push(routes.restaurantFeed));
    }
  } catch (error) {
    window.alert("Usuário não encontrado");
  }
};

export const userSignup = (newUserData) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseUrl}/signup`, newUserData);
    window.localStorage.setItem("token", response.data.token);
    dispatch(push(routes.signupPageAddress));
  } catch (e) {
    window.alert("Erro no Signup");
  }
};

export const addAddress = (addressData) => async (dispatch) => {
  try {
    const response = await axios.put(
      `${baseUrl}/address`,
      addressData,
      requestHeader
    );
    window.localStorage.setItem("token", response.data.token);
    dispatch(push(routes.restaurantFeed));
  } catch (e) {
    window.alert("Endereço já cadastrado para esse usuário");
  }
};

export const getUsers = (users) => ({
  type: "GET_ALL_USERS",
  payload: {
    users,
  },
});

export const getProfile = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/profile`, requestHeader);
  dispatch(getUsers(response.data.user));
};

export const getOrderHistory = (orders) => ({
  type: "GET_ALL_ORDERS",
  payload: {
    orders,
  },
});

export const fetchOrdersHistory = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/orders/history`, requestHeader);
  dispatch(getOrderHistory(response.data.orders));
};

export const getFullAddress = (address) => ({
  type: "GET_ALL_ADDRESS",
  payload: {
    address,
  },
});

export const fetchFullAddress = () => async (dispatch) => {
  const response = await axios.get(`${baseUrl}/profile/address`, requestHeader);
  dispatch(getFullAddress(response.data.address));
};

export const updateProfile = (form) => async (dispatch) => {
  try {
    await axios.put(`${baseUrl}/profile`, form, requestHeader);
    dispatch(push(routes.userProfile));
  } catch (e) {
    window.alert(e.response.data.message);
  }
};
