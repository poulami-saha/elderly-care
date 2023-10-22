import login from "../assets/login.jpg";
import {} from "react-icons";

const Cost = () => {
  return (
    <>
      <div className="mx-auto max-w-[1240px] flex flex-col items-center font-serif">
        <img src={login} className="h-60 w-2/3  mt-6 border rounded-2xl" alt="login"/>
        <div className="w-2/3 text-center">
          <p className="mt-6 text-3xl font-bold">
            Fair prices &
            <span className=" border rounded-lg bg-green-300 px-3">
              full transparency.
            </span>
          </p>
          <p className="mt-6 justify-around">
            We attach great importance to fair treatment of families and
            caregivers ‍
          </p>
          <p className=" mt-3 justify-around">
            We ensure fair prices and better pay for caregivers, as well as how
            you can already get your desired support. We also deal with
            insurance companies to give you a hackle free care.
          </p>
          <p className=" mt-3 justify-around"> Elderly care is secure.</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-24 my-6 font-serif md:mx-6">
        <div className="w-auto md:w-1/2 border border-green-200 rounded-2xl p-8  m-4 md:mx-8">
          <p className="text-xl font-serif font-bold">Cost of a Caregiver</p>
          <p className="my-4 font-bold text-3xl">
            Affordable for you, better for the caregiver.
          </p>
          <p className="my-4">
            Through Elderly care you come into direct contact with the care staff,
            without middlemen. This saves you costs and ensures that the carers
            are paid appropriately for the first time.
          </p>
        </div>
        <div className="w-auto md:w-1/2 border border-green-200 rounded-2xl p-16 m-4 md:mx-8">
          <p className="text-3xl  font-bold">
            Monthly costs for a caregiver
          </p>
          <p className="my-4 font-bold text-2xl">
            <span className="text-2xl">From €2,299</span> /Month
          </p>
        </div>
      </div>
    </>
  );
};

export default Cost;
