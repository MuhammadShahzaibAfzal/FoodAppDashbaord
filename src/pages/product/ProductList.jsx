import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import { useFirebase } from "../../context/firebase";
import toast from "react-hot-toast";

const ProductList = () => {
  const firebase = useFirebase();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch products from Firestore
    const fetchData = async () => {
      const snapshot = await firebase.getDocuments("PRODUCTS");
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(productsData);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const promise = firebase.deleteDocument("PRODUCTS", id);
    toast.promise(promise, {
      loading: "Deleting...",
      success: (data) => {
        setData((prev) => prev.filter((i) => i.id !== id));
        return "Deleted succesfully !";
      },
      error: (err) => {
        console.log(err);
        return "Something went wrong";
      },
    });
  };
  return (
    <div className="list__wrapper">
      <div className="list__header">
        <h2>List of Products</h2>
        <Link to="/dashboard/add-new-product" className="btn btn__primary">
          Add New
        </Link>
      </div>

      <div className="table__wrapper">
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>No#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => {
              return (
                <tr key={i.id}>
                  <td>{index + 1}</td>
                  <td>{i.product_title}</td>
                  <td>
                    <img
                      style={{ width: "80px", height: "80px" }}
                      src={i.product_image_1}
                      alt="product image"
                    />
                  </td>
                  <td>Rs : {i.product_price}</td>
                  <td>{i.stock_quantity}</td>
                  <td style={{ width: "200px" }}>
                    <Link
                      to={`/dashboard/view-product/${i.id}`}
                      className="btn btn__success"
                    >
                      <FaEye />
                    </Link>
                    <button
                      className="btn btn__danger"
                      style={{ marginRight: "8px", marginLeft: "8px" }}
                      onClick={() => {
                        handleDelete(i.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/dashboard/update-product/${i.id}`}
                      className="btn btn__success"
                    >
                      <FaEdit />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
