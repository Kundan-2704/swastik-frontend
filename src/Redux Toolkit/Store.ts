

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

/* ================= CUSTOMER ================= */
import authReducer from "./Features/Auth/AuthSlice";
import userReducer from "./Features/Customer/UserSlice";
import productsReducer from "./Features/Customer/ProductSlice";
import orderReducer from "./Features/Customer/OrderSlice";
import cartReducer from "./Features/Customer/CartSlice";
import couponReducer from "./Features/Customer/CouponSlice";
import homeCategoryReducer from "./Features/Customer/HomeCategorySlice";
import addressReducer from "./Features/Customer/AddressSlice";
import customerDealReducer from "./Features/Customer/CustomerDealSlice";

/* ================= SELLER ================= */
import sellerReducer from "./Features/Seller/SellerAuthenticationSlice";
import sellerOrdersReducer from "./Features/Seller/SellerOrderSlice";
import sellerProductReducer from "./Features/Seller/SellerProductSlice";
import sellerManagementReducer from "./Features/Seller/SellerSlice";
import sellerTransactionReducer from "./Features/Seller/transactionSlice";
import sellerPaymentReducer from "./Features/Seller/paymentSlice";
import sellerPayoutReducer from "./Features/Seller/SellerPayoutSlice";

/* ================= ADMIN ================= */
import adminHomeCategoryReducer from "./Features/Admin/AdminSlice";
import adminDealReducer from "./Features/Admin/DealSlice";
import adminCouponReducer from "./Features/Admin/CouponSlice";
import adminCustomerReducer from "./Features/Admin/AdminCustomerSlice";
import adminOrderReducer from "./Features/Admin/AdminOrderSlice";
import categoryReducer from "./Features/Admin/CategorySlice";
import adminPayoutReducer from "./Features/Admin/AdminPayoutSlice";
import adminPaymentsReducer from "./Features/Admin/PaymentsSlice";


//Notification
import notificationReducer from "./Features/Notification/notificationSlice";


/* ================= ROOT REDUCER ================= */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  products: productsReducer,
  orders: orderReducer,
  cart: cartReducer,
  coupon: couponReducer,
  homeCategory: homeCategoryReducer,
  address: addressReducer,
  customerDeal: customerDealReducer,

  // Seller
  seller: sellerReducer,
  sellerOrders: sellerOrdersReducer,
  sellerProduct: sellerProductReducer,
  sellerManagement: sellerManagementReducer,
  sellerTransaction: sellerTransactionReducer,
  sellerPayments: sellerPaymentReducer,
  sellerPayout: sellerPayoutReducer,

  // Admin
  adminHomeCategory: adminHomeCategoryReducer,
  adminDeal: adminDealReducer,
  adminCoupon: adminCouponReducer,
  adminCustomers: adminCustomerReducer,
  adminOrders: adminOrderReducer,
  category: categoryReducer,
   adminPayout: adminPayoutReducer,
   adminPayments: adminPaymentsReducer,


  //Notification
   notification: notificationReducer,
});



/* ================= STORE ================= */
export const store = configureStore({
  reducer: rootReducer,
});

/* ================= TYPES (MOST IMPORTANT) ================= */

// ✅ BEST PRACTICE (use store.getState, not rootReducer)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* ================= TYPED HOOKS ================= */

// ✅ Use these everywhere instead of useDispatch/useSelector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
