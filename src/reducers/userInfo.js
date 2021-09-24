const userInfo = (state = {}, action) => {
  switch (action.type) {
    case "SUCCESS_LOGIN":
      return {
        id: action.id,
        name: action.name,
        gender: action.gender,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default userInfo;
