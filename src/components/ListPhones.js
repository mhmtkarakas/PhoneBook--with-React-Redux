import react from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assets/styles/buttons.css";
import api from "../api/api";
import urls from "../api/urls";
import actionTypes from "../redux/actions/actionTypes";
import {Link} from 'react-router-dom'


const ListPhones = () => {
  const dispatch = useDispatch();
  const { phonesState, categoriesState } = useSelector((state) => state);
  const deletePhone = (id) => {
    if(window.confirm("silmek istediğinize emin misiniz")===true){
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
    <div className="my-5">
        <div className="d-flex justify-content-end">
           <Link to={"/add-phone"} className="btn btn-secondary btn-lg">Add Phones</Link>
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
        {phonesState.phones.map((phone, index) => {
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
                <button className="generalBtn editBtn">Güncelle</button>
                <button className="generalBtn detailBtn">Detay</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
};

export default ListPhones;
