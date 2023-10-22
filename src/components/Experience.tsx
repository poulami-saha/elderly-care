import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Certification from "./Certification";
import Expertise from "./Expertise";
import Service from "./Service";
import { DocumentModel, ExpertiseModel, ServiceModel } from "../model/user";

const Experience: React.FC<{
  id: string;
  documents: undefined | DocumentModel;
  expertise: undefined | ExpertiseModel;
  service: undefined | ServiceModel;
}> = ({ id, documents, expertise, service }) => {
  const data = [
    {
      label: "Certification",
      value: "certification",
      desc: <Certification id={id} docs={documents} />,
    },
    {
      label: "Expertise",
      value: "expertise",
      desc: <Expertise id={id} expertise={expertise} />,
    },
    {
      label: "Service",
      value: "service",
      desc: <Service id={id} service={service} />,
    },
  ];

  return (
    <Tabs value="html">
      <TabsHeader>
        {data.map(({ label, value }) => (
          <Tab key={value} value={value}>
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};
export default Experience;
