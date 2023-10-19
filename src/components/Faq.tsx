import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";

const Icon: React.FC<{ id: number; open: number }> = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
const Faq = () => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <>
      <p className="text-2xl font-semibold text-center mt-4 mb-6">
        Frequently asked Questions
      </p>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(1)}
          className="text-md font-bold"
        >
          How much does my Caregiver from Elderly Care cost?
        </AccordionHeader>
        <AccordionBody className="font-serif text-md">
          How much a Caregiver costs often depends on the expansion of the care
          and their time spend each day. Basically, The desired remuneration
          starts at 2,200 euros per month. If you have Care Insurance part of
          this is covered by insurance.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader
          onClick={() => handleOpen(2)}
          className="text-md font-bold"
        >
          How quickly can my found carer start?
        </AccordionHeader>
        <AccordionBody className="font-serif text-md">
          Sometimes it has to be fast. How quickly you can find a suitable
          caregiver depends on your particular situation. Under “normal”
          conditions, families can find a caregiver within 2 days. The placement
          should not take longer than 5 days. Of course, you can also search in
          advance - this way you can have the good feeling that everything is
          taken care of early on.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />} className="mb-6">
        <AccordionHeader
          onClick={() => handleOpen(3)}
          className="text-md font-bold"
        >
          What happens if the person being cared for and the Caregiver do not
          harmonize?
        </AccordionHeader>
        <AccordionBody className="font-serif text-md">
          Despite extensive advance information for both sides, it can always
          happen that the “chemistry” is not right. In this case, we are fully
          available to help you and the carer in order to find a new, more
          suitable replacement as quickly as possible and to organize the
          departure and arrival.
        </AccordionBody>
      </Accordion>
    </>
  );
};

export default Faq;
