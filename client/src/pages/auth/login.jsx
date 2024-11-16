import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const initialState = {
  email: "",
  password: "",
};

const shortcutUsers = {
  admin: { email: "iter.mohammad01@gmail.com", password: "123" },
  user: { email: "Samar@gmail.com", password: "123" },
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  function handleShortcutLogin(userType) {
    setFormData(shortcutUsers[userType]);
    dispatch(loginUser(shortcutUsers[userType])).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: `Logged in as ${userType}`,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="mt-4">
        <p className="text-sm text-center mb-2">Quick access (for demo purposes):</p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handleShortcutLogin('admin')}
            variant="outline"
            className="w-1/2"
          >
            Login as Admin
          </Button>
          <Button
            onClick={() => handleShortcutLogin('user')}
            variant="outline"
            className="w-1/2"
          >
            Login as User
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;