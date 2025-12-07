function LoaderIcon({ status }: { status: string }) {
  const color =
    status === "success"
      ? "text-green-600"
      : status === "error"
      ? "text-red-600"
      : "text-blue-600";

  return (
    <div className="w-12 h-12 grid place-items-center">
      <div
        className={`w-10 h-10 border-4 border-gray-200 border-t-current rounded-full ${
          status === "loading" ? "animate-spin" : ""
        } ${color}`}
      ></div>
    </div>
  );
}
export default LoaderIcon;