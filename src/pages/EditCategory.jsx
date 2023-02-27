import React, { useState } from "react";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import actionTypes from './../redux/actions/actionTypes';
import api from '../api/api'
import urls from '../api/urls'

const EditCategory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { categoryId } = useParams();

  const { categoriesState } = useSelector((state) => state);
  const myCategory = categoriesState.categories.find(
    (item) => item.id === categoryId
  );
  const [form, setForm] = useState(myCategory);
  console.log(myCategory);
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (form.name === "") {
      alert("Kategori Alanı boş bırakılamaz");
      return;
    }
    const hasCategory =categoriesState.categories.find(item=>item.name.toLowerCase()===form.name.toLowerCase());
    if(hasCategory !==undefined){
        alert("Böyle bir kategori zaten mevcut")
        return;
    }
     api.put(`${urls.categories}/${categoryId}`)
     .then(res=>{
        dispatch({type:actionTypes.categoryActions.EDIT_CATEGORY,payload:form})
        navigate("/list-categories")
     })
     .catch(err=>{})
  };
  return (
    <div>
      <Header />

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 my-5">
            <label htmlFor="name" className="form-label">
              Kategori İsmi
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Kategori İsmi..."
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
                 disabled={
                    form.name.toLowerCase("tr-TR") ===
                    myCategory.name.toLowerCase("tr-TR")
                      ? true
                      : false
                  }
              className="btn btn-secondary w-50"
              type="submit"
            >
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
