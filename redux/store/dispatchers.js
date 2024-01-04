import Actions from "./actions";

export const dispatchButtonId = (data) => {
  return {
    type: Actions.GET_BUTTON_ID,
    data,
  };
};

export const dispatchTokenValue = (data) => {
  return {
    type: Actions.GET_TOKEN_VALUE,
    data,
  };
};
