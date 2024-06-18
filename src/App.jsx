import { useState } from 'react'
import './App.css'
function App() {
  const [count, setCount] = useState(0)
  async function getDl(link){
    //working
    // const res = await fetch("http://localhost:3000/")
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
  }
  return (
    <>
      <div className='min-h-screen '>
        <div className='bg-[#028391]'>
          <p className='text-[#FEAE6F] text-2xl'>Simple Youtube downloader</p>
        </div>
      </div>
    </>
  )
}

export default App
