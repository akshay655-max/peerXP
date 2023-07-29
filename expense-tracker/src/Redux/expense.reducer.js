import {
  CREATEEXPENSE,
  DELETEEXPENSE,
  GETALLEXPENSE,
  UPDATEEXPENSE,
} from "./expense.action.constant";

const initialState = {
  getAllExpense: [],
  createExpense: [],
  deleteExpense: [],
  updateExpense: [],
};

export default function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case GETALLEXPENSE: {
      return {
        ...state,
        getAllExpense: action.payload,
      };
    }
    case CREATEEXPENSE: {
      return {
        ...state,
        createExpense: action.payload,
      };
    }
    case DELETEEXPENSE: {
      return {
        ...state,
        deleteExpense: action.payload,
      };
    }
    case UPDATEEXPENSE: {
      return {
        ...state,
        updateExpense: action.payload,
      };
    }
    default:
      return state;
  }
}
