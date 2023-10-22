import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import ErrorBlock from "../utils/ErrorBlock";
import { UserDataModel } from "../model/user";
import { useEffect, useState } from "react";
import {
  approveRequest,
  getPatientProfile,
  queryClient,
} from "../store/http";
import { useMutation } from "@tanstack/react-query";

const CaregiverApproval: React.FC<{ currentUser: UserDataModel }> = ({
  currentUser,
}) => {
  const [open, setOpen] = useState(false);
  const [patients, setPatients] = useState<UserDataModel[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<UserDataModel>();

  useEffect(() => {
    const getPatientProfiles = async () => {
      const data = [];
      if (currentUser.pendingRequests?.pendingRequests) {
        for (const patient of currentUser.pendingRequests.pendingRequests) {
          let profile = await getPatientProfile(patient);
          if (profile !== undefined) {
            data.push(profile);
          }
        }
        setPatients(data);
      }
    };
    getPatientProfiles();
  }, [currentUser]);

  const handleOpen = (index: number) => {
    setOpen(!open);
    setSelectedPatient(patients[index]);
  };

  const handleApproval = (index: number) => {
    setOpen(!open);
    setSelectedPatient(patients[index]);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: approveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      setOpen(!open);
      let updatedPatients = patients.filter(
        (pat) => pat.id !== selectedPatient?.id
      );
      setPatients(updatedPatients);
    },
  });

  const submitRequest = () => {
    mutate({
      id: currentUser.id,
      caregiverList: [],
      lastCaregiver: undefined,
      pendingRequests:
        currentUser.pendingRequests?.pendingRequests?.filter(
          (request) => request !== selectedPatient?.id
        ) ?? undefined,
    });
  };
  let content;

  if (
    currentUser.pendingRequests?.pendingRequests &&
    currentUser.pendingRequests.pendingRequests?.length > 0
  ) {
    content = patients.map((patient: UserDataModel, index: number) => {
      return (
        <li key={index}>
          <div className="border rounded-lg w-[25rem] p-6 ">
            <p className="font-serif text-lg font-bold mb-2">{`${patient.personal?.firstName} ${patient.personal?.lastName}`}</p>
            <p className="font-serif text-md font-bold">
              <u>Patient Address:</u>
            </p>
            <p className="font-serif text-md font-light">
              {`${patient.contact?.address1} ${patient.contact?.address2} ${patient.contact?.city}  ${patient.contact?.country} ${patient.contact?.pin}`}
            </p>

            <p className="font-serif text-md font-bold">
              <u>Fluent in communicating:</u>
            </p>
            <ul className="pl-6 font-serif text-md font-light">
              {patient.requirement?.languages?.map((lan) => (
                <li key={index} className="list-disc">
                  {lan}
                </li>
              ))}
            </ul>
            <p className="font-serif text-md font-bold">
              <u>Disorders if any:</u>
            </p>
            <ul className="pl-6 font-serif text-md font-light">
              {patient.requirement?.disorders?.map((disorder) => (
                <li key={index} className="list-disc">
                  {disorder}
                </li>
              ))}
            </ul>
            <div className="flex space-x-1 w-auto">
              <Button
                className="mt-6 bg-green-300 text-black"
                fullWidth
                onClick={() => handleApproval(index)}
              >
                Approve
              </Button>
              <Button
                className="mt-6 bg-green-300 text-black"
                fullWidth
                onClick={() => handleApproval(index)}
              >
                Decline
              </Button>
            </div>
          </div>
        </li>
      );
    });
  } else {
    content = (
      <p className="text-center my-4"> No pending requests to approve</p>
    );
  }
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Pending Requests to Approve
      </h1>

      {isPending && (
        <div className="flex items-center justify-center ">
          <Spinner color="green" className="h-12 w-12" />
        </div>
      )}

      {isError && (
        <ErrorBlock
          title="An error occurred"
          message={error.message ?? "Please try after sometime!"}
        />
      )}
      <ul className="flex flex-col md:flex-row md:flex-wrap justify-around space-y-4  md:space-x-2">
        {content}
      </ul>

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
          Click confirm to submit your approval/denial. We will send you the
          contract with more details shortly.
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
            <span> Approve</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};
export default CaregiverApproval;
