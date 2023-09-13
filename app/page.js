'use client'
import axios from 'axios'
import Link from 'next/link'

import { useState } from 'react'

export default function Home() {
  const [userName, setUserName] = useState("")
  const [followers, setFollowers] = useState([])
  const [data, setData] = useState([])


  const onChangeHandler = (e) => {
    setUserName(e.target.value)
    console.log(e.target.value)
  }
  const clickHandler = async () => {
    var response = await axios.get(`https://api.github.com/users/${userName}`)
    console.log(response.data)
    setData(response.data)
  }
  const followersHandler=async()=>{
    var response1=await axios.get(`https://api.github.com/users/${userName}/followers`)
    console.log(response1.data)
    setFollowers(response1.data)
  }
  return (
    <div >
      <div >
        <h1 className='text-3xl text-center'>Form</h1>
        <label htmlFor="name">Enter Name:</label>
        <input type="text" id='name' onChange={onChangeHandler} placeholder='Please Enter your Name' className='border border-black' /> <button onClick={clickHandler} className='bg-slate-600 text-white my-2 rounded-lg px-2 py-1 hover:bg-slate-400'>Search</button><br />
      </div>
      <div className='md:mt-20 mt-10 flex content-center justify-center'>
        <img src={data.avatar_url} alt="" className='rounded-full w-24 md:w-40 ' />
        <div className='flex flex-col align-center my-auto px-5'><span className='text-xl font-semibold'> {data.name}</span>
          <button className='text-white bg-slate-600 hover:bg-slate-400 rounded-lg px-2 py-1' onClick={followersHandler}>Get Followers</button>
        </div>
      </div>
      <div className='md:mt-20 mt-10'>
        <table className='mx-auto overflow-x-scroll'>
          <tr>
            <th className='md:w-40'>Id</th>
            <th className='md:w-40'>Name</th>
            <th className='md:w-40'>Avatar</th>
            <th className='md:w-40'>Bio</th>
          </tr>
          {followers.map((items,i)=>{
            
            return <tr key="i">
              <td className='md:w-40 relative left-6 md:relative md:left-14'>{items.id}</td>
              <td className='md:w-40 relative left-14 md:relative md:left-14'>{items.login}</td>
              <td className='md:w-40 relative  md:relative md:left-14'><img src={items.avatar_url} alt="" width={60} className='rounded-full' /></td>
              <td className='md:w-40 relative left-14 md:relative md:left-14'><Link href={items.html_url}>{items.html_url}</Link></td>
            </tr>
          })}
        </table>
      </div>
    </div>
  )
}
