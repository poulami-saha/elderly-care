import hygiene from "../assets/hygiene.jpg";
import food from "../assets/nutrition.jpg";
import mobility from "../assets/mobility.jpg";
import free from "../assets/homepage.jpg";
const Assistance = () => {
  return (
    <>
      <div className="flex flex-col max-w-[1280px] mx-auto px-6 py-8 space-y-12 font-serif">
        <h1 className="text-2xl font-bold text-center font-serif">
          Services Offered
        </h1>
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-24">
          <img
            src={hygiene}
            className="h-[300px] hidden md:block md:w-1/2 border rounded-2xl"
          />
          <div className="w-auto md:w-1/2 border border-green-200 rounded-2xl p-8 h-[300px]">
            <p className="text-xl font-serif font-bold">Personal hygiene</p>
            <p className="my-4 font-light">
              A large part of the care services is help with personal hygiene.
              These can be very different depending on your needs.
            </p>
            <ul className="list-disc px-4 mb-4 font-light">
              <li>Bathing & showering</li>
              <li>Going to the toilet</li>
              <li>Combing hair & shaving</li>
              <li>Brushing teeth & nail care</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between space-x-24">
          <div className="w-auto md:w-1/2 border border-green-200 rounded-2xl p-8 h-[300px]">
            <h1 className="text-xl font-serif font-bold">Food & Nutrition</h1>
            <p className="my-4 font-light">
              A large part of the care services is also to assist you in
              preparing meals and adapt to the diet.
            </p>
            <ul className="list-disc px-4 mb-4" font-light>
              <li>Cooking together</li>
              <li>Support while eating</li>
              <li>Maintaining diet</li>
            </ul>
          </div>

          <img
            src={food}
            className="h-[300px] hidden md:block md:w-1/2 border rounded-xl"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-24">
          <img
            src={mobility}
            className="h-[300px] hidden md:block md:w-1/2 border rounded-2xl"
          />
          <div className="w-auto md:w-1/2 border border-green-200 rounded-2xl p-8 h-[300px]">
            <p className="text-xl font-serif font-bold">Domestic Support</p>
            <p className="my-4 font-light">
              A large part of the care services is help with daily chores.
              These can vary different depending on your needs.
            </p>
            <ul className="list-disc px-4 mb-4 font-light">
            <li>Making beds</li>
              <li>Washing & Ironing</li>
              <li>Regular cleaning</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between space-x-24">
          <div className="w-auto md:w-1/2 border border-green-200 rounded-2xl p-8 h-[300px]">
            <h1 className="text-xl font-serif font-bold">Leisure</h1>
            <p className="my-4 font-light">
              A large part of the care services is to give you company in the
              way you like.
            </p>
            <ul className="list-disc px-4 mb-4 font-light">
              <li>Playing indoor games together</li>
              <li>Going for shopping</li>
              <li>Evening walk together</li>
              <li>Reading out books</li>
            </ul>
          </div>

          <img
            src={free}
            className="h-[300px] hidden md:block md:w-1/2 border rounded-xl"
          />
        </div>
      </div>
    </>
  );
};

export default Assistance;
