import { useState } from "react";

function Bar({ onClick }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6 text-[#F6DCAC]"
        onClick={onClick}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  console.log(open);
  return (
    <div className="flex flex-col">
      <nav className="flex justify-evenly items-center p-8">
        <div>
          <p className="text-[#FEAE6F] lg:text-2xl md:text-2xl text-xl">
            Youtube downloader
          </p>
        </div>
        <div className="lg:flex md:flex hidden gap-4 text-[#F6DCAC]">
          <p>Youtube</p>
          <p>MP4</p>
          <p>MP3</p>
        </div>
        <div className="lg:hidden md:hidden flex">
          <Bar
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
      </nav>
      {open && (
        <div className="lg:hidden md:hidden w-full items-center flex flex-col gap-4 text-[#F6DCAC]">
          <p>Youtube</p>
          <p>MP4</p>
          <p>MP3</p>
        </div>
      )}
    </div>
  );
}
