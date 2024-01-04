import React from "react";
import RegisterForm from "../../../components/Reusable/RegisterForm/RegisterForm";
import ReduxProvider from "../../../redux/ReduxProvider";

const Register = () => {
  return (
    <div>
      <ReduxProvider>
        <RegisterForm />
      </ReduxProvider>
    </div>
  );
};

export default Register;
