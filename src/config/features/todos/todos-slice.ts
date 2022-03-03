import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListType {
  id: number;
  title: string;
  description: string;
  status: number;
  createdAt: string;
}

interface TodosState {
  list: ListType[];
}

const initialState: TodosState = {
  list: [],
};

const todosSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // incremented(state) {
    //   // it's okay to do this because immer makes it immutable
    //   // under the hood
    //   // state.value++;
    // },
    // amountAdded(state, action: PayloadAction<number>) {
    //   // state.value += action.payload;
    // },
    // decrement
    // reset
    setList(state, action: PayloadAction<ListType[]>) {
      state.list = action.payload;
    },

    addList(state, action: PayloadAction<ListType>) {
      state.list.push(action.payload);
    },

    editList(state, action: PayloadAction<ListType>) {
      for (var i in state.list) {
        if (state.list[i].id === action.payload.id) {
          state.list[i].title = action.payload.title;
          state.list[i].description = action.payload.description;
          break;
        }
      }
    },

    deleteList(state, action: PayloadAction<number>) {
      for (var i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          state.list.splice(i, 1);
        }
      }
    },

    checkList(state, action: PayloadAction<{ status: number; id: number }>) {
      for (var i in state.list) {
        if (state.list[i].id === action.payload.id) {
          state.list[i].status = action.payload.status;
          break;
        }
      }
    },
  },
});

export const { setList, addList, deleteList, editList, checkList } =
  todosSlice.actions;
export default todosSlice.reducer;
