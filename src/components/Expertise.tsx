import {
  Card,
  Select,
  List,
  ListItem,
  ListItemPrefix,
  Checkbox,
  Typography,
  Option,
  Button,
} from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { queryClient, updateCaregiverExpertiseData } from "../store/http";
import { ExpertiseModel } from "../model/user";
import ErrorBlock from "../utils/ErrorBlock";
import Toast from "../utils/Toast";

const Expertise: React.FC<{
  expertise: undefined | ExpertiseModel;
  id: string;
}> = ({ expertise, id }) => {
  const [alert, setAlert] = useState(false);

  const disorderList = ["Anxiety", "Bipolar", "Dementia"];
  const languageList = ["English", "German", "French"];

  const [checkedDisorderState, setCheckedDisorderState] = useState(
    new Array(disorderList.length).fill(false)
  );

  const [checkedLangState, setCheckedLangState] = useState(
    new Array(languageList.length).fill(false)
  );

  const [details, setDetails] = useState<ExpertiseModel>({
    id: id,
    years: expertise?.years ?? "2",
    languages: expertise?.languages ?? [],
    disorders: expertise?.disorders ?? [],
  });

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

  const { mutate, isError, error } = useMutation({
    mutationFn: updateCaregiverExpertiseData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      setAlert(true)
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
          Details about your Expertise
        </Typography>
        <form className="my-4 font-semibold" onSubmit={submitHandler} autoComplete="off">
          <label>1. How many years of experience do you have?</label>
          <div className="flex gap-10">
            <Card className="my-3">
              <Select
                label=""
                id="years"
                name="years"
                onChange={(e) =>
                  setDetails({ ...details, ["years"]: e ?? "0" })
                }
                value={details.years?.toString() ?? "0"}
              >
                <Option value="0">None</Option>
                <Option value="2">Less than 2 years</Option>
                <Option value="8">Less than 8 years</Option>
                <Option value="10">More than 10 years</Option>
              </Select>
            </Card>
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

export default Expertise;
