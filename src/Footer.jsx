export default function Footer(){
    return (
        <>
          <div className="flex items-center min-h-[30svh] sairaCondensed text-[#F6DCAC] justify-evenly mt-8">
            <div className="text-center">
               <h3 className="text-2xl text-[#FEAE6F]">YTlinker</h3>
               <p>&copy; {new Date().getFullYear()}</p>
            </div>
            <div className="text-center">
                <p className="text-xl">Youtube</p>
                <p>MP4</p>
                <p>MP3</p>
            </div>
          </div>
          <p className="text-center ubuntu text-[#F6DCAC]">&copy; All right&apos;s reserved, Ayomide, CHO inc.</p>
        </>
    )
}