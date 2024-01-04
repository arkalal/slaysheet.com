const { default: Actions } = require("./actions");

const defaultState = {
  getButtonId: 1,
  getTokenValue: null,
};

const slayReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Actions.GET_BUTTON_ID:
      return {
        ...state,
        getButtonId: action.data,
      };
    case Actions.GET_TOKEN_VALUE:
      return {
        ...state,
        getTokenValue: action.data,
      };

    default:
      return {
        ...state,
      };
  }
};

export default slayReducer;
