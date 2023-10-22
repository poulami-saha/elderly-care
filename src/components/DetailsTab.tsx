import React from "react";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../store/http";
import Experience from "./Experience";
import Requirements from "./Requirements";
import ErrorBlock from "../utils/ErrorBlock";

const DetailsTab: React.FC<{ color: string }> = ({ color = "green" }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const userId = localStorage.getItem("userId");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchCurrentUser(userId!),
  });

  let content = (
    <div className="flex flex-wrap mx-auto max-w-[1280px]">
      <div className="w-full">
        <ul
          className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-col md:flex-row"
          role="tablist"
        >
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-green-200">
            <a
              className={
                "text-xs font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 1
                  ? "text-black bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(1);
              }}
              data-toggle="tab"
              href="#link1"
              role="tablist"
            >
              Personal
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-green-200">
            <a
              className={
                "text-xs font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 2
                  ? "text-black bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(2);
              }}
              data-toggle="tab"
              href="#link2"
              role="tablist"
            >
              Contact
            </a>
          </li>
          <li className="-mb-px mr-2 last:mr-0 flex-auto text-center bg-green-200">
            <a
              className={
                "text-xs font-bold  px-5 py-3 shadow-lg rounded block leading-normal " +
                (openTab === 3
                  ? "text-black bg-" + color + "-600"
                  : "text-" + color + "-600 bg-white")
              }
              onClick={(e) => {
                e.preventDefault();
                setOpenTab(3);
              }}
              data-toggle="tab"
              href="#link3"
              role="tablist"
            >
              {data?.isCaregiver ? "Experience" : "Requirement"}
            </a>
          </li>
        </ul>
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="px-4 py-5 flex-auto">
            <div className="tab-content tab-space">
              <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                {data?.id && (
                  <PersonalDetails personalData={data.personal} id={data.id} />
                )}
              </div>
              <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {data?.id && (
                  <ContactDetails contactData={data?.contact} id={data.id} />
                )}
              </div>
              <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                {!data?.isCaregiver && data?.id && (
                  <Requirements
                    id={data.id}
                    requirementData={data?.requirement}
                  />
                )}
                {data?.isCaregiver && data?.id && (
                  <Experience
                    id={data.id}
                    documents={data.documents}
                    expertise={data.expertise}
                    service={data.service}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {isLoading && <p>Data is loading</p>}
      {data && content}
      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={error.message ?? "Failed to load user data"}
        />
      )}
    </>
  );
};

export default DetailsTab;
