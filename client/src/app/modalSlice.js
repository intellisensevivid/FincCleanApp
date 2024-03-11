import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isParentProductModal: false,
    isWeightProductModal: false,
    isAddCustomerModal: false,
    isPaymentMethodModal: false,
    isTimePickerPopUp: false,
    isPaymentInfoPopUp: false,
    childProducts: null,
    parentProductName: "",
    weightProductId: "",
  },
  reducers: {
    toggleParentProductModal: (state) => {
      state.isParentProductModal = !state.isParentProductModal;
    },
    closeParentProductModal: (state) => {
      state.isParentProductModal = false;
    },
    setChildProducts: (state, action) => {
      state.childProducts = action.payload;
    },
    setParentProductName: (state, action) => {
      state.parentProductName = action.payload;
    },
    toggleWeightProductModal: (state) => {
      state.isWeightProductModal = !state.isWeightProductModal;
    },
    toggleAddCustomerModal: (state) => {
      state.isAddCustomerModal = !state.isAddCustomerModal;
    },
    togglePaymentMethodModal: (state) => {
      state.isPaymentMethodModal = !state.isPaymentMethodModal;
    },
    toggleTimePickerPopUp: (state) => {
      state.isTimePickerPopUp = !state.isTimePickerPopUp;
    },
    togglePaymentInfoPopUp: (state) => {
      state.isPaymentInfoPopUp = !state.isPaymentInfoPopUp;
    },
    setWeightProductId: (state, action) => {
      state.weightProductId = action.payload;
    },
  },
});

export const {
  toggleParentProductModal,
  closeParentProductModal,
  setChildProducts,
  setParentProductName,
  toggleWeightProductModal,
  toggleTimePickerPopUp,
  togglePaymentInfoPopUp,
  setWeightProductId,
  toggleAddCustomerModal,
  togglePaymentMethodModal,
} = modalSlice.actions;

export default modalSlice.reducer;
