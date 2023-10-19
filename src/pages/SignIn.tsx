import AuthHeader from "../components/AuthHeader";
import Login from "../components/Login";

const SignIn = () => {
  return (
    <div className="mx-auto max-w-[1240px] flex flex-col items-center">
      <div className="my-5 md:border md:rounded-md md: border-green-300  p-6">
        <AuthHeader
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="SignUp"
          linkUrl="/signUp"
        />
        <Login />
      </div>
    </div>
  );
};

export default SignIn;
