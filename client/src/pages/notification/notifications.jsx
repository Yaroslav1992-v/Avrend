import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import _ from "lodash";
import {
  getAllNotifcations,
  updateNotifications,
} from "../../store/notification";
import Notification from "./notification";

const Notifications = () => {
  const { nots, unseenNots } = useSelector(getAllNotifcations());
  const sortedNots = _.orderBy(nots, ["createdAt"], ["desc"]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (unseenNots.length > 0) {
      dispatch(updateNotifications(unseenNots, "seen"));
    }
  }, [unseenNots]);
  return (
    <section className="notifications">
      <div className="container">
        <div className="notifications__container">
          <NavBar check={true} children={<GoBack />} title="Notification" />
          <div className="notifications__box">
            <ul className="notifications__list">
              {sortedNots.map((n) => (
                <li key={n._id} className="notifications__item">
                  <Notification notification={n} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notifications;
