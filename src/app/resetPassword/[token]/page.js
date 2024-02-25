import React from "react";
import axios from "../../../../axios/getApi";
import RegisterForm from "../../../../components/Reusable/RegisterForm/RegisterForm";
import ReduxProvider from "../../../../redux/ReduxProvider";

const ResetPassword = ({ params }) => {
  return (
    <div>
      <ReduxProvider>
        <RegisterForm isResetPassword={true} resetToken={params.token} />
      </ReduxProvider>
    </div>
  );
};

export default ResetPassword;
