import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import api from "../api/api";
import urls from "../api/urls";
import { useDispatch } from "react-redux";
import actionTypes from './../redux/actions/actionTypes';

const ListCategories = () => {
  const dispatch = useDispatch()
  const { categoriesState, phonesState } = useSelector((state) => state);
  const deleteCategory=(id)=>{
    if(window.confirm("silmek istediğinize emin misiniz")){
      const phones=phonesState.phones.filter(item=>item.categoryId===id)
      api.delete(`${urls.categories}/${id}`)
      .then(res=>{
        dispatch({type:actionTypes.categoryActions.DELETE_CATEGORY,payload:id,})
    
        dispatch({type:actionTypes.phoneActions.DELETE_PHONES_AFTER_DELETE_CATEGORY,payload:id,})
    
      .catch(err=>{})
    })
    
   
    }}
  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="d-flex justify-content-end">
          <Link className="btn btn-secondary" to={"/add-category"}>
            Kategori Ekle
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sıra No</th>
              <th scope="col">Kategori Adı</th>
              <th scope="col">Kayıtlı Kişi Sayısı</th>
              <th scope="col">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {categoriesState.categories.length === 0 && (
              <tr>
                <td colSpan={4}>Kayıtlı Kategory Yok</td>
              </tr>
            )}

            {categoriesState.categories.length > 0 && (
              <>
                {categoriesState.categories.map((category, index) => {
                  const phones = phonesState.phones.filter(
                    (item) => item.categoryId === category.id
                  );
                  //console.log(phones);
                  return (
                    <tr key={category.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{category?.name}</td>
                      <td>{phones.length}</td>
                      <td>
                        <button 
                        onClick={()=>deleteCategory(category.id)}
                        className="btn btn-danger btn-sm">Sil</button>
                        <Link
                          className="btn btn-sm btn-secondary"
                          to={`/edit-category/${category.id}`}
                        >
                          Güncelle
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategories;
