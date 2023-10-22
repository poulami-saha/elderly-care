import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const Toast: React.FC<{ isError: boolean }> = ({ isError = false }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) {
      setTimeout(() => setOpen(false), 2000);
    }
  }, [open]);

  return (
    <div className=" w-[30rem] items-center font-black">
      {isError && (
        <Alert open={open} onClose={() => setOpen(false)} color="red">
          Failed to update your data !!!
        </Alert>
      )}
      <Alert open={open} onClose={() => setOpen(false)} color="green">
        Your data has been saved !!!
      </Alert>
    </div>
  );
};

export default Toast;
