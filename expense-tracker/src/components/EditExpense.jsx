import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { getAllExpense, updateExpense } from "../Redux/expense.action";
import Swal from "sweetalert2";

const EditExpense = ({ setEdit, editData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(updateExpense(editData.id, data));
    setEdit(false);
  };
  const initialValues = {
    name: editData.name,
    description: editData.description,
    category: editData.category,
    date: editData.date,
    amount: editData.amount,
  };
  const [formData, setFormData] = useState(initialValues);
  return (
    <>
      <div className="border-2 border-black  p-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-3">
            <div className="font-bold">Name</div>
            <input
              placeholder="Enter Name"
              type="text"
              defaultValue={formData.name}
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
              defaultValue={formData.description}
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
              placeholder="Enter Category"
              type="text"
              defaultValue={formData.category}
              {...register("category", {
                required: "Category is required",
              })}
              className="bg-gray-300 w-[100%] p-1 focus:outline-none focus:border-none focus:ring-0 px-2"
            >
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
              type="text"
              defaultValue={formData.date}
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
              defaultValue={formData.amount}
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
          <div className="md:flex justify-between">
            <button
              className="bg-slate-500 md:px-[80px] px-[45px] md:py-2 py-3  text-white rounded-sm"
              onClick={() => setEdit(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 px-[45px] py-1 md:mt-0 mt-4 text-white rounded-sm md:text-[14px] text-[10px] "
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

export default EditExpense;
