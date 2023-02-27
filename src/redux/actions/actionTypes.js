
const actionTypes={
    phoneActions:{
        GET_PHONES_START:"GET_PHONES_START",
        GET_PHONES_SUCCESS:"GET_PHONES_SUCCESS",
        GET_PHONES_FAIL:"GET_PHONES_FAIL",
        DELETE_PHONES_START:"DELETE_PHONES_START",
        DELETE_PHONES_SUCCESS:"DELETE_PHONES_SUCCESS",
        DELETE_PHONES_FAIL:"DELETE_PHONES_FAIL",
        ADD_PHONES:"ADD_PHONES",
        EDIT_PHONES:"EDIT_PHONES",
        DELETE_PHONES_AFTER_DELETE_CATEGORY:"DELETE_PHONES_AFTER_DELETE_CATEGORY"
    },
    categoryActions:{
        GET_CATEGORIES_START:"GET_CATEGORIES_START",
        GET_CATEGORIES_SUCCESS:"GET_CATEGORIES_SUCCESS",
        GET_CATEGORIES_FAIL:"GET_CATEGORIES_FAIL",
        ADD_CATEGORY:"ADD_CATEGORY",
        DELETE_CATEGORY:"DELETE_CATEGORY",
        EDIT_CATEGORY:"EDIT_CATEGORY"
    }
}

export default actionTypes