import {
  Button,
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useState, ChangeEvent, useEffect } from "react";
import { ContactDetailModel } from "../model/user";
import { queryClient, updateCurrentUserContactData } from "../store/http";
import { useMutation } from "@tanstack/react-query";
import ErrorBlock from "../utils/ErrorBlock";
import Toast from "../utils/Toast";

const ContactDetails: React.FC<{
  contactData: undefined | ContactDetailModel;
  id: string;
}> = ({ contactData, id }) => {
  const [alert, setAlert] = useState(false);
  const [details, setDetails] = useState({
    id: id,
    address1: contactData?.address1 ?? "",
    address2: contactData?.address2 ?? "",
    city: contactData?.city ?? "",
    country: contactData?.country ?? "",
    email: contactData?.email ?? "",
    phone: contactData?.phone ?? undefined,
    pin: contactData?.pin ?? undefined,
    emergencyContactName: contactData?.emergencyContactName ?? undefined,
    emergencyContactEmail: contactData?.emergencyContactEmail ?? undefined,
    emergencyContactPhone: contactData?.emergencyContactPhone ?? undefined,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const { mutate, error, isError } = useMutation({
    mutationFn: updateCurrentUserContactData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setAlert(true);
      setDetails({
        id: "",
        address1: "",
        address2: "",
        city: "",
        country: "",
        email: "",
        phone: undefined,
        pin: undefined,
        emergencyContactName: "",
        emergencyContactEmail: "",
        emergencyContactPhone: undefined,
      });
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
        <Typography variant="h4" color="blue-gray">
          Contact Details
        </Typography>
        <form
          className="mt-8 mb-2 md:w-[35rem]"
          onSubmit={submitHandler}
          autoComplete="off"
        >
          <div className="flex flex-col md:flex-row md:space-x-6 mt-8 mb-2 md:justify-between">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                size="lg"
                label="Address 1"
                crossOrigin=""
                required
                id="address1"
                name="address1"
                onChange={handleChange}
                value={details.address1}
                className="w-[16rem]"
              />
              <Input
                size="lg"
                label="Address 2"
                crossOrigin=""
                id="address2"
                name="address2"
                onChange={handleChange}
                value={details.address2}
              />
              <Input
                size="lg"
                label="City"
                crossOrigin=""
                required
                id="city"
                name="city"
                onChange={handleChange}
                value={details.city}
              />
              <Input
                size="lg"
                label="Country"
                crossOrigin=""
                required
                id="country"
                name="country"
                onChange={handleChange}
                value={details.country}
              />
              <Input
                size="lg"
                label="Pin"
                crossOrigin=""
                required
                id="pin"
                name="pin"
                value={details.pin}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4 flex flex-col gap-6">
              <Input
                type="email"
                size="lg"
                label="Personal Email"
                crossOrigin=""
                id="email"
                name="email"
                onChange={handleChange}
                value={details.email}
                className="w-[16rem]"
              />
              <Input
                type="number"
                size="lg"
                label="Personal Phone"
                crossOrigin=""
                id="phone"
                name="phone"
                onChange={handleChange}
                value={details.phone}
                required
              />
              <Input
                size="lg"
                label="Emergency Contact Name"
                crossOrigin=""
                required
                id="emergencyContactName"
                name="emergencyContactName"
                onChange={handleChange}
                value={details.emergencyContactName}
              />
              <Input
                type="email"
                size="lg"
                label="Emergency Contact Email"
                crossOrigin=""
                id="emergencyContactEmail"
                name="emergencyContactEmail"
                onChange={handleChange}
                value={details.emergencyContactEmail}
                className="w-[16rem]"
              />
              <Input
                type="number"
                size="lg"
                label="Emergency Contact Phone"
                crossOrigin=""
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                onChange={handleChange}
                value={details.emergencyContactPhone}
                required
              />
            </div>
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

export default ContactDetails;
