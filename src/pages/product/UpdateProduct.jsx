import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const firebase = useFirebase();
  const navigate = useNavigate();
  const initialState = {
    product_title: "",
    product_price: "",
    image_1: null,
    image_2: null,
    image_3: null,
    prouduct_description: "",
    stock_quantity: "",
    use_tab_layout: false,
  };
  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    if (name === "image_1" || name === "image_2" || name === "image_3") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name === "use_tab_layout") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const promise = firebase.updateProduct(id, {
      product_title: formData.product_title,
      product_price: formData.product_price,
      stock_quantity: formData.stock_quantity,
      use_tab_layout: formData.use_tab_layout,
      prouduct_description: formData.prouduct_description,
      image_1: formData.image_1,
      image_2: formData.image_2,
      image_3: formData.image_3,
    });
    toast.promise(promise, {
      loading: "Updating...",
      success: (data) => {
        setFormData(initialState);
        navigate(-1);
        return "Updated successfully";
      },
      error: (err) => {
        setFormData(initialState);
        console.log(err);
        return "Something went wrong!";
      },
    });
  };

  useEffect(() => {
    (async () => {
      const data = await firebase.getSingleDocument("PRODUCTS", id);
      setFormData(data);
    })();
  }, []);
  return (
    <div className="addNew__wrapper">
      <h2>Update Product</h2>
      <form className="form__container" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Product title</label>
          <input
            type="text"
            placeholder="Enter product title..."
            value={formData.product_title}
            onChange={handleInputChange}
            name="product_title"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="index">Product price</label>
          <input
            type="number"
            placeholder="Enter product price..."
            value={formData.product_price}
            onChange={handleInputChange}
            name="product_price"
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="index">Quantity Stock</label>
          <input
            type="number"
            placeholder="Enter stock quantity..."
            value={formData.stock_quantity}
            onChange={handleInputChange}
            name="stock_quantity"
            required
          />
        </div>
        <label htmlFor="tab">Use TabLayout</label>
        <input
          type="checkbox"
          value={formData.use_tab_layout}
          onChange={handleInputChange}
          placeholder="Use Tablayout"
          name="use_tab_layout"
          id="tab"
        />
        <div className="form-control">
          <label htmlFor="icon">Product Description</label>
          <textarea
            name="prouduct_description"
            id=""
            cols="30"
            rows="4"
            value={formData.prouduct_description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="form-control">
          <img
            src={formData?.product_image_1}
            alt="icon "
            style={{ width: "130px" }}
          />
          <label htmlFor="icon">Product Image 1</label>
          <input
            type="file"
            placeholder="Select image..."
            onChange={handleInputChange}
            name="image_1"
          />
        </div>
        <div className="form-control">
          <img
            src={formData?.product_image_2}
            alt="icon "
            style={{ width: "130px" }}
          />
          <label htmlFor="icon">Product Image 2</label>
          <input
            type="file"
            placeholder="Select image..."
            onChange={handleInputChange}
            name="image_2"
          />
        </div>
        <div className="form-control">
          <img
            src={formData?.product_image_3}
            alt="icon "
            style={{ width: "130px" }}
          />
          <label htmlFor="icon">Product Image 3</label>
          <input
            type="file"
            placeholder="Select image..."
            onChange={handleInputChange}
            name="image_3"
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

export default UpdateProduct;
