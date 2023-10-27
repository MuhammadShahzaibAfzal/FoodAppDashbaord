import React, { useState } from "react";
import { useFirebase } from "../../context/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddNewCategory = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const initialState = {
    name: "",
    index: "",
    icon: null,
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (name === "icon") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = firebase.addNewCategory(
      formData.name,
      formData.icon,
      formData.index
    );
    toast.promise(promise, {
      loading: "Adding...",
      success: (data) => {
        setFormData(initialState);
        return "Added successfully";
      },
      error: (err) => {
        setFormData(initialState);
        console.log(err);
        return "Something went wrong!";
      },
    });
  };
  return (
    <div className="addNew__wrapper">
      <h2>Add new Category</h2>
      <form className="form__container" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Category Name</label>
          <input
            type="text"
            placeholder="Enter category name..."
            value={formData.name}
            onChange={handleInputChange}
            name="name"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="index">Category Index</label>
          <input
            type="number"
            placeholder="Enter category index..."
            value={formData.index}
            onChange={handleInputChange}
            name="index"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="icon">Category Icon</label>
          <input
            type="file"
            placeholder="Select icon..."
            onChange={handleInputChange}
            name="icon"
            required
          />
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </button>
          <button type="submit" className="btn btn__success">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCategory;
