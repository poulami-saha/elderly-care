import {
  Card,
  Input,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { queryClient, updateCurrentUserPersonalData } from "../store/http";
import { PersonalDetailModel } from "../model/user";
import ErrorBlock from "../utils/ErrorBlock";
import Toast from "../utils/Toast";

const PersonalDetails: React.FC<{
  personalData: undefined | PersonalDetailModel;
  id: string;
}> = ({ personalData, id }) => {
  const [alert, setAlert] = useState(false);
  const [details, setDetails] = useState<PersonalDetailModel>({
    id: id,
    firstName: personalData?.firstName ?? "",
    lastName: personalData?.lastName ?? "",
    gender: personalData?.gender ?? "",
    dateOfBirth: personalData?.dateOfBirth,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "dateOfBirth") {
      setDetails({ ...details, ["dateOfBirth"]: new Date(value) });
    }
    setDetails({ ...details, [name]: value });
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: updateCurrentUserPersonalData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setAlert(true);
      setDetails({
        id: undefined,
        firstName: undefined,
        lastName: undefined,
        gender: undefined,
        dateOfBirth: undefined,
      });
    },
  });

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(false), 2000);
    }
  }, [alert]);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (details.id !== undefined) {
      mutate(details);
    }
  };

  return (
    <>
      {isError && (
        <ErrorBlock
          title="An error occurred while updating details"
          message={error.message ?? "Please try after sometime"}
        />
      )}
      <Card color="transparent" shadow={false} className="items-center">
        <Typography variant="h4" color="blue-gray">
          Personal Details
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="First Name"
              crossOrigin=""
              id="firstName"
              name="firstName"
              onChange={handleChange}
              defaultValue={details.firstName}
              required
            />

            <Input
              size="lg"
              label="Last Name"
              crossOrigin=""
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={details.lastName}
              required
            />
            <div className="w-84">
              <Select
                label="Gender"
                id="gender"
                name="gender"
                onChange={(e) => setDetails({ ...details, ["gender"]: e })}
                value={details.gender}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="transgender">Transgender</Option>
                <Option value="n/a">Not to mention</Option>
              </Select>
            </div>
            <Input
              type="date"
              size="lg"
              label="Date of Birth"
              crossOrigin=""
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleChange}
              required
              value={details.dateOfBirth?.toString()}
            />
          </div>

          <Button
            type="submit"
            className="mt-6 bg-green-300 text-black"
            fullWidth
          >
            Save
          </Button>
        </form>
        {alert && <Toast isError={false} />}
      </Card>
    </>
  );
};

export default PersonalDetails;
