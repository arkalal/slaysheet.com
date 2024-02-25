import React from "react";
import ReduxProvider from "../../../redux/ReduxProvider";
import RegisterForm from "../../../components/Reusable/RegisterForm/RegisterForm";

const ForgotPassword = () => {
  return (
    <div>
      <ReduxProvider>
        <RegisterForm isForgotPassword={true} />
      </ReduxProvider>
    </div>
  );
};

export default ForgotPassword;
