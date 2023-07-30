import { combineReducers } from "redux";
//**all components reducers imports */
import expenseReducer from "../Redux/expense.reducer";

const appReducer = combineReducers({
  expenseReducer,
});

export default appReducer;
