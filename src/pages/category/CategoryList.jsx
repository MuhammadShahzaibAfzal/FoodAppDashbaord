import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useFirebase } from "../../context/firebase";
import toast from "react-hot-toast";

const CategoryList = () => {
  const firebase = useFirebase();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch products from Firestore
    const fetchData = async () => {
      const snapshot = await firebase.getDocuments("CATEGORIES");
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(productsData);
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const promise = firebase.deleteDocument("CATEGORIES", id);
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
        <h2>List of Categories</h2>
        <Link to="/dashboard/add-new-category" className="btn btn__primary">
          Add New
        </Link>
      </div>

      <div className="table__wrapper">
        <table cellSpacing="0" cellPadding="0">
          <thead>
            <tr>
              <th>No#</th>
              <th>Category Name</th>
              <th>Category Image</th>
              <th>Category Index</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((i, index) => {
              return (
                <tr key={i.id}>
                  <td>{index + 1}</td>
                  <td>{i.name}</td>
                  <td>
                    <img
                      style={{ width: "80px", height: "80px" }}
                      src={i.iconURL}
                      alt="category image"
                    />
                  </td>
                  <td>{i.index}</td>
                  <td style={{ width: "130px" }}>
                    <button
                      className="btn btn__danger"
                      style={{ marginRight: "8px" }}
                      onClick={() => {
                        handleDelete(i.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                    <Link to={`/dashboard/update-category/${i.id}`} className="btn btn__success">
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

export default CategoryList;
