import { Button, Card, Radio, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { queryClient, updateCaregiverServiceData } from "../store/http";
import { useMutation } from "@tanstack/react-query";
import { ServiceModel } from "../model/user";
import ErrorBlock from "../utils/ErrorBlock";
import Toast from "../utils/Toast";

const Service: React.FC<{ id: string; service: undefined | ServiceModel }> = ({
  id,
  service,
}) => {
  const [alert, setAlert] = useState(false);

  const [details, setDetails] = useState<ServiceModel>({
    id: id,
    nightCare: service?.nightCare ?? "false",
    accommodation: service?.accommodation ?? "false",
    fullTime: service?.fullTime ?? "false",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: updateCaregiverServiceData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setAlert(true);
    },
  });

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (details.id !== undefined) {
      mutate(details);
    }
  };

  useEffect(() => {
    if (alert) {
      setTimeout(() => setAlert(false), 2000);
    }
  }, [alert]);

  return (
    <>
      {isError && (
        <ErrorBlock
          title="An error occurred while updating details"
          message={error.message ?? "Please try after sometime"}
        />
      )}
      <Card color="transparent" shadow={false} className="items-center">
        <Typography
          variant="h4"
          color="blue-gray"
          className="text-lg md:text-xl"
        >
          Details about your Service
        </Typography>
        <form
          className="my-4  text-md md:text-lg"
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <label>1. Do you conduct Night Care Service?</label>
          <div className="flex gap-10" id="nightCare" onChange={changeHandler}>
            <Radio
              name="nightCare"
              label="Yes"
              crossOrigin={undefined}
              value="true"
              checked={details.nightCare === "true"}
              onChange={changeHandler}
            />
            <Radio
              name="nightCare"
              label="No"
              value="false"
              checked={details.nightCare === "false"}
              crossOrigin={undefined}
              onChange={changeHandler}
            />
          </div>

          <label>2. Do you need private accommodation?</label>
          <div className="flex gap-10">
            <Radio
              name="accommodation"
              label="Yes"
              value="true"
              checked={details.accommodation === "true"}
              onChange={changeHandler}
              crossOrigin={undefined}
            />
            <Radio
              name="accommodation"
              label="No"
              value="false"
              checked={details?.accommodation === "false"}
              onChange={changeHandler}
              crossOrigin={undefined}
            />
          </div>

          <label>3. Do you work full time / part time?</label>
          <div className="flex gap-10">
            <Radio
              name="fullTime"
              label="Full time"
              onChange={changeHandler}
              crossOrigin={undefined}
              value="true"
              checked={details?.fullTime === "true"}
            />
            <Radio
              name="fullTime"
              label="Part Time"
              onChange={changeHandler}
              crossOrigin={undefined}
              value="false"
              checked={details?.fullTime === "false"}
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
export default Service;
