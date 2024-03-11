import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  customer: {},
  orderType: "inStore",
  paymentStatus: "pending",
  paymentMethod: "",
  totalPrice: "",
  pickupDate: "",
  pickupTime: "",
  pickupStartTime: "",
  pickupEndTime: "",
  deliveryDate: "",
  deliveryStartTime: "",
  deliveryEndTime: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // sets and updates order items of productType === "normal"
    setOrderItems: (state, action) => {
      const { product, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.product === product);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter((item) => item.product !== product);
        }
      } else {
        state.items.push(action.payload);
      }
    },
    // sets and updates order items of productType === "weight"
    setWeightOrderItems: (state, action) => {
      const { product, bags } = action.payload;
      const quantity = bags.reduce((a, c) => a + c, 0);
      const itemToUpdate = state.items.find((item) => item.product === product);
      console.log(itemToUpdate);
      if (itemToUpdate) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.product !== product);
        } else {
          itemToUpdate.quantity = itemToUpdate.quantity + quantity;
          itemToUpdate.bags = itemToUpdate.bags.concat(bags);
        }
      } else {
        state.items.push({ product, quantity, bags });
      }
    },
    addWeightToOrder(state, action) {
      const { id, weight } = action.payload;
      const item = state.items.find((item) => item.product === id);
      if (item) {
        if (!item.bags) {
          item.bags = [];
        }
        item.bags.push(weight);
        item.quantity = item.bags.reduce((acc, curr) => acc + curr, 0);
      } else {
        state.items.push({ product: id, quantity: weight, bags: [weight] });
      }
    },
    deleteWeightFromOrder(state, action) {
      const { productId, weightIndex } = action.payload;
      const item = state.items.find((item) => item.product === productId);
      if (item && weightIndex >= 0 && weightIndex < item.bags.length) {
        item.bags.splice(weightIndex, 1);
        item.quantity = item.bags.reduce((acc, curr) => acc + curr, 0);
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.product !== productId
          );
        }
      }
    },
    addOrderCustomer: (state, action) => {
      const { id, name, address } = action.payload;
      state.customer.id = id;
      state.customer.name = name;
      state.customer.address = address;
    },
    deleteOrderCustomer: (state) => {
      state.customer = initialState.customer;
    },
    addOrderType: (state, action) => {
      state.orderType = action.payload;
    },
    addOrderPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    addPickupDate: (state, action) => {
      state.pickupDate = action.payload;
    },
    addPickupTime: (state, action) => {
      state.pickupTime = action.payload;
    },
    addPickupStartTime: (state, action) => {
      state.pickupStartTime = action.payload;
    },
    addPickupEndTime: (state, action) => {
      state.pickupEndTime = action.payload;
    },
    addDeliveryDate: (state, action) => {
      state.deliveryDate = action.payload;
    },
    addDeliveryStartTime: (state, action) => {
      state.deliveryStartTime = action.payload;
    },
    addDeliveryEndTime: (state, action) => {
      state.deliveryEndTime = action.payload;
    },
    resetOrder: () => {
      return initialState;
    },
  },
});

export const {
  setOrderItems,
  setWeightOrderItems,
  addWeightToOrder,
  deleteWeightFromOrder,
  addOrderCustomer,
  deleteOrderCustomer,
  addOrderType,
  addOrderPaymentStatus,
  setPaymentMethod,
  setTotalPrice,
  addPickupDate,
  addPickupTime,
  addPickupStartTime,
  addPickupEndTime,
  addDeliveryDate,
  addDeliveryStartTime,
  addDeliveryEndTime,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
