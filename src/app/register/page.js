import React from "react";
import RegisterForm from "../../../components/Reusable/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div>
      <br />
      <h3>
        This is a pre release user authentication...Development going on. So you
        can see your passwords on registration but registered real users will be
        created only for demo. Before the Early Access release, all demo users
        will be deleted from the database.
      </h3>
      <br />
      <h2>
        Register user and login as a demo! To test our Generative AI assistants
        for FREE in Home Page!
      </h2>

      <RegisterForm />
    </div>
  );
};

export default Register;
