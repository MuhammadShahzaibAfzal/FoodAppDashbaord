import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/firebase";
import { useParams } from "react-router-dom";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const firebase = useFirebase();
  useEffect(() => {
    (async () => {
      const data = await firebase.getSingleDocument("PRODUCTS", id);
      setProduct(data);
      console.log(data);
    })();
  }, []);
  return (
    <div>
      <div className="imagesContainer">
        <img src={product?.product_image_1} alt="image1" />
        <img src={product?.product_image_2} alt="image1" />
        <img src={product?.product_image_3} alt="image1" />
      </div>

      <div className="detailsContainer">
        <h2>Product Title : {product?.product_title}</h2>
        <h3>Product Price : {product?.product_price} Rupees</h3>
        <p>Stock Quantity : {product?.stock_quantity} </p>
        <p>Product Description : {product?.prouduct_description}</p>
      </div>
    </div>
  );
};

export default ViewProduct;
