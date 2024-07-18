import { useState } from "react";
import { URL, URL_DL } from "./assets/xxy";
import Loading from "./loading.jsx";
import { Comp, Err } from "./status.jsx";
function genRandom(len) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";
  for (let i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * 62);
    res += characters.charAt(index);
  }
  return res;
}
function VideoDetails({ details }) {
  return (
    <>
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
  const [load, setLoad] = useState(false);
  const [dload, setDload] = useState(false);
  const [comp, setComp]= useState(false)
  const [err, setErr] = useState(false)
  const [errText, setErrText] = useState("Download couldn't complete")
  async function getnsetDetails(l) {
   try {
    if(l.length < 12){
      setErr(true)
      setErrText("Confirm you input the right link")
      return;
    }
    setLoad(true);
    const res = await fetch(`${URL}?link=${l}`);
    if (res.ok) setLoad(true);
    if(!res.ok){
      setErr(true)
      setErrText("Confirm you input the right link")
    }
    setErr(false)
    const data = await res.json();
    setDetails(data);
    setLoad(false);
   } catch (e) {
    setErr(true)
    setErrText("Confirm you input the right link")
   }
  }
  async function getBytes(l, f = null) {
    if(l.length < 12){
      setErr(true)
      setErrText("Confirm you input the right link")
      return;
    }
      try {
        let url = f
        ? `${URL}sizeDetails/?link=${l}&filter=${f}`
        : `${URL}sizeDetails/?link=${l}`;
      setLoad(true);
      const res = await fetch(url);
      if (res.ok) setLoad(true);
      if (!res.ok){
         setErr(true)
         setErrText("Error fetching data")
        }
      const data = await res.text();
      setSize(data);
      setLoad(false);
      } catch (e) {
        setErr(true)
        setErrText("Confirm the Link you input")
      }
  }
  async function dl(l) {
    try {
      //working ${URL_DL}
      setDload(true);
      const res = await fetch(`${URL}download?link=${l}&filter=${filter}`);
      const reader = res.body.getReader();
      const chunks = [];
      let receivedLength = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
      }
    
      const allChunks = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }
      const blob = new Blob([allChunks], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", genRandom(5) + ".mp4");
      // Append the link to the body and trigger a click to start the download
      document.body.appendChild(link);
      link.click();
      // Clean up the URL object after the download is triggered
      link.remove(); // Remove the link element from the DOM immediately
      window.URL.revokeObjectURL(url); // Release the memory
      console.log("Download initiated and URL revoked");
      setDload(false);
      setComp(true)
    } catch (e) {
      setErr(true);
      setDload(false);
    }
  }
  function checkCanDl(delim){
    if(delim.includes("GiB")){
      return parseFloat(delim) < 1;
    }else if(delim.includes("MiB")){
      return parseFloat(delim) < 1000;
    }else {
      return true;
    }
  }
  return (
    <>
      <div className="flex text-[#FEAE6F] justify-center mb-3 items-center flex-col">
        <div className="py-10 font-mono">
          <h2 className="text-2xl text-center">
            Free Online YouTube video downloader
          </h2>
        </div>
        <div className="bg-[#028391] m shadow-lg shadow-gray-500 rounded p-10 flex flex-col">
          <h2 className="mont text-center">Paste a YouTube URL</h2>
          <form className="flex flex-col gap-2">
            <input
              onChange={(e) => {
                setLink(e.target.value);
              }}
              type="search"
              autoComplete="off"
              placeholder="Paste your youtube URL"
              name="url"
              className="rounded dark:focus:text-white focus:text-black focus:border-[#FEAE6F] focus:border-2 focus:outline-none "
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
          {load && <Loading />}
          {dload && <Loading text="Download Started" />}
          {size && (
            <DownloadButton
              size={size}
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              onClick={() => {
                if (link.length > 10 && checkCanDl(size) ) {
                  dl(link);
                }else if(!checkCanDl(size)){
                  setErr(true)
                  setErrText("Consider Donating for larger files at 0124335135 GTbank")
                  alert("We don't have enough resource to download large files, consider donating")
                }
              }}
            />
          )}
          {comp && <Comp message={"Your Download has completed"} onClick={()=>{setComp(false)}} />}
          {err && <Err message={errText} onClick={()=>{setErr(false)}} />}
        </div>
      </div>
    </>
  );
}
