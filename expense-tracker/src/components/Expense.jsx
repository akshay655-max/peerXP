import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllExpense } from "../Redux/expense.action";
import { useSelector } from "react-redux";
import Tables from "../table";

const Expense = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const allExpenseData = useSelector(
    (state) => state.expenseReducer.getAllExpense
  );
  useEffect(() => {
    dispatch(getAllExpense);
    if (allExpenseData) {
      setData(allExpenseData);
    }
  }, [dispatch, allExpenseData?.length]);

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
    // {
    //   title: "ACTION",
    //   dataIndex: "action",
    //   key: "action",
    //   sorter: (a, b) => a.action - b.action,
    //   ellipsis: {
    //     showTitle: false,
    //   },
    //   render: (_, record) => (
    //     <Dropdown
    //       overlay={menu}
    //       trigger={"click"}
    //       placement={"bottomRight"}
    //       onClick={() => {
    //         setViewData(record);
    //       }}
    //     >
    //       <div className="w-32 cursor-pointer">
    //         View <i className="ri-arrow-down-s-fill ri-lg ml-2 text-black"></i>
    //       </div>
    //     </Dropdown>
    //   ),
    //   responsive: ["xs", "md"],
    // },
  ];

  const showTotal = (pages, range) => {
    return `No of records: ${range[0]}-${range[1]} of ${pages} `;
  };

  return (
    <>
      <div>
        <Tables
          columns={Ticketcolumns}
          data={allExpenseData}
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
