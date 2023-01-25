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
import orderDetailsSlice from "./order/OrderDetailsSlice";
import ProductListSlice from "./Product/ProductListSlice";
import productAddSlice from "./Product/ProductAddSlice";
import BrandListSlice from "./Product/Brand/BrandListSlice";
import brandAddSlice from "./Product/Brand/AddBrandSlice";
import CategoryListSlice from "./Product/Categories/CategoriesListSlice";
import CategoryAddSlice from "./Product/Categories/AddCategorySlice";

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

    // order
    orderListSlice,
    orderDetailsSlice,

    //Category

    CategoryListSlice,
    CategoryAddSlice,

    // Brand
    BrandListSlice,
    brandAddSlice,

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
