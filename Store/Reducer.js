import {
  UPDATE_LOGIN,
  UPDATE_ORDER_DETAILS,
  UPDATE_SHOP_DETAILS,
  ORDER_CONDITION,
  DELETE_ORDER,
  CANCELLED_ORDERS,
  CANCELLED_ORDER_DETAILS,
  SET_PENDING_ORDER,
  ADD_MORE_ORDER
} from './Types';

const InitialState = {
  LoginDetail: [], //user login details
  ShopDetails: [], //details about the shop
  OrderDetails: [], //order details for the shop
  OrderCondition: false,
  CancelledOrders: 0, //no of orders cancelled
  CancelledOrderDetails: [], // cancelled order details
  PendingOrder: [], // Pending order Details
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
    case SET_PENDING_ORDER:
      const updatedOrders = state.OrderDetails.map(order => {
        if (order.order_number === action.data) {
          return {...order, status: 'pending'};
        } else {
          return order;
        }
      });
      return {...state, PendingOrder: updatedOrders};
    case ADD_MORE_ORDER:
      return {
        ...state,
        OrderDetails: [
          ...state.OrderDetails,
          {
            selectedProduct: action.data.product,
            selectedVariant: action.data.variant,
            Quantity: action.data.quantity,
          },
        ],
      };
    default:
      break;
  }
};
