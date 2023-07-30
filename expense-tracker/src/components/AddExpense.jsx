import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createExpense } from "../Redux/expense.action";

const AddExpense = ({ setOpen }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(createExpense(data));
    setOpen(false);
  };
  return (
    <>
      <div className="border-2 border-black h-[600px] p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-3">
            <div className="font-bold">Name</div>
            <input
              placeholder="Enter Name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className="bg-gray-300 w-[100%] p-1 focus:outline-none focus:border-none focus:ring-0 px-2"
            />
            {errors.name && (
              <p className="text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="py-3">
            <div className="font-bold">Description</div>
            <input
              placeholder="Enter description"
              type="text"
              {...register("description", {
                required: "Description is required",
              })}
              className="bg-gray-300 w-[100%] p-1 focus:outline-none focus:border-none focus:ring-0 px-2"
            />
            {errors.description && (
              <p className="text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div className="py-3">
            <div className="font-bold">Category</div>
            <select
              type="text"
              {...register("category", {
                required: "Category is required",
              })}
              className="bg-gray-300 w-[100%] p-1 focus:outline-none focus:border-none focus:ring-0 px-2"
            >
              {" "}
              <option value="">choose category</option>
              <option value="books">Books</option>
              <option value="health">Health</option>
              <option value="electronic">Electronics</option>
              <option value="travel">Travel</option>
              <option value="education">Education</option>
            </select>

            {errors.category && (
              <p className="text-red-400">{errors.category.message}</p>
            )}
          </div>
          <div className="py-3">
            <div className="font-bold">Date of Expense</div>
            <input
              placeholder="Enter Date"
              type="date"
              name="date"
              {...register("date", {
                required: "Date is required",
              })}
              className="bg-gray-300 w-[100%] p-1 focus:outline-none focus:border-none focus:ring-0 px-2"
            />
            {errors.date && (
              <p className="text-red-400">{errors.date.message}</p>
            )}
          </div>
          <div className="pb-10 pt-3">
            <div className="font-bold">Expense Amount</div>
            <input
              placeholder="Enter Expense Amount"
              type="text"
              {...register("amount", {
                required: "Amount is required",
              })}
              className="bg-gray-300 w-[100%] p-1 focus:outline-none focus:border-none focus:ring-0 px-2"
            />
            {errors.amount && (
              <p className="text-red-400">{errors.amount.message}</p>
            )}
          </div>
          <div className="flex justify-between">
            <button
              className="bg-slate-500 px-[60px] py-1  text-white rounded-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 px-8 py-1 text-white rounded-sm "
              type="submit"
            >
              Create Expense
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddExpense;
