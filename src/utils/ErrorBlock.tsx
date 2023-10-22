const ErrorBlock: React.FC<{ title: string; message: string }> = ({
  title,
  message,
}) => {
  return (
    <div className="mx-auto p-3 flex bg-red-200 items-center max-w-[940px] md:my-4 sm:rounded-b-xl md:rounded-xl shadow-md shadow-red-500/50">
      <div className="text-3xl w-[3rem] h-[3rem] bg-red-200 rounded-xl flex justify-center items-center">
        !
      </div>
      <div className="error-block-text">
        <h2 className="text-xl my-2">{title}</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};
export default ErrorBlock;
