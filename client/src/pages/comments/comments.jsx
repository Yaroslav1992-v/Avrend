import React, { useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import GoBack from "../../common/ui/goBack";
import NavBar from "../../common/ui/navBar";
import { getCommentsByPostId } from "../../store/comments";
import CommentForm from "./commentForm";
import CommentsList from "./commentsList";
import { useEffect } from "react";
const Comments = () => {
  const { postId } = useParams();
  const comments = useSelector(getCommentsByPostId(postId));
  const [reply, setReply] = useState({});
  let parent;
  const findParent = (commentId) => {
    parent = sortedComments.find((c) => c._id === commentId);
    if (parent && parent.parentId) {
      findParent(parent.parentId);
    }
  };
  const handleReply = (data) => {
    findParent(data.parentId);
    setReply({ ...data, parentId: parent });
  };
  useEffect(() => {}, []);
  const sortedComments = _.orderBy(comments, ["created_at"], ["desc"]);
  const parentComments = sortedComments.filter(
    (comments) => !comments.parentId
  );

  return (
    <section className="comments">
      <div className="container">
        <div className="comments__container">
          <div className="comments__cover">
            <NavBar check={true} title={"Comments"} children={<GoBack />} />
            <CommentForm reply={reply} />
            <CommentsList
              onReply={handleReply}
              comments={parentComments}
              allComments={sortedComments}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Comments);
