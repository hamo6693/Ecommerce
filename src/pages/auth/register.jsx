import CommonForm from "@/components/common/form";
import { registerForm } from "@/config";
import { registerUser } from "@/srore/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "../../hooks/use-toast";

const initialState = {
  name: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const { toast } = useToast();

  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then(data => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      navigate("/login");

      } else {
        toast({
          title: data?.payload?.message,
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new account
        </h1>
        <p className="mt-2">
          Already have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerForm}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSumbit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
