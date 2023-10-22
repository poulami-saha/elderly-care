import { useEffect, useState } from "react";
import { storage } from "../firebase.config";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  ListResult,
  StorageReference,
} from "firebase/storage";
import { DocumentModel } from "../model/user";
import { updateDocumentsNameList } from "../store/http";
import { Button, Card, Spinner, Typography } from "@material-tailwind/react";

const Certification: React.FC<{
  docs: undefined | DocumentModel;
  id: string;
}> = ({ docs, id }) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [uploadedDocNameList, setUploadedDocNameList] = useState<string[]>(
    docs?.documents ?? []
  );
  const [docList, setDocList] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    setIsLoading(true);
    if (selectedFile === undefined) {
      return;
    }
    const docRef = ref(storage, `${id}/${selectedFile.name}`);
    await uploadBytes(docRef, selectedFile);
    await updateDocumentsNameList({
      id: id,
      documents: [...uploadedDocNameList, selectedFile.name],
    });
    await setUploadedDocNameList([...uploadedDocNameList, selectedFile.name]);
    setIsLoading(false);
  };

  useEffect(() => {
    const docRef = ref(storage, `${id}/`);
    listAll(docRef).then((response: ListResult) => {
      response.items.forEach((item: StorageReference) => {
        getDownloadURL(item).then((url: string) => {
          setDocList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <Card color="transparent" shadow={false} className="items-center">
      <Typography variant="h4" className="text-lg md:text-xl" color="blue-gray">
        Please upload your training Certificates.
      </Typography>

      <input
        type="file"
        name="file"
        onChange={changeHandler}
        className="w-[20rem] mt-4"
      />

      <Button
        className="mt-6 bg-green-300 text-black md:w-[24rem]"
        fullWidth
        onClick={handleSubmission}
      >
        Upload
      </Button>

      {isLoading && <Spinner className="h-12 w-12 my-5" color="green"/>}

      {uploadedDocNameList.length > 0 && (
        <ul className="align-left">
          <Typography
            variant="h4"
            className="text-lg md:text-xl font-black my-6"
          >
            Uploaded Documents
          </Typography>
          {uploadedDocNameList.map((name: string, index: number) => (
            <li key={index} className="list-decimal">
              {name}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
export default Certification;
