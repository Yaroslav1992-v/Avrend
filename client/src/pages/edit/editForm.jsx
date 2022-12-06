import React, { useState } from "react";
import FileField from "../../common/form/fileField";
import TextField from "../../common/form/textField";
import fileService from "../../services/file.service";
import { editValidator } from "../../utils/validatorsConfig";
import { validator } from "../../utils/validator";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  findUserById,
  getAuthError,
  getCurrentUserId,
  updateUser,
} from "../../store/user";
const EditForm = () => {
  const userId = useSelector(getCurrentUserId());
  const getUser = useSelector(findUserById(userId));
  const [user, setUser] = useState(getUser);
  const validate = () => {
    const errors = validator(user, editValidator);
    setErrors(errors);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const uploadImage = async () => {
    if (image) {
      return await fileService.uploadFile(image);
    } else {
      return user.picturePath;
    }
  };
  const backEndError = useSelector(getAuthError());
  const handleSubmit = async (e) => {
    e.preventDefault();
    validate();
    if (Object.keys(errors).length > 0) {
      return;
    }
    const img = await uploadImage();

    const check = await dispatch(
      updateUser({ ...user, picturePath: img }, userId)
    );
    if (check) {
      navigate(-1);
    }
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file.size >= 3125576) {
      setErrors({ ...errors, image: "Max File Size is 3mb" });
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleChange = (target) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <FileField
        img={user.picturePath}
        error={errors.image}
        preview={imagePreview}
        onChange={handleImage}
        name="image"
      />
      <TextField
        placeholder="Account Name"
        onChange={handleChange}
        name="accountName"
        value={user.accountName}
        error={errors.accountName}
      />
      <TextField
        placeholder="First Name"
        onChange={handleChange}
        name="firstName"
        value={user.firstName}
        error={errors.firstName}
      />
      <TextField
        placeholder="Last Name"
        onChange={handleChange}
        name="lastName"
        value={user.lastName}
        error={errors.lastName}
      />

      <TextField
        placeholder="Occupation"
        onChange={handleChange}
        name="occupation"
        value={user.occupation}
      />
      <TextField
        placeholder="Location"
        onChange={handleChange}
        name="location"
        value={user.location}
      />

      {backEndError && <p className="form_error">{backEndError}</p>}
      <button className="form__submit btn">Edit</button>
    </form>
  );
};

export default EditForm;
