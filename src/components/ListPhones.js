import React, {useState,useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assets/styles/buttons.css";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import { Link } from "react-router-dom";

const ListPhones = () => {
  const [searchText,setSearchText]=useState("")
  const dispatch = useDispatch();
  const { phonesState, categoriesState } = useSelector((state) => state);
  const [filteredPhones,setFilteredPhones] =useState(phonesState.phones)

  useEffect(()=>{
    const temp=phonesState.phones.filter(item=>
      item.name.toLowerCase().includes(searchText.toLowerCase()) === true
     )
    setFilteredPhones(temp)
  },[searchText])
  const deletePhone = (id) => {
    if (window.confirm("silmek istediğinize emin misiniz") === true) {
      dispatch({ type: actionTypes.phoneActions.DELETE_PHONES_START });
      api
        .delete(`${urls.phones}/${id}`)
        .then((res) => {
          dispatch({
            type: actionTypes.phoneActions.DELETE_PHONES_SUCCESS,
            payload: id,
          });
        })
        .catch((err) => {
          dispatch({
            type: actionTypes.phoneActions.DELETE_PHONES_FAIL,
            payload: "Silme işlemi esnasında hata oluştu",
          });
        });
    }
  };
  return (
    <div className="container">
      <div className=" my-5">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Lütfen isim giriniz"
            input={searchText}
            onChange={(event)=>setSearchText(event.target.value)}
          />

          <Link to={"/add-phone"} className="btn btn-secondary btn-lg">
            Add Phones
          </Link>
        </div>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th scope="col">Sıra No:</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Categories</th>
            </tr>
          </thead>
          <tbody>
            {filteredPhones.map((phone, index) => {
              /* let myCategory=null
               for(let i=0;i<categoriesState.categories.length;i++){
                if(categoriesState.categories[i].id===phone.categoryId){
                    myCategory=categoriesState.categories[i]
                }
               } */
              const myCategory = categoriesState.categories.find(
                (item) => item.id === phone.categoryId
              );
              return (
                <tr key={phone.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{phone.name}</td>
                  <td>{phone.surname}</td>
                  <td>{phone.phones}</td>
                  <td>{myCategory.name}</td>
                  <td>
                    <button
                      onClick={() => deletePhone(phone.id)}
                      className="generalBtn deleteBtn"
                    >
                      Sil
                    </button>
                    <Link
                      to={`/phone-edit/${phone.id}`}
                      className="generalBtn editBtn"
                    >
                      Güncelle
                    </Link>
                    <Link
                      to={`/phone-detail/${phone.id}`}
                      className="generalBtn detailBtn"
                    >
                      Detay
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

export default ListPhones;
