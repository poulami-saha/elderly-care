import { ChangeEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authenticateFirebase } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../store/http";
import { Checkbox, Input } from "@material-tailwind/react";

interface signUpModel {
  emailAddress: string;
  password: string;
}

const CreateAccount = () => {
  const auth = authenticateFirebase();
  const navigate = useNavigate();

  const [signUpState, setSignUpState] = useState<signUpModel>({
    emailAddress: "",
    password: "",
  });

  const [failedSignIn, setFailedSignIn] = useState(false);
  const [caregiver, setCaregiver] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpState({ ...signUpState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAccount();
  };

  const createAccount = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpState.emailAddress,
        signUpState.password
      );
      await addNewUser({
        userId: userCredential.user.uid,
        isCaregiver: caregiver,
      });
      await navigate("/signIn");
    } catch (err) {
      setFailedSignIn(true);
    }
  };

  return (
    <>
      {failedSignIn && (
        <p className="text-red-400 text-center">
          Failed to create an account. Please try after sometime.
        </p>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} autoComplete="off">
        <Input
          size="lg"
          label="Email Address"
          crossOrigin={undefined}
          onChange={handleChange}
          value={signUpState.emailAddress}
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
          value={signUpState.password}
          id="password"
          name="password"
          type="password"
          required={true}
        />
        <Checkbox
          label="SignUp as a Caregiver"
          crossOrigin={undefined}
          checked={caregiver}
          onChange={() => setCaregiver(!caregiver)}
          className="font-sans"
        />
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-green-200 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-10"
        >
          SignUp
        </button>
      </form>
    </>
  );
};
export default CreateAccount;
