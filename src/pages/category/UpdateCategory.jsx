import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const {id} = useParams();
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
      const promise = firebase.updateCategory(id,{name:formData.name,index:formData.index,icon:formData.icon});
      toast.promise(promise,{
          loading : "Updating...",
          success : (data) => {
              setFormData(initialState);
              navigate(-1);
              return "Updated successfully";
          },
          error : (err) => {
              setFormData(initialState);
              console.log(err);
              return "Something went wrong!"
          }
      })
  }

  useEffect(()=>{
    (async ()=>{
        const data = await firebase.getSingleDocument("CATEGORIES",id);
        setFormData(data)
        console.log(data);
    })()
  },[]);
  return (
    <div className="addNew__wrapper">
      <h2>Update Category</h2>
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
          <img src={formData?.iconURL} alt="icon " style={{width:"130px"}} />
          <label htmlFor="icon">Change Category Icon</label>
          <input
            type="file"
            placeholder="Select icon..."
            onChange={handleInputChange}
            name="icon"
          />
        </div>

        <div className="actions">
            <button type="button" className="btn btn__danger" onClick={()=>{navigate(-1)}}>Go Back</button>
            <button type="submit" className="btn btn__success">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
