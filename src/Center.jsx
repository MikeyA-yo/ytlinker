import { useEffect, useState } from "react";
import { URL } from "./assets/xxy";
function VideoDetails({ details }) {
  return (
    <>
      {!details && <p>Loading....</p>}
      {details && (
        <>
          <h3 className="mont text-center pt-10">Details</h3>
          <div className="bg-[#028391]  bg-opacity-10 flex flex-col-reverse items-center justify-center gap-4 lg:flex-row md:flex-row p-2 max-w-full">
            <img
              src={
                details.image[details.image.length - 1].url ??
                "/assets/react.svg"
              }
              alt="image of yt video"
              className="h-24 w-24 rounded-full"
            />
            <div className="h-full flex flex-col gap-1 items-center justify-center">
              <p>{details.title}</p>
              <p className="text-sm sairaCondensed">{details.timestamp}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
function DownloadButton({ size, onClick, onChange }) {
  return (
    <>
      <div className="bg-[#028391] mt-4 flex gap-1 lg:flex-row md:flex-row   justify-center  bg-opacity-20">
        <button onClick={onClick} className="h-12 bg-[#028391]">
          Download
        </button>
        <select onChange={onChange} className="h-12 bg-[#028391] rounded">
          <option value={`mp4`}>MP4 {size}</option>
          <option value={`mp3`}>MP3 {size}</option>
        </select>
      </div>
    </>
  );
}

export default function Center() {
  const [link, setLink] = useState("");
  const [details, setDetails] = useState();
  const [size, setSize] = useState("");
  const [filter, setFilter] = useState("mp4");
  const [download, setDownload] = useState(false);
  async function getnsetDetails(l) {
    const res = await fetch(`https://ytlinker-backend.onrender.com/?link=${l}`);
    const data = await res.json();
    setDetails(data);
  }
  async function getBytes(l, f = null) {
    let url = f
      ? `${URL}sizeDetails/?link=${l}&filter=${f}`
      : `${URL}sizeDetails/?link=${l}`;
    const res = await fetch(url);
    const data = await res.text();
    setSize(data);
  }
  async function getDl(l) {
    //working
    // const res = await fetch(`http://localhost:3000/download?link=${l}`)
    // const blob = await res.blob()
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.setAttribute('download', "tailwindconfig");
    // // Append the link to the body and trigger a click to start the download
    // document.body.appendChild(link);
    // link.click();
    // // Clean up the URL object after the download is triggered
    // link.onload = () => {
    //   window.URL.revokeObjectURL(url); // Release the memory
    //   console.log('Download completed');
    // };
    // console.log(res,blob, url)
    //bg-[#028391]
  }

  return (
    <>
      <div className="flex text-[#FEAE6F] justify-center items-center flex-col">
        <div className="py-10 font-mono">
          <h2 className="text-2xl text-center">
            Free Online Youtube video downloader
          </h2>
        </div>
        <div className="bg-[#028391] m shadow-lg shadow-gray-500 rounded p-10 flex flex-col">
          <h2 className="mont">Paste a Youtube URL</h2>
          <form className="flex flex-col gap-2">
            <input
              onChange={(e) => {
                setLink(e.target.value);
              }}
              type="search"
              autoComplete="off"
              placeholder="Paste your youtube URL"
              name="url"
              className="rounded focus:text-black focus:border-[#FEAE6F] focus:border-2 focus:outline-none "
            />
            <button
              onClick={(e) => {
                getnsetDetails(link);
                getBytes(link, filter);
                e.preventDefault();
              }}
              type="submit"
              className="rounded bg-[#01204E] bg-opacity-70 hover:bg-opacity-30 p-2"
            >
              Enter
            </button>
          </form>
        </div>
        <div>
          {details && <VideoDetails details={details} />}
          {size && (
            <DownloadButton
              size={size}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              onClick={(e) => {
                setDownload(true);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
