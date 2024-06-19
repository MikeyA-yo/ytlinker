import { useState } from 'react'
export default function Center(){
    return(
        <>
            <div className='flex text-[#FEAE6F] justify-center items-center flex-col'>
                <div className='py-10 font-mono'>
                    <h2 className='text-2xl'>Free Online Youtube video downloader</h2>
                </div>
                <div className='bg-[#028391] m shadow-lg shadow-gray-500 rounded p-10 flex flex-col'>
                    <h2 className='mont'>Paste a Youtube URL</h2>
                    <form className='flex flex-col gap-2'>
                        <input type='search' autoComplete='off' placeholder='Paste your youtube URL' name='url' className='rounded focus:text-black focus:border-[#FEAE6F] focus:border-2 focus:outline-none ' />
                        <button type='submit' className='rounded bg-[#01204E] bg-opacity-70 hover:bg-opacity-30 p-2'>Enter</button>
                    </form>
                </div>
            </div>
        </>
    )
}