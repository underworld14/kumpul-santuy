import * as types from '../types';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  data: [],
};

export default reducersCustomers = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_CUSTOMERS}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `${types.GET_CUSTOMERS}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload.data,
      };
    }
    case `${types.GET_CUSTOMERS}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case `${types.POST_CUSTOMERS}`: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    }
    case `${types.PUT_CUSTOMERS}`: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    }
    default: {
      return state;
    }
  }
};
