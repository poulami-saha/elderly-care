import {
  Card,
  Input,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { queryClient, updateCurrentUserPersonalData } from "../store/http";

export interface PersonalDetailModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: Date;
}

const PersonalDetails: React.FC<{
  personalData: undefined | PersonalDetailModel;
  id: string;
}> = ({ personalData, id }) => {
  const [details, setDetails] = useState<PersonalDetailModel>({
    id,
    ...personalData,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "dateOfBirth") {
      setDetails({ ...details, ["dateOfBirth"]: new Date(value) });
    }
    setDetails({ ...details, [name]: value });
  };

  const { mutate } = useMutation({
    mutationFn: updateCurrentUserPersonalData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (details.id !== undefined) {
      mutate(details);
    }
  };

  return (
    <Card color="transparent" shadow={false} className="items-center">
      <Typography variant="h4" color="blue-gray">
        Personal Details
      </Typography>
      <form
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        onSubmit={submitHandler}
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
    </Card>
  );
};

export default PersonalDetails;
