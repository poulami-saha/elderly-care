import { NavLink } from "react-router-dom";
import homeImage from "../assets/homepage.jpg";
import Features from "../components/Features";
import Faq from "../components/Faq";

const HomePage = () => {
  return (
    <>
      <section id="hero">
        <div className="container flex flex-col flex-reverse p-6 mx-auto lg:flex-row lg:mb-0 max-w-[1280px]">
          <div className="flex flex-col space-y-8 lg:mt-4 lg:w-1/2">
            <p className="text-2xl font-semibold text-center lg:text-3xl lg:text-left">
              Elderly Care
            </p>
            <p className="max-w-md mx-auto text-lg text-center text-grey-400 lg:text-xl lg:text-left lg:mt-0 lg:mx-0">
              The best way to enjoy fine{" "}
              <span className="bg-green-200 px-2 py-1 rounded-lg">aging</span>.
            </p>
            <div className="flex items-center justify-center w-full space-x-4 lg:justify-start">
              <NavLink
                to="/signIn"
                className="p-3  mb-4 text-sm font-semibold text-black bg-softBlue rounded shadow-md border-2 border-softBlue md:text-base hover:text-softBlue hover:bg-white"
              >
                Login for Care
              </NavLink>
              <NavLink
                to="/signUp"
                className="p-3 text-sm  mb-4 font-semibold text-black bg-green-200 rounded shadow-md border-2 border-green-600 md:text-base hover:text-gray-600 hover:bg-white"
              >
                New to Elderly Care
              </NavLink>
            </div>
          </div>
          <div className="mx-auto lg:mx-0 lg:mb-0 lg:w-1/2">
            <img
              src={homeImage}
              alt="homeImage"
              className="lg:top-24 xl:top-0 overflow-x-visible rounded-xl"
            />
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-[1280px] px-6">
        <Features />
      </div>
      <div className="mx-auto max-w-[1000px] px-12">
        <Faq />
      </div>
    </>
  );
};
export default HomePage;
