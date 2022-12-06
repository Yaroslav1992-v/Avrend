import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
const PostContent = ({ img, text }) => {
  const [content, setContent] = useState(text);
  const [btn, setBtn] = useState(false);
  useEffect(() => {
    if (content.length > 100) {
      const newStr = content.substring(0, 100);
      setContent(newStr);
      setBtn(true);
    }
  }, []);
  const handleContent = () => {
    setContent(text);
    setBtn(false);
  };
  return (
    <div className="post__content">
      <div className="post__imageBox">
        <img src={img} alt="" className="post__img" />
      </div>
      <div className="post__text">
        <p>{content}</p>
        {text.length > 100 && btn && (
          <button onClick={handleContent} className="post__more">
            more..
          </button>
        )}
      </div>
    </div>
  );
};
PostContent.propTypes = {
  img: PropTypes.string,
  text: PropTypes.string,
};

export default PostContent;
