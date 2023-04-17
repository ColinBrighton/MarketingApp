import React from 'react';
import {
  UPDATE_LOGIN,
  UPDATE_ORDER_DETAILS,
  UPDATE_SHOP_DETAILS,
  ORDER_CONDITION,
  DELETE_ORDER,
  CANCELLED_ORDERS,
  CANCELLED_ORDER_DETAILS,
} from './Types';

const InitialState = {
  LoginDetail: [], //user login details
  ShopDetails: [], //details about the shop
  OrderDetails: [], //order details for the shop
  OrderCondition: false,
  CancelledOrders: 0, //no of orders cancelled
  CancelledOrderDetails: [],// cancelled order details
};

export const Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN:
      return {
        ...state,
        LoginDetail: action.data,
      };
    case UPDATE_SHOP_DETAILS:
      return {
        ...state,
        ShopDetails: action.data,
      };
    case UPDATE_ORDER_DETAILS:
      return {
        ...state,
        OrderDetails: [...state.OrderDetails, action.data],
      };
    case ORDER_CONDITION:
      return {
        ...state,
        OrderCondition: action.check,
      };
    case DELETE_ORDER:
      return {
        ...state,
        OrderDetails: state.OrderDetails.filter(
          val => val.order_number !== action.data,
        ),
      };
    case CANCELLED_ORDERS:
      return {
        ...state,
        CancelledOrders: state.CancelledOrders + 1,
      };
    case CANCELLED_ORDER_DETAILS:
      return {
        ...state,
        CancelledOrderDetails: [...state.CancelledOrderDetails, action.data],
      };
    default:
      break;
  }
};
