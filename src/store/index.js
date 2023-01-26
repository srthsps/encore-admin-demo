import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import settingReducer from "./setting/reducers";

//Login
import userSlice from "./login/loginSlice";
import userProfileSlice from "./profile/userProfileSlice";

import dashboardDataSlice from "./dashboard/dashboardDataSlice";
import recentOrdersListSlice from "./dashboard/recentOrdersListSlice";

//Barcode
import barcodeListSlice from "./barcode/barcodeListSlice";
import barcodeAddSlice from "./barcode/barcodeAddSlice";
import recentBarcodeListSlice from "./barcode/recentBarcodeListSlice";


//Staff
import staffDeleteSlice from "./usermanagement/staff/staffDeleteSlice";
import staffListSlice from "./usermanagement/staff/staffListSlice";
import staffDetailsSlice from "./usermanagement/staff/staffDetailsSlice";
import staffEditSlice from "./usermanagement/staff/staffEditSlice";
import staffAddSlice from "./usermanagement/staff/staffAddSlice";
import orderListSlice from "./order/OrderListSlice";
import orderShippedSlice from "./order/OrderShippedSlice";
import orderProcessSlice from "./order/OrderProcessSlice";
import orderCancelledSlice from "./order/OrderCancelledSlice";
import orderDeleteSlice from "./order/OrderDeleteSlice";
import orderDetailsSlice from "./order/OrderDetailsSlice";
import orderDeliveredSlice from "./order/OrderDeliveredSlice";
import ProductListSlice from "./Product/ProductListSlice";
import productAddSlice from "./Product/ProductAddSlice";
import productDeleteSlice from "./Product/ProductDeleteSlice";
import BrandListSlice from "./Product/Brand/BrandListSlice";
import BrandDeleteSlice from "./Product/Brand/BrandDeleteSlice";
import brandAddSlice from "./Product/Brand/AddBrandSlice";
import CategoryListSlice from "./Product/Categories/CategoriesListSlice";
import CategoryAddSlice from "./Product/Categories/AddCategorySlice";
import categoryDeleteSlice from "./Product/Categories/CategoryDeleteSlice";
import CategoryEditSlice from "./Product/Categories/EditCategorySlice";


export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    setting: settingReducer,
    userSlice,

    // Products

    ProductListSlice,
    productAddSlice,
    productDeleteSlice,

    // order
    orderListSlice,
    orderDetailsSlice,
    orderShippedSlice,
    orderProcessSlice,
    orderDeliveredSlice,
    orderCancelledSlice,
    orderDeleteSlice,

    //Category

    CategoryListSlice,
    CategoryAddSlice,
    categoryDeleteSlice,
    CategoryEditSlice,

    // Brand
    BrandListSlice,
    brandAddSlice,
    BrandDeleteSlice,

    //Staff
    staffListSlice,
    staffAddSlice,
    staffDetailsSlice,
    staffDeleteSlice,
    staffEditSlice,

    //Barcode
    barcodeListSlice,
    barcodeAddSlice,
    recentBarcodeListSlice,

    dashboardDataSlice,
    recentOrdersListSlice,
    userProfileSlice,
  },
});
