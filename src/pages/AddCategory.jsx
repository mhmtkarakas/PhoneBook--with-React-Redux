import React, {useState} from "react";
import {useSelector,useDispatch} from "react-redux"
import api from "../api/api"
import urls from "../api/urls"
import actionTypes from "../redux/actions/actionTypes";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";

const AddCategory = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {categoriesState} = useSelector((state)=>state)
    const [form,setForm] = useState({
        id:String(new Date().getTime()),
        name:""
    })

    const handleSubmit =(e)=>{
        e.preventDefault()
        /* validation */
        if(form.name===""){
            alert("Kategori Alanı boş bırakılamaz")
            return
        }
        const hasCategory =categoriesState.categories.find((item)=>item.name.toLocaleLowerCase()===form.name.toLocaleLowerCase())
        console.log(hasCategory)
        if(hasCategory !== undefined){
            alert("Böyle bir kategori zaten mevcut")
            return;
        }
        api.post(urls.categories,form)
        .then(res=>{
          dispatch({type:actionTypes.categoryActions.ADD_CATEGORY,payload:form})
          navigate("/list-categories")
        })
        .catch(err=>{})
    }
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
              form={form.name}
            onChange={(e)=>setForm({...form, name:e.target.value})}
            />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-secondary w-50" type="submit">Kaydet</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
