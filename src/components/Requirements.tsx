import {
  Card,
  Typography,
  Radio,
  Checkbox,
  List,
  ListItem,
  ListItemPrefix,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { queryClient, updateRequirementsData } from "../store/http";
import { useMutation } from "@tanstack/react-query";
import { RequirementModel } from "../model/user";
import ErrorBlock from "../utils/ErrorBlock";
import Toast from "../utils/Toast";

const Requirements: React.FC<{
  requirementData: undefined | RequirementModel;
  id: string;
}> = ({ requirementData, id }) => {
  const [alert, setAlert] = useState(false);
  const [details, setDetails] = useState<RequirementModel>({
    id,
    ...requirementData,
  });
  const languageList = [
    "English",
    "German",
    "French",
    "Spanish",
    "Hindi",
    "Arabic",
  ];
  const disorderList = ["Anxiety", "Bipolar", "Dementia"];
  const [checkedDisorderState, setCheckedDisorderState] = useState(
    new Array(disorderList.length).fill(false)
  );
  const [checkedLangState, setCheckedLangState] = useState(
    new Array(languageList.length).fill(false)
  );
  const langHandler = (position: number) => {
    const updatedCheckedState = checkedLangState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedLangState(updatedCheckedState);
    let updatedList: string[] = [];
    updatedCheckedState.forEach((entry: boolean, index: number) => {
      if (entry === true) {
        updatedList.push(languageList[index]);
      }
    });
    setDetails({ ...details, languages: updatedList });
  };

  const disorderHandler = (position: number) => {
    const updatedCheckedDisorderState = checkedDisorderState.map(
      (item, index) => (index === position ? !item : item)
    );
    setCheckedDisorderState(updatedCheckedDisorderState);
    let updatedList: string[] = [];
    updatedCheckedDisorderState.forEach((entry: boolean, index: number) => {
      if (entry === true) {
        updatedList.push(disorderList[index]);
      }
    });
    setDetails({ ...details, disorders: updatedList });
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: updateRequirementsData,
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
        <Typography variant="h4" color="blue-gray">
          Your Requirements
        </Typography>
        <form className="font-serif my-10 mx-4" onSubmit={submitHandler} autoComplete="off">
          <div className="mb-4 flex flex-col">
            <label className="font-semibold">
              1. Do you need Night Care Service?
            </label>
            <div
              className="flex flex-col"
              id="nightCare"
              onChange={changeHandler}
            >
              <Radio
                name="nightCare"
                label="Yes, Night care service needed"
                value="true"
                crossOrigin={undefined}
                checked={details.nightCare === "true"}
                onChange={changeHandler}
                className="font-medium"
              />
              <Radio
                name="nightCare"
                label="No, Day care service needed"
                value="false"
                checked={details.nightCare === "false"}
                crossOrigin={undefined}
                onChange={changeHandler}
                className="font-medium"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="font-semibold">
              2. Do you provide private accommodation to the Caregiver?
            </label>
            <div
              className="flex flex-col"
              id="accommodation"
              onChange={changeHandler}
            >
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
          </div>
          <div className="mb-4 flex flex-col">
            <label className="font-semibold">
              3. Do you have Elderly Care Insurance?
            </label>
            <div
              className="flex flex-col"
              id="insurance"
              onChange={changeHandler}
            >
              <Radio
                name="insurance"
                label="Yes"
                crossOrigin={undefined}
                value="true"
                checked={details.insurance === "true"}
                onChange={changeHandler}
              />
              <Radio
                name="insurance"
                label="No"
                value="false"
                checked={details.insurance === "false"}
                crossOrigin={undefined}
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="font-semibold">
              4. Do you need full time/ part time service?
            </label>
            <div
              className="flex flex-col"
              id="fulltime"
              onChange={changeHandler}
            >
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
          </div>
          <div className="mb-4 flex flex-col">
            <label className="font-semibold">
              2. Which language/s do you speak?
            </label>
            <div className="flex flex-col" id="languages">
              <Card className="my-2">
                <List>
                  {languageList.map((lang: string, index: number) => {
                    return (
                      <ListItem className="p-0 flex flex-wrap" key={index}>
                        <label
                          htmlFor="languages"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              crossOrigin={undefined}
                              id="languages"
                              name="languages"
                              value={languageList[index]}
                              className="hover:before:opacity-0"
                              checked={
                                checkedLangState[index] ||
                                details.languages?.includes(languageList[index])
                              }
                              onChange={() => langHandler(index)}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography className="font-semibold">
                            {lang}
                          </Typography>
                        </label>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            </div>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="font-semibold">
              3. Which of the following disorders you have dealt earlier?
            </label>
            <div className="flex flex-col" id="disorder">
              <Card className="my-2">
                <List>
                  {disorderList.map((disorder: string, index: number) => {
                    return (
                      <ListItem className="p-0" key={index}>
                        <label
                          htmlFor="disorders"
                          className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Checkbox
                              crossOrigin={undefined}
                              id="disorders"
                              name="disorders"
                              value={disorderList[index]}
                              className="hover:before:opacity-0"
                              checked={
                                checkedDisorderState[index] ||
                                details.disorders?.includes(disorderList[index])
                              }
                              onChange={() => disorderHandler(index)}
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography className="font-semibold">
                            {disorder}
                          </Typography>
                        </label>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
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

export default Requirements;
