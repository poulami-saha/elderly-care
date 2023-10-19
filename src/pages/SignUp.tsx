import AuthHeader from "../components/AuthHeader";
import CreateAccount from "../components/CreateAccount";

const SignUp = () => {
  return (
    <div className="mx-auto max-w-[1240px] flex flex-col items-center">
      <div className="md:my-5 md:border md:rounded-md border-green-300 md:w-1/2 p-6">
        <AuthHeader
          heading="Sign up to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/signIn"
        />
        <CreateAccount />
      </div>
    </div>
  );
};

export default SignUp;
