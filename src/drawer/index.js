import { Drawer } from "antd";
import PropTypes from "prop-types";

const SideDrawer = ({
  title,
  width,
  onClose,
  visible,
  placement,
  closeIcon,
  closable,
  bodyStyle,
  headerStyle,
  children,
}) => {
  return (
    <Drawer
      title={title}
      width={width}
      placement={placement}
      closeIcon={closeIcon}
      closable={closable}
      bodyStyle={bodyStyle}
      headerStyle={headerStyle}
      onClose={onClose}
      visible={visible}
    >
      <div>{children}</div>
    </Drawer>
  );
};
export default SideDrawer;

SideDrawer.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  placement: PropTypes.string,
  closeIcon: PropTypes.element,
  closable: PropTypes.bool,
  bodyStyle: PropTypes.any,
  headerStyle: PropTypes.any,
  onclose: PropTypes.func,
  visible: PropTypes.any,
  children: PropTypes.any,
};

SideDrawer.defaultProps = {
  title: "",
  width: "",
  placement: "",
  closeIcon: "",
  closable: "",
  bodyStyle: "",
  headerStyle: "",
  onclose: "",
  visible: "",
  children: null,
};
