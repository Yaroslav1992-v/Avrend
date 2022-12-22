import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { getAllUnseenCount } from "../../store/notification";

const NotificatonBox = () => {
  const count = useSelector(getAllUnseenCount());
  return (
    <div className="notification-box">
      <button className="notification-btn">
        <IoMdNotificationsOutline />{" "}
        {count > 0 && <span className="notification-count">{count}</span>}
      </button>
    </div>
  );
};

export default NotificatonBox;
