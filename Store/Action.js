import {
  UPDATE_LOGIN,
  UPDATE_SHOP_DETAILS,
  UPDATE_ORDER_DETAILS,
  ORDER_CONDITION,
  DELETE_ORDER,
} from './Types';

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
  console.log(orderDetails,'Action')
  return {
    type: UPDATE_ORDER_DETAILS,
    data: orderDetails,
  };
};

export const DeleteOrderDetails = deleteOrder => {
  return {
    type: DELETE_ORDER,
    data: deleteOrder,
  };
};

export const OrderCheck = order => {
  return {
    type: ORDER_CONDITION,
    check: order,
  };
};
