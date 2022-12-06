import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import { getCurrentUserId } from "../../store/user";
import EditForm from "./editForm";
const EditUser = () => {
  const currentUser = useSelector(getCurrentUserId());
  const { userId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser !== userId) {
      navigate(`/${currentUser}/edit`);
    }
  }, []);

  return (
    <section className="edit">
      <div className="container">
        <div className="edit__container">
          <NavBar children={<GoBack />} check={true} />
          <h1 className="edit__title">Edit Profile</h1>
          <EditForm />
        </div>
      </div>
    </section>
  );
};

export default EditUser;
