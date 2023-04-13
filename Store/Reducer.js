import React from 'react';
import {
  UPDATE_LOGIN,
  UPDATE_ORDER_DETAILS,
  UPDATE_SHOP_DETAILS,
  ORDER_CONDITION,
  DELETE_ORDER,
} from './Types';

const InitialState = {
  LoginDetail: [], //user login details
  ShopDetails: [], //details about the shop
  OrderDetails: [], //order details for the shop
  OrderCondition: false,
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
    default:
      break;
  }
};
