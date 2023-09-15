'use client'
import axios from 'axios'
import Link from 'next/link'

import { useState } from 'react'

export default function Home() {
  const [userName, setUserName] = useState("")
  const [followers, setFollowers] = useState([])
  const [data, setData] = useState(null)


  const onChangeHandler = (e) => {
    setUserName(e.target.value)
    console.log(e.target.value)
  }
  const clickHandler = async () => {
    setFollowers([])
    var response = await axios.get(`https://api.github.com/users/${userName}`)
    console.log(response.data)
    setData(response.data)
  }
  const followersHandler = async () => {
    var response1 = await axios.get(data.followers_url)
    console.log(response1.data)
    setFollowers(response1.data)
  }
  return (
    <div >
      <h1 className='text-4xl text-center font-bold py-2 linear-gradient-to-r from-slate-200 to-red-500'>GitHub App</h1>
      <hr />
      <div className='flex flex-col text-center mt-5'>
        <label htmlFor="name" className='text-xl font-semibold'>Enter UserName and GetData</label>
        <input type="text" id='name' onChange={onChangeHandler} placeholder='Enter Github user' className='text-slate-700 bg-slate-200 rounded-lg px-2 mx-auto w-52 py-1 my-2 border border-black' />
        <button onClick={clickHandler} className='mx-auto bg-blue-500 w-40 text-white my-2 rounded-lg px-2 py-1 hover:bg-blue-700'>Get Data</button><br />
      </div>
      <hr />
      {data && <div className='md:mt-8 mt-5 flex content-center justify-center'>
        <img src={data.avatar_url} alt="" className='rounded-full w-36 ' />
        <div className='flex flex-col align-center my-auto px-5'><span className='text-3xl font-semibold'> {data.name}</span>
          <span className='text-xl'>Followers: {data.followers} <span className='text-xl md:relative md:left-10'>Following: {data.following}</span></span>
          <button className='text-white bg-blue-500 hover:bg-blue-700 rounded-lg px-2 py-1 my-2' onClick={followersHandler}>Get Followers</button>
        </div>
        <br />
        <hr />
      </div>}
      <div className='md:mt-8 mt-5 overflow-x-auto'>
        {followers.length > 0 && (<table className='table mx-auto border-separate'>
          <tr className='h-14 text-xl bg-gray-700 rounded-3xl'>
            <th className='md:w-40 md:pl-0 pl-5  '>Id</th>
            <th className='md:w-40 md:pl-0 pl-10 '>Avatar</th>
            <th className='md:w-40 '>Name</th>
            <th className='md:w-40 md:pl-0 pl-5'>Link</th>
          </tr>
          {followers.map((items, i) => {

            return <tr key={i} className='h-14 bg-gray-700 rounded-3xl'>
              <td className='md:w-40 pl-5 md:pl-16'>{items.id}</td>
              <td className='md:w-40  mx-auto pl-12'><img src={items.avatar_url} alt="" width={40} className='my-auto rounded-full' /></td>
              <td className='md:w-40 pl-16 pr-4'>{items.login}</td>
              <td className='md:w-40  pr-4 hover:text-blue-600'><Link href={items.html_url}>{items.html_url}</Link></td>
            </tr>
          })}
        </table>)}
      </div>
    </div>
  )
}
