import * as types from '../types';

const initialState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  data: [],
};

export default reducersRooms = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `${types.GET_ROOMS}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload.data,
      };
    }
    case `${types.GET_ROOMS}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case `${types.POST_ROOMS}_PENDING`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `${types.POST_ROOMS}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    }
    case `${types.POST_ROOMS}_REJECTED`: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
