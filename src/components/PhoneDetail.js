import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../api/api";
import urls from "../api/urls";

const PhoneDetail = () => {
 
  const params = useParams();
  const [myPhone, setMyPhone] = useState(null);
  const [phoneCategory, setPhoneCategory] = useState(null);

  useEffect(() => {
    /*  http://localhost:3004/phones/2 */
    api
      .get(`${urls.phones}/${params.phoneId}`)
      .then((res) => {
        setMyPhone(res.data);
        api
          .get(`${urls.categories}/${res.data.categoryId}`)
          .then((resCategory) => {
            console.log(resCategory.data);
            setPhoneCategory(resCategory.data);
          });
      })
      .catch((err) => {});
  }, []);
  if (myPhone === null || phoneCategory === null) return null;
  return (
    <div>
    <Header />
    <div className="container my-5">
    <table class="table">
     <thead>
    <tr>
      <th scope="row">No</th>
      <th scope="col">Name</th>
      <th scope="col">Surname</th>
      <th scope="col">PhoneNumber</th>
      <th scope="col">Category</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>{myPhone.name}</td>
      <td>{myPhone.surname}</td>
      <td>{myPhone.phones}</td>
      <td>{phoneCategory.name}</td>
    </tr>
  </tbody>
</table>

    <Link to={"/"}>RETURN</Link> 
      
     </div> 
    </div>
  );
};

export default PhoneDetail;
