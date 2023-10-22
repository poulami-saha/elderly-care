import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../store/http";
import ErrorBlock from "../utils/ErrorBlock";
import CaregiverApproval from "../components/CaregiverApproval";
import CaregiverRequest from "../components/CaregiverRequest";

const Requests = () => {
  const userId = localStorage.getItem("userId");
  const {
    data: currentUserData,
    error: currentUserError,
    isError: currentUserHasError,
  } = useQuery({
    enabled: !!userId,
    queryKey: ["users"],
    queryFn: () => fetchCurrentUser(userId!),
  });

  return (
    <div className="mx-12 my-6">
      {currentUserHasError && (
        <ErrorBlock
          title="An error occurred"
          message={
            currentUserError.message ?? "Failed to fetch current user data!"
          }
        />
      )}
      {currentUserData && currentUserData.isCaregiver && (
        <CaregiverApproval currentUser={currentUserData} />
      )}
      {currentUserData && !currentUserData.isCaregiver && (
        <CaregiverRequest currentUser={currentUserData} />
      )}
    </div>
  );
};
export default Requests;
