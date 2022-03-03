import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ListType {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0",
  }),

  endpoints(builder) {
    return {
      fetchList: builder.query<ListType[], void>({
        query() {
          return `/to-do-list`;
        },
      }),
    };
  },
});

export const { useFetchListQuery } = apiSlice;
