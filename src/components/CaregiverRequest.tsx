import {
  Alert,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import ErrorBlock from "../utils/ErrorBlock";
import { UserDataModel } from "../model/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addCaregiverRequest, findCaregiver, queryClient } from "../store/http";
import { useState } from "react";

const CaregiverRequest: React.FC<{ currentUser: UserDataModel }> = ({
  currentUser,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedCaregiver, setSelectedCaregiver] = useState<UserDataModel>();
  const [showText, setShowText] = useState(false);

  const { data, status, isSuccess } = useQuery({
    queryKey: ["caregivers"],
    queryFn: () => findCaregiver(localStorage.getItem("userId") ?? ""),
  });

  const {
    mutate,
    isError: CaregiverRequestIsError,
    error: CaregiverRequestError,
  } = useMutation({
    mutationFn: addCaregiverRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      setShowText(true);
    },
  });

  const handleOpen = (index: number) => {
    setOpen(!open);
    if (data) {
      setSelectedCaregiver(data[index]);
    }
  };

  const submitRequest = () => {
    setOpen(!open);

    let updatedCaregiverList: string[] = [];
    if (selectedCaregiver?.id !== undefined) {
      if (
        currentUser.caregiverList?.caregiverList &&
        currentUser.caregiverList.caregiverList.length > 0
      ) {
        updatedCaregiverList = [
          ...currentUser.caregiverList.caregiverList,
          selectedCaregiver.id,
        ];
      } else {
        updatedCaregiverList = [selectedCaregiver.id];
      }
    }

    let updatedPendingRequests: string[] = [];
    if (currentUser.id !== undefined) {
      if (
        selectedCaregiver?.pendingRequests?.pendingRequests &&
        selectedCaregiver.pendingRequests.pendingRequests.length > 0
      ) {
        updatedPendingRequests = [
          ...selectedCaregiver.pendingRequests.pendingRequests,
          currentUser.userId,
        ];
      }
      updatedPendingRequests = [currentUser.id];
    }

    if (
      currentUser.id &&
      updatedCaregiverList.length > 0 &&
      selectedCaregiver &&
      updatedPendingRequests.length > 0
    ) {
      mutate({
        id: currentUser.id,
        caregiverList: updatedCaregiverList,
        lastCaregiver: selectedCaregiver,
        pendingRequests: updatedPendingRequests,
      });
    }
  };
  let content;

  if (isSuccess && data.length === 0) {
    content = (
      <p className="text-center my-4">
        Unfortunately we couldn't find a caregiver for you.
      </p>
    );
  }
  if (isSuccess && data && data.length > 0) {
    content = data?.map((caregiver: UserDataModel, index: number) => {
      return (
        <li key={index}>
          <div className="border rounded-lg w-[18rem] p-6 h-[20rem] md:w-[25rem]">
            <p className="font-serif text-lg font-bold mb-2">{`${caregiver.personal?.firstName} ${caregiver.personal?.lastName}`}</p>
            <p className="font-serif text-md">
              Experienced in handling person with:
            </p>
            <ul className="pl-6">
              {caregiver.expertise?.disorders.map(
                (disorder: string, index: number) => (
                  <li key={index} className="list-disc !font-light">
                    {disorder}
                  </li>
                )
              )}
            </ul>
            <p className="font-serif text-md"> Fluent in communicating:</p>
            <ul className="pl-6">
              {caregiver.expertise?.languages.map(
                (lan: string, index: number) => (
                  <li key={index} className="list-disc">
                    {lan}
                  </li>
                )
              )}
            </ul>
            {currentUser.caregiverList &&
              currentUser.caregiverList.caregiverList.length === 0 && (
                <Button
                  className="mt-6 bg-green-300 text-black"
                  fullWidth
                  onClick={() => handleOpen(index)}
                  disabled={currentUser?.caregiverList?.caregiverList.includes(
                    data[index].userId
                  )}
                >
                  Request
                </Button>
              )}
          </div>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Caregivers as per your Need
      </h1>

      {status === "pending" && (
        <div className="flex items-center justify-center ">
          <Spinner color="green" className="h-12 w-12" />
        </div>
      )}

      {status === "error" && (
        <ErrorBlock
          title="An error occurred"
          message={"Please try after sometime!"}
        />
      )}
      {CaregiverRequestIsError && (
        <ErrorBlock
          title="An error occurred"
          message={
            CaregiverRequestError.message ?? "Please try after sometime!"
          }
        />
      )}
      <ul className="flex flex-col md:flex-row md:flex-wrap justify-around space-y-4  md:space-x-2">
        {content}
      </ul>
      {showText && (
        <div className="w-[60rem] flex items center justify-center mx-6">
          <Alert
            color="green"
            className="mt-4"
          >
            A request has been submitted, please wait for the process to
            complete before making another request
          </Alert>
        </div>
      )}
      {currentUser.caregiverList &&
        currentUser.caregiverList.caregiverList.length > 0 && (
          <Alert color="green" className="mt-4">
            A request has already been submitted. Please wait for the process to
            complete before making another request.
          </Alert>
        )}
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Care request Confirmation</DialogHeader>
        <DialogBody>
          Click confirm to submit your request. We will contact you shortly once
          the caregiver approves your request.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(!open)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={submitRequest}>
            <span> Request</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default CaregiverRequest;
