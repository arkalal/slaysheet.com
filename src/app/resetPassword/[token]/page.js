import React from "react";
import axios from "../../../../axios/getApi";
import RegisterForm from "../../../../components/Reusable/RegisterForm/RegisterForm";
import ReduxProvider from "../../../../redux/ReduxProvider";

const verifyToken = async (token) => {
  try {
    const res = await axios.post("verifyToken", JSON.stringify({ token }));
    return res;
  } catch (error) {
    console.log(error);
  }
};

const ResetPassword = ({ params }) => {
  const token = verifyToken(params.token);

  return (
    <div>
      <ReduxProvider>
        <RegisterForm isResetPassword={true} verifyResetToken={token} />
      </ReduxProvider>
    </div>
  );
};

export default ResetPassword;
