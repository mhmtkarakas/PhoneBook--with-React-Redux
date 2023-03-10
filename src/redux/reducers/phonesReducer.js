import actionTypes from "../actions/actionTypes";

const initialState={
    pending:false,
    success:false,
    phones:[],
    fail:false,
    error:""
}

const phonesReducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.phoneActions.GET_PHONES_START:
            return{
                ...state,
                pending:true
            }
        case actionTypes.phoneActions.GET_PHONES_SUCCESS:
            return{
                ...state,
                pending:false,
                success:true,
                fail:false,
                phones:action.payload
            }
        case actionTypes.phoneActions.GET_PHONES_FAIL:
            return{
                ...state,
                pending:false,
                success:false,
                fail:true,
                error:action.payload
            }
            case actionTypes.phoneActions.DELETE_PHONES_SUCCESS:
                let filteredPhones=state.phones.filter(item=>item.id !==action.payload)
                return{
                    ...state,
                    pending:false,
                    success:true,
                    fail:false,
                    phones:filteredPhones
                }
                case actionTypes.phoneActions.DELETE_PHONES_FAIL:
                    return{
                        ...state,
                        pending:false,
                        success:false,
                        fail:true,
                        error:action.payload
                    }
                    case actionTypes.phoneActions.ADD_PHONES:
                        return{
                            ...state,
                            phones:[...state.phones,action.payload]
                        }
                    case actionTypes.phoneActions.EDIT_PHONES:
                       
                        let temp=[]
                        for(let i=0;i<state.phones.length;i++){
                            if(state.phones[i].id !== action.payload.id){
                                temp.push(state.phones[i])
                            }else{
                                temp.push(action.payload)
                            }
                        }
                       
                        return{
                            ...state,
                            phones:temp
                        }
                        case actionTypes.phoneActions.DELETE_PHONES_AFTER_DELETE_CATEGORY:
                          var temp1=state.phones.filter(item=>item.id !== action.payload)
                          return{
                              ...state,
                              phones:temp1
                          }

        default:
            return state
    }
}

export default phonesReducer