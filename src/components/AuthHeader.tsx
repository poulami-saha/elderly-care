import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const AuthHeader: React.FC<{
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}> = ({ heading, paragraph, linkName, linkUrl = "#" }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img
          alt=""
          className="h-14 w-14"
          src={logo}
        />
      </div>
      <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-gray-900">
        {heading}
      </h2>
      <p className="text-center text-sm text-gray-600 mt-5">
        {paragraph}{" "}
        <Link
          to={linkUrl}
          className="font-medium text-green-600 hover:text-green-500 cursor-pointer"
        >
          {linkName}
        </Link>
      </p>
    </div>
  );
};

export default AuthHeader;