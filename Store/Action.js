import {
  UPDATE_LOGIN,
  UPDATE_SHOP_DETAILS,
  UPDATE_ORDER_DETAILS,
  ORDER_CONDITION,
  DELETE_ORDER,
  CANCELLED_ORDERS,
  CANCELLED_ORDER_DETAILS,
  SET_PENDING_ORDER,
  ADD_MORE_ORDER,
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

export const NoOfOrdersCancelled = () => {
  return {
    type: CANCELLED_ORDERS,
  };
};

export const UpdateCancelOrder = cancelOrder => {
  return {
    type: CANCELLED_ORDER_DETAILS,
    data: cancelOrder,
  };
};

export const SetPendingOrder = orderId => {
  return {
    type: SET_PENDING_ORDER,
    data: orderId,
  };
};

export const AddMoreOrder = (product, variant, quantity) => {
  return {
    type: ADD_MORE_ORDER,
    data: {
      product,
      variant,
      quantity,
    },
  };
};
