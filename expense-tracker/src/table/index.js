import { Table } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

const Tables = ({
  loading,
  columns,
  data,
  onChange,
  pagination,
  scroll,
  size,
  isBordered,
  Title,
  show,
}) => {
  /**
   * @description rowSelection object indicates the need for row selection
   */
  const [selected, setSelected] = useState([]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelected(selectedRows.map((row) => row.key));
    },
    getCheckboxProps: (record) => {
      if (selected.length > 2) {
        return {
          disabled: !selected.includes(record.key), // Column configuration not to be checked
        };
      }
    },
  };
  return (
    <Table
      rowSelection={{
        type: "checkbox",
        preserveSelectedRowKeys: true,
        ...rowSelection,
      }}
      loading={loading}
      columns={columns}
      onColumns={show}
      dataSource={data}
      onChange={onChange}
      pagination={pagination}
      rowKey={"id"}
      scroll={scroll}
      size={size}
      bordered={isBordered}
      title={Title && <Title />}
    />
  );
};

export default Tables;

Tables.propTypes = {
  loading: PropTypes.bool,
  columns: PropTypes.array,
  data: PropTypes.array,
  onChange: PropTypes.func,
  pagination: PropTypes.object,
  scroll: PropTypes.object,
  size: PropTypes.string,
  isBordered: PropTypes.bool,
  Title: PropTypes.element,
};

Tables.defaultProps = {
  loading: false,
  columns: [],
  data: [],
  onChange: null,
  pagination: {
    pageSize: 5,
    showSizeChanger: true,
    hideOnSinglePage: true,
    position: "bottomLeft",
  },
  scroll: {
    y: 320,
  },
  size: "large",
  isBordered: false,
  Title: null,
};
