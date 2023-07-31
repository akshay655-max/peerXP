import axios from "axios";
import {
  CREATEEXPENSE,
  DELETEEXPENSE,
  GETALLEXPENSE,
  UPDATEEXPENSE,
} from "./expense.action.constant";
import Swal from "sweetalert2";

//get all expenses
export const getAllExpense = async (dispatch) => {
  axios
    .get(" https://expense-data-5zpz.onrender.com/expense")
    .then(function (response) {
      // handle success
      dispatch({ type: GETALLEXPENSE, payload: response.data });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log("expense error", error);
    });
};

//create expense
export const createExpense = (data) => {
  return async (dispatch) => {
    axios
      .post("https://expense-data-5zpz.onrender.com/expense", data)
      .then(function (response) {
        // handle success
        if (response) {
          Swal.fire("Data added successfully");
          dispatch({
            type: CREATEEXPENSE,
            payload: response,
          });
          dispatch(getAllExpense);
        }
      })
      .catch(function (error) {
        // handle error
        if (error) {
          Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "red",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
        console.log("expense error", error);
      });
  };
};

//delete expense
export const deleteExpense = (id) => {
  return async (dispatch) => {
    axios
      .delete(`https://expense-data-5zpz.onrender.com/expense/${id}`)
      .then(function (response) {
        // handle success
        if (response) {
          Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "green",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
          dispatch({
            type: DELETEEXPENSE,
            payload: response,
          });
          dispatch(getAllExpense);
        }
      })
      .catch(function (error) {
        // handle error
        if (error) {
          Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "red",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
        console.log("expense error", error);
      });
  };
};

//update expense
export const updateExpense = (id, data) => {
  return async (dispatch) => {
    axios
      .patch(`https://expense-data-5zpz.onrender.com/expense/${id}`, data)
      .then(async function (response) {
        // handle success
        if (response) {
          dispatch(getAllExpense);
          await Swal.fire("updated data successfully");
          dispatch({
            type: UPDATEEXPENSE,
            payload: response,
          });
          window.location.reload();
        }
      })
      .catch(function (error) {
        // handle error
        if (error) {
          Swal.mixin({
            toast: true,
            position: "top-right",
            iconColor: "red",
            customClass: {
              popup: "colored-toast",
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
        console.log("expense error", error);
      });
  };
};
