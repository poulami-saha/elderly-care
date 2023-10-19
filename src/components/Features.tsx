import { useState } from "react";

const Features = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex flex-wrap mx-auto">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-col md:flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-green-200 mt-2">
              <a
                className={
                  "text-md font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-black bg-green-300"
                    : "text-green-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Everything online
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-green-200 mt-2">
              <a
                className={
                  "text-md font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-black bg-green-300"
                    : "text-green-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Verified
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-green-200 mt-2">
              <a
                className={
                  "text-md font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-black bg-green-300"
                    : "text-green-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Perfect
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div
                  className={` font-serif ${
                    openTab === 1 ? "block" : "hidden"
                  }`}
                  id="link1"
                >
                  <p>
                    Self-employed caregivers create an account with Elderly
                    Care, specifying their expertise and language skills.
                    <br />
                    <br /> The Elderly Care platform offers you the Caregiver
                    with whom you wont have any linguistic issue.
                  </p>
                </div>
                <div
                  className={` font-serif ${
                    openTab === 2 ? "block" : "hidden"
                  }`}
                  id="link2"
                >
                  <p>
                    Do you want to know who is coming to your house? Us too.
                    <br />
                    <br />
                    That's why we do a background check of every caregiver and
                    verify their certifications.
                  </p>
                </div>
                <div
                  className={` font-serif ${
                    openTab === 3 ? "block" : "hidden"
                  }`}
                  id="link3"
                >
                  <p>
                    Elderly Care's algorithm matches the various skills of our Caregiver with
                    your needs.
                    <br />
                    <br /> This way we guarantee that you only receive suggestions
                    that perfectly match your requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
