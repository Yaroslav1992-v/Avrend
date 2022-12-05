import React from "react";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import EditForm from "./editForm";
const EditUser = () => {
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
