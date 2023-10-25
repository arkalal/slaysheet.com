const { default: Actions } = require("./actions");

const defaultState = {
  getButtonId: null,
};

const slayReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Actions.GET_BUTTON_ID:
      return {
        ...state,
        getButtonId: action.data,
      };

    default:
      return {
        ...state,
      };
  }
};

export default slayReducer;
