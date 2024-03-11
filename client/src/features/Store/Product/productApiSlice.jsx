import { apiSlice } from "../../../app/apiSlice";
import { setSelectedSection } from "../storeSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductSections: builder.query({
      query: () => "products/sections",
    }),
    createProductSection: builder.mutation({
      query: (sectionData) => ({
        url: "products/sections",
        method: "POST",
        body: sectionData,
      }),
    }),
    updateProductSection: builder.mutation({
      query: ({ sectionId, sectionData }) => ({
        url: `products/sections/${sectionId}`,
        method: "PUT",
        body: sectionData,
      }),
    }),
    deleteProductSection: builder.mutation({
      query: (sectionId) => ({
        url: `products/sections/${sectionId}`,
        method: "DELETE",
      }),
    }),

    // Products Endpoints
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ productId, productData }) => ({
        url: `/products/${productId}`,
        method: "PUT",
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),

    // Endpoint to get all products and sections
    getStoreProducts: builder.query({
      query: () => "/products/store",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSelectedSection(data.sections[0]._id));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const {
  useGetAllProductSectionsQuery,
  useCreateProductSectionMutation,
  useUpdateProductSectionMutation,
  useDeleteProductSectionMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetStoreProductsQuery,
} = productApiSlice;
