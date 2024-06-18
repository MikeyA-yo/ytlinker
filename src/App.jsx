import { useState } from 'react'
import './App.css'
import Nav from './Nav'
function App() {
  const [count, setCount] = useState(0)
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
  return (
    <>
      <div className='min-h-screen '>
         <Nav />
      </div>
    </>
  )
}

export default App
