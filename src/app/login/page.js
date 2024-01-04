import React from "react";
import RegisterForm from "../../../components/Reusable/RegisterForm/RegisterForm";
import ReduxProvider from "../../../redux/ReduxProvider";

const Login = () => {
  return (
    <div>
      <ReduxProvider>
        <RegisterForm isLogin={true} />
      </ReduxProvider>
    </div>
  );
};

export default Login;
