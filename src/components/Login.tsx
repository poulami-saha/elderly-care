import {
  ChangeEvent,
  useEffect,
  useState,
} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { authenticateFirebase } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";

let fieldsState = {
  emailAddress: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const auth = authenticateFirebase();
  const [user, loading, error] = useAuthState(authenticateFirebase());

  const [loginState, setLoginState] = useState(fieldsState);
  const [failedSignIn, setFailedSignIn] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginState.emailAddress,
        loginState.password
      );
      localStorage.setItem("userId", userCredential.user.uid);
      await navigate("/details");
    } catch (err) {
      setFailedSignIn(true);
    }
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!!user) {
      localStorage.setItem("userId", user.uid);
      //navigate("/details");
    }
    if (error) {
      setFailedSignIn(true);
    }
  }, [user, loading, navigate]);

  return (
    <>
      {failedSignIn && (
        <p className="text-red-400 text-center">
          Failed to sign in. Please enter valid credentials.
        </p>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <Input
          size="lg"
          label="Email Address"
          crossOrigin={undefined}
          onChange={handleChange}
          value={loginState.emailAddress}
          id="emailAddress"
          name="emailAddress"
          type="email"
          required={true}
          className="my-2"
        />
        <Input
          size="lg"
          label="Password"
          crossOrigin={undefined}
          onChange={handleChange}
          value={loginState.password}
          id="password"
          name="password"
          type="password"
          required={true}
        />
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-green-200 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-10"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
