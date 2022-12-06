import React from "react";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import AddPostForm from "./addPostForm";
const AddPost = () => {
  return (
    <section className="addPost">
      <div className="container">
        <div className="addPost__container">
          <NavBar check={true} children={<GoBack />} />
          <h1 className="addPost__title">Write Post</h1>
          <AddPostForm />
        </div>
      </div>
    </section>
  );
};

export default AddPost;
