function ErrorMessage({ message }) {
  return (
    <div className="flex justify-center items-start w-full  mt-10">
      <div className="text-red-500 text-center font-medium bg-red-200 p-2 rounded-lg">
        {message}
      </div>
    </div>
  );
}

export default ErrorMessage;
