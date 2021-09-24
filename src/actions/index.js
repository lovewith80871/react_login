export const successLogin = (userInfo) => {
  return {
    type: "SUCCESS_LOGIN",
    id: userInfo.id,
    name: userInfo.name,
    gender: userInfo.gender,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
