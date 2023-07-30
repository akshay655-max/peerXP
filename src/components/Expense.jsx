import React, { useEffect, useState } from "react";
import { Checkbox, Divider, Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";
import { getAllExpense, deleteExpense } from "../Redux/expense.action";
import { useSelector } from "react-redux";
import Tables from "../table";
import SideDrawer from "../drawer";
import EditExpense from "./EditExpense";
import Swal from "sweetalert2";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import { GrFormClose } from "react-icons/gr";
import AddExpense from "./AddExpense";
import { IoMdMore } from "react-icons/io";

const Expense = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const allExpenseData = useSelector(
    (state) => state.expenseReducer.getAllExpense
  );
  //get all data when its loaded the page for the first time
  useEffect(() => {
    dispatch(getAllExpense);
    if (allExpenseData) {
      setData(allExpenseData);
    }
  }, [dispatch, allExpenseData?.length]);

  //search expense by name
  useEffect(() => {
    if (query) {
      const searchData = data?.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(searchData);
    }
    if (query === "") {
      setData(allExpenseData);
    }
  }, [query]);

  //filter by date of expense
  useEffect(() => {
    console.log(category);
    if (category) {
      const searchData = data?.filter((item) => item.date.includes(category));
      setFilteredData(searchData);
    }
  }, [category]);

  //to calculate updated_at in hours and mins
  const getTimeDifference = (updatedAt) => {
    const currentDateTime = new Date();
    const updatedDateTime = new Date(updatedAt);

    const timeDifference = currentDateTime - updatedDateTime;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    return `${hoursDifference} hours and ${minutesDifference} minutes ago`;
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              className="flex items-center  pl-[20px]  text-[12px] uppercase"
              onClick={() => {
                if (viewData) {
                  setEdit(true);
                }
              }}
            >
              <MdEdit className="text-green-700" />
              <span className="ml-2">edit</span>
            </div>
          ),
          key: "2",
        },
        {
          label: (
            <div
              className="flex items-center  pl-[20px] text-[12px] uppercase"
              onClick={() => {
                if (viewData) {
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteExpense(viewData.id));
                      dispatch(getAllExpense);
                      Swal.fire(
                        "Deleted!",
                        "Your data has been deleted.",
                        "success"
                      );
                    }
                  });
                }
              }}
            >
              <AiFillDelete className="text-red-700" />
              <span className="ml-2">delete</span>
            </div>
          ),
          key: "3",
        },
      ]}
    />
  );

  const Ticketcolumns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: {
        showTitle: false,
      },
      responsive: ["xs", "md"],
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      ellipsis: {
        showTitle: false,
      },
      responsive: ["xs", "md"],
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => new Date(a.amount) - new Date(b.amount),
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <>
          <div>{`INR ${record.amount}`}</div>
        </>
      ),
      responsive: ["xs", "md"],
    },

    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      responsiveArray: ["xs", "md"],
      onFilter: (value, record) => record.lastActive.includes(value),
      sorter: (a, b) => a.category.localeCompare(b.category),
      ellipsis: {
        showTitle: false,
      },
      render: (_, record) => (
        <>
          <div>{record.category}</div>
        </>
      ),
    },
    {
      title: "UPDATED_AT",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (_, record) => (
        <>
          <div>{getTimeDifference(record.updated_at)}</div>
        </>
      ),
      responsive: ["xs", "md"],
    },

    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          overlay={menu}
          trigger={"click"}
          placement={"bottomRight"}
          onClick={() => {
            setViewData(record);
          }}
        >
          <div className="w-32 cursor-pointer">
            <IoMdMore className="text-[20px]" />
          </div>
        </Dropdown>
      ),
      responsive: ["xs", "md"],
    },
  ];

  const showTotal = (pages, range) => {
    return `No of records: ${range[0]}-${range[1]} of ${pages} `;
  };

  return (
    <>
      {open && (
        <SideDrawer
          placement="right"
          width={"65%"}
          headerStyle={{ padding: "0px" }}
          closeIcon={
            <div className="float-right hover:rotate-180 flex absolute z-40  bg-white w-8 h-8 text-base items-center justify-center text-gray-900 rounded-full  content-center top-[50%] left-[-42px]">
              <GrFormClose
                className="text-red-900"
                onClick={() => {
                  setOpen(false);
                }}
              />
            </div>
          }
          onClose={() => setOpen(false)}
          closable={true}
          visible={open}
          bodyStyle={{
            backgroundColor: "",
            padding: "25px",
            paddingRight: "10px",
          }}
        >
          <AddExpense setOpen={setOpen} />
        </SideDrawer>
      )}
      {edit && (
        <SideDrawer
          placement="right"
          width={"65%"}
          headerStyle={{ padding: "0px" }}
          closeIcon={
            <div className="float-right hover:rotate-180 flex absolute z-40  bg-white w-8 h-8 text-base items-center justify-center text-gray-900 rounded-full  content-center top-[50%] left-[-42px]">
              <GrFormClose
                className="text-red-900"
                onClick={() => {
                  setView(false);
                  setEdit(false);
                }}
              />
            </div>
          }
          onClose={() => setEdit(false)}
          closable={true}
          visible={edit}
          bodyStyle={{ backgroundColor: "", padding: "30px" }}
        >
          <EditExpense setEdit={setEdit} editData={viewData} />
        </SideDrawer>
      )}
      <div className=" p-4 bg-blue-100 h-screen">
        <div className=" md:flex justify-between px-6 items-center font-bold py-6">
          <p className="">MY EXPENSE MANAGER</p>
          <div className="md:mt-0 mt-5">
            <select
              className="p-1  md:ml-2 border-black border outline-black focus:outline-black focus:border-black"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">filter by Date of Expense</option>
              {allExpenseData &&
                allExpenseData.map((item) => (
                  <option value={item.date}>{item.date}</option>
                ))}
            </select>
            <input
              type="text"
              placeholder="search expense by name"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="border p-1 md:ml-2 md:mt-0 mt-4  border-black outline-black focus:outline-black focus:border-black focus:ring-0 "
            />
            <button
              className="bg-green-500 md:px-8 px-12 md:ml-2 py-1 md:mt-0 mt-4  text-white rounded-sm "
              onClick={() => setOpen(true)}
            >
              +New Expense
            </button>
          </div>
        </div>
        <div className="mb-6">
          <Tables
            columns={Ticketcolumns}
            data={category ? filteredData : data}
            scroll={{
              x: 700,
            }}
            pagination={{
              current: page,
              pageSize: pageSize,
              showTotal: showTotal,
              hideOnSinglePage: true,
              pageSizeOptions: [5, 10, 15, 20],
              onChange: (page, pageSize) => {
                setPage(page);
                setPageSize(pageSize);
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Expense;
