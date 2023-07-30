import React, { useEffect, useState } from "react";
import { Checkbox, Divider, Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";
import { getAllExpense, deleteExpense } from "../Redux/expense.action";
import { useSelector } from "react-redux";
import Tables from "../table";
import SideDrawer from "../drawer";
import EditExpense from "./EditExpense";
import Swal from "sweetalert2";

const Expense = () => {
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(getAllExpense);
    if (allExpenseData) {
      setData(allExpenseData);
    }
  }, [dispatch, allExpenseData?.length]);

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              className="flex items-center pl-[20px]  text-[12px] uppercase"
              onClick={() => {
                if (viewData) {
                  setView(true);
                }
              }}
            >
              <div className=" font-normal hover:text-blue-400 " type="">
                <i className="ri-eye-line ri-lg mr-2 align-sub"></i>
                view
              </div>
            </div>
          ),
          key: "0",
        },
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
              <div className=" font-normal hover:text-blue-400">
                <i className="ri-pencil-line ri-lg mr-1.5 align-sub"></i>
                edit
              </div>
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
              <div className=" font-normal hover:text-blue-400">
                <i className="ri-delete-bin-line ri-lg mr-1.5 align-sub"></i>
                delete
              </div>
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
      {edit && (
        <SideDrawer
          placement="right"
          width={"65%"}
          headerStyle={{ padding: "0px" }}
          closeIcon={
            <div className="float-right hover:rotate-180 flex absolute z-40  bg-white w-8 h-8 text-base items-center justify-center text-gray-900 rounded-full  content-center top-[50%] left-[-42px]">
              <i
                class="ri-close-line ri-1x absolute z-40 left-50 bottom-450 "
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
          <EditExpense
          // assignData={assignData}
          // setEdit={setEdit}
          // setView={setView}
          // statusId={statusId}
          // editData={viewData}
          // edit={edit}
          // allTicketsData={allTicketsData}
          // setData={setData}
          // getDate={getDate}
          />
        </SideDrawer>
      )}
      <div>
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
    </>
  );
};

export default Expense;
