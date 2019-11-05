import * as types from '../types';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  data: [],
};

export default reducersCheckIn = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_CHECKIN}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `${types.GET_CHECKIN}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload.data,
      };
    }
    case `${types.GET_CHECKIN}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case `${types.POST_CHECKIN}`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case `${types.PUT_CHECKOUT}`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};
