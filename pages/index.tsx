import React from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getOptionsForVote } from './utils/getRandomPokemon'
import { trpc } from './utils/trpc'

const Home: NextPage = () => {
  const [ids, updateIds] = React.useState(() => getOptionsForVote());
  const [first, second] = ids
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {id: first}])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", {id: second}])
  const btn =`max-w-xs bg-red-800 rounded-full flex items-center justify-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`
  if(firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (select: number) => {
    // todo: fire mutation to persist changes
    updateIds(getOptionsForVote());
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center align-center-middle">
      <div className="text-2xl text-center">Which pokemon is Rounder</div>
      <div className="p-2 flex justify-center">
        <div className="border rounded p-8 flex justify-between items-center max-w-2xl">
          <div className='w-64 h-64 flex flex-col'>
            <img className='w-full' src={firstPokemon.data?.sprites.front_default} alt="" />
            <div className='text-center capitalize mt-[-2rem]'>
              {firstPokemon.data?.name}
            </div>
            <button
              type="button"
              className={btn}
              onClick={() => voteForRoundest(first)}>
                Roudner
            </button>
          </div>
          <div className='p-8'>VS</div>
          <div className='w-64 h-64 flex flex-col'>
            <img className='w-full' src={secondPokemon.data?.sprites.front_default} alt="" />
            <div className='text-center capitalize mt-[-2rem]'>
              {secondPokemon.data?.name}
            </div>
            <button
              type="button"
              className={btn}
              onClick={() => voteForRoundest(first)}>
                Roudner
            </button>
          </div>
          <div className='p-2' />
        </div>
      </div>
    </div>
  )
}

export default Home
