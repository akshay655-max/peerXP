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

const Expense = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);
  const [viewData, setViewData] = useState(null);

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
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      sorter: (a, b) => a.action - b.action,
      ellipsis: {
        showTitle: false,
      },
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
            View <i className="ri-arrow-down-s-fill ri-lg ml-2 text-black"></i>
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
              <i
                class="ri-close-line ri-1x absolute z-40 left-50 bottom-450 "
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
      <div className="border-2 border-black p-4">
        <div className=" flex justify-between px-6 items-center font-bold py-6">
          <p>MY EXPENSE MANAGER</p>
          <div className="">
            <select className="p-1 ml-2">
              <option value="">filter by Date of Expense</option>
              {data &&
                data.map((item) => (
                  <option value={item.date}>{item.date}</option>
                ))}
            </select>
            <input
              type="text"
              placeholder="search expense by name"
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              className="border p-1 ml-2  border-black outline-black focus:outline-black focus:border-black focus:ring-0 "
            />
            <button
              className="bg-green-500 px-8 ml-2 py-1 text-white rounded-sm "
              onClick={() => setOpen(true)}
            >
              +New Expense
            </button>
          </div>
        </div>
        <div className="">
          <Tables
            columns={Ticketcolumns}
            data={data}
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
