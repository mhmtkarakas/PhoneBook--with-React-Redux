import React, { useState } from "react";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import actionTypes from "../redux/actions/actionTypes";
import api from "../api/api";
import urls from "../api/urls";
import {useNavigate} from 'react-router-dom'


const AddPhones = () => {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const { categoriesState } = useSelector((state) => state);
  const [form, setForm] = useState({
    id:String(new Date().getTime()),
    name: "",
    surname: "",
    phones: "",
    categoryId:categoriesState.categories[0].id
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validatıon*/
    if (
      form.name === "" ||
      form.author === "" ||
      form.phonenumber === "" ||
      form.categoryId === ""
    ) {
      alert("it is neccessary to enter name,surname and categoryId area");
      return ;
    }
    /* request to api */
   
    api
      .post(urls.phones, form)
      .then((res) => {
        dispatch({
          type: actionTypes.phoneActions.ADD_PHONES,
          payload: form
        });
        navigate("/")
      })
      .catch((err) => {});
  };
  console.log(form)
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name..."
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
              Surname
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Surname..."
              value={form.surname}
              onChange={(event) =>
                setForm({ ...form, surname: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phonenumber" className="form-label">
              Phone Number
            </label>
            <input
              type="number"
              className="form-control"
              id="phonenumber"
              placeholder="Enter the phone number"
              value={form.phones}
              onChange={(event) =>
                setForm({ ...form, phones: event.target.value })
              }
            />
          </div>
          <select
            className="form-select"
            defaultValue={categoriesState.categories[0].id}
            value={form.categoryId}
            onChange={(event) =>
              setForm({ ...form, categoryId: event.target.value })
            }
          >
            {categoriesState.categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-secondary w-50 " type="submit">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhones;
