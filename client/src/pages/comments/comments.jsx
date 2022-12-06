import React from "react";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import CommentForm from "./commentForm";
const Comments = () => {
  return (
    <section className="comments">
      <div className="container">
        <div className="comments__container">
          <NavBar check={true} title={"Comments"} children={<GoBack />} />
          <CommentForm />
        </div>
      </div>
    </section>
  );
};

export default Comments;
