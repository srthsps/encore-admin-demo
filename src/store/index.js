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

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    setting: settingReducer,
    userSlice,
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
