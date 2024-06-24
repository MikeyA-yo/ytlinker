export default function Loading({ text = "Fetching Details" }) {
  let content = text;
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p className="text-center">{content}</p>
        <div className="loader"></div>
      </div>
    </>
  );
}
