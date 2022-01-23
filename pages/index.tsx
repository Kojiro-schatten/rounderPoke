import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { trpc } from './utils/trpc'
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const {data, isLoading} = trpc.useQuery(["hello", {text: "Kojir"}])
  if(isLoading) return <div>Loading...</div>
  if(data) return <div>{data.greeting}</div>
  return (
    <div className="h-screen w-screen flex flex-col justify-center align-center-middle">
      <div className="text-2xl text-center">Which pokemon is Rounder</div>
      <div className="p-2 flex justify-center">
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <div className='w-16 h-16 bg-red-200'></div>
          <div className='p-8'>VS</div>
          <div className='w-16 h-16 bg-red-200'></div>
        </div>
      </div>
    </div>
  )
}

export default Home
