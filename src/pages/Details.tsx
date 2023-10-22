import DetailsTab from "../components/DetailsTab";

const PersonalDetails = () => {
  return (
    <div className="mx-auto max-w-[1280px]">
      <h1 className="ml-4 mt-8 text-xl font-bold text-center">
        Personal Details
      </h1>
      <DetailsTab color="green"/>
    </div>
  );
};

export default PersonalDetails;
