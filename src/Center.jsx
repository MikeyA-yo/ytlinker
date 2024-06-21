import { useEffect, useState } from 'react'
function VideoDetails({details}){
    //   async function getnsetDetails(){
    //     const res = await fetch(`http://localhost:3000/?link=${l}`)
    //     const data = await res.json()
    //     setDetails(data)
    //   }
    //   getnsetDetails()
    // if(details) console.log(details, details.image[details.image.length - 1].url )
    return (
        <>
        {!details && <p>Loading....</p>}
            {details && (
                <>
                    <h3 className='mont text-center pt-10'>Details</h3>
                    <div className='bg-[#028391]  bg-opacity-10 flex flex-col-reverse items-center justify-center gap-4 lg:flex-row md:flex-row p-2 max-w-full'>
                        <img src={details.image[details.image.length - 1].url ?? "/assets/react.svg"} alt='image of yt video' className='h-20 w-20 rounded-full' />
                        <div className='h-full flex flex-col gap-1 items-center justify-center'>
                            <p>{details.title}</p>
                            <p className='text-sm sairaCondensed'>{details.timestamp}</p>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default function Center(){
    const [link, setLink]= useState("")
    const [details, setDetails] = useState();
       async function getnsetDetails(l){
        const res = await fetch(`http://localhost:3000/?link=${l}`)
        const data = await res.json()
        setDetails(data)
      }
    async function getDl(l){
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

    return(
        <>
            <div className='flex text-[#FEAE6F] justify-center items-center flex-col'>
                <div className='py-10 font-mono'>
                    <h2 className='text-2xl text-center'>Free Online Youtube video downloader</h2>
                </div>
                <div className='bg-[#028391] m shadow-lg shadow-gray-500 rounded p-10 flex flex-col'>
                    <h2 className='mont'>Paste a Youtube URL</h2>
                    <form className='flex flex-col gap-2'>
                        <input 
                         onChange={(e)=>{
                            setLink(e.target.value)
                         }}
                        type='search' autoComplete='off' placeholder='Paste your youtube URL' name='url' className='rounded focus:text-black focus:border-[#FEAE6F] focus:border-2 focus:outline-none ' />
                        <button 
                         onClick={(e)=>{
                            getnsetDetails(link)
                            e.preventDefault()
                        }}
                        type='submit' className='rounded bg-[#01204E] bg-opacity-70 hover:bg-opacity-30 p-2'>Enter</button>
                    </form>
                </div>
                <div>
                  {details && <VideoDetails details={details} />}
                </div>
            </div>
        </>
    )
}