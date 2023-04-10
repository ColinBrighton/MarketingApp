import {UPDATE_LOGIN, UPDATE_SHOP_DETAILS, UPDATE_ORDER_DETAILS} from './Types';

export const UpdateLogin = loginDetails => {
  return {
    type: UPDATE_LOGIN,
    data: loginDetails,
  };
};

export const UpdateShopDetails = shopDetails => {
  return {
    type: UPDATE_SHOP_DETAILS,
    data: shopDetails,
  };
};

export const UpdateOrderDetails = orderDetails => {
  return {
    type: UPDATE_ORDER_DETAILS,
    data: orderDetails,
  };
};
