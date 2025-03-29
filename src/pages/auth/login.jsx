import CommonForm from "@/components/common/form";
import { loginForm } from "@/config";
import { loginUser } from "@/srore/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";


const initialState = {
    email: "",
    password: "",
  };

function AuthLogin() {
    const [formData, setFormData] = useState(initialState);

   
     const {toast} = useToast()
    const dispatch = useDispatch()
    

    function onSubmitt (event)  {
      event.preventDefault()
      dispatch(loginUser(formData)).then(res => {
        if(payload?.data) {
          toast({
            title:"ol"
          })
        }
        console.log(res);
        
      })    
    }

    return (  
        <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          sing in to your account 
        </h1>
        <p className="mt-2">
        Dont have an account
        <Link className="font-medium ml-2 text-primary hover:underline" to="/register">
        Register
        </Link>
        </p>
        </div>
        <CommonForm 
        formControls={loginForm}
        buttonText={"Sign in"}
        formData={formData}
        setFormData={setFormData}
        onSumbit={onSubmitt}
        
        />
        </div>
    );
}

export default AuthLogin;