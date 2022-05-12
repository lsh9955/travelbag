import * as actionType from "../constants/actionTypes";

const authReducer = (state = { authData: null, errors: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();

      return { ...state, authData: null, loading: false, errors: null };
    case actionType.ERROR:
      return { ...state, errors: action.error.response.data.message };
    default:
      return state;
  }
};

export default authReducer;
