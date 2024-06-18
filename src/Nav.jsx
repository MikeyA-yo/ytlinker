export default function Nav() {
  return (
    <div className="">
      <nav className="flex justify-evenly items-center p-8">
        <div>
          <p className="text-[#FEAE6F] lg:text-2xl md:text-2xl text-xl">
            Youtube downloader
          </p>
        </div>
        <div className="flex gap-4 text-[#F6DCAC]">
          <p>Youtube</p>
          <p>MP4</p>
          <p>MP3</p>
        </div>
      </nav>
    </div>
  );
}
