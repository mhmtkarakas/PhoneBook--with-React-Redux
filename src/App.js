import React, {useEffect} from 'react';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import actionTypes from "./redux/actions/actionTypes";
import HomePage from "./pages/HomePage";
import api from './api/api';
import urls from "./api/urls";
import AddPhones from "./pages/AddPhones";
import PhoneDetail from './components/PhoneDetail';
import EditPhone from './pages/EditPhone';
import ListCategories from "./pages/ListCategories";
import AddCategory from "./pages/AddCategory"
import EditCategory from './pages/EditCategory';

function App() {
   const dispatch=useDispatch()
   const {phonesState,categoriesState} = useSelector(state=>state)
  useEffect(()=>{
    /* fetch phones */
    dispatch({type:actionTypes.phoneActions.GET_PHONES_START})
    api.get(urls.phones)
    .then((res)=>{
      dispatch({type:actionTypes.phoneActions.GET_PHONES_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
      dispatch({type:actionTypes.phoneActions.GET_PHONES_FAIL,payload:"serverda bir hata oluştu"})
    })
    /* fetch categories */

    dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_START})
    api.get(urls.categories)
    .then((res)=>{
      dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_SUCCESS,payload:res.data})
    })
    .catch((err)=>{
      dispatch({type:actionTypes.categoryActions.GET_CATEGORIES_FAIL,payload:"serverda bir hata oluştu"})
    })

  },[])

  if (phonesState.success===false || categoriesState.success===false)
   return null;

  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/list-categories" element={<ListCategories />}/>
        <Route path="/phone-edit/:phoneId"  element={<EditPhone />} />
        <Route path="/add-phone" element={<AddPhones />} />
        <Route path="/phone-detail/:phoneId" element={<PhoneDetail />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/edit-category/:categoryId" element={<EditCategory />} />
       </Routes>
       </BrowserRouter>
    </div>
      );
  }

export default App;
