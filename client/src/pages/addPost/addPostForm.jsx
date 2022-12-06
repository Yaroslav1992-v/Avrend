import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PostField from "../../common/form/postField";
import TextArea from "../../common/form/textArea";
import fileService from "../../services/file.service";
import { createPost } from "../../store/post";
import { getCurrentUserId } from "../../store/user";
const AddPostForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getCurrentUserId());
  const [post, setPost] = useState({
    userId: userId,
    content: "",
  });
  const navigate = useNavigate();
  const uploadImage = async () => {
    if (image) {
      return await fileService.uploadFile(image);
    } else {
      return null;
    }
  };
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(error).length > 0) return;
    const img = await uploadImage();
    if (!img) {
      setError({ image: " image not uploaded" });
      return;
    }
    const check = await dispatch(
      createPost({ ...post, picturePath: img, createdAt: Date() })
    );
    if (check) {
      navigate(-1);
    }
  };
  const handleChange = ({ target }) => {
    setPost((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file.size >= 3125576) {
      setError({ image: "Max File Size is 3mb" });
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <PostField
        error={error.image}
        name="image"
        img={imagePreview}
        onChange={handleImage}
      />
      <TextArea
        onChange={handleChange}
        name="content"
        placeholder={"Write whats on your mind..."}
      />
      {/* {backEndError && <p className="form_error">{backEndError}</p>} */}
      <button className="form__submit btn">Add Post</button>
    </form>
  );
};

export default AddPostForm;
