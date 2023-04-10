import React from 'react'

interface Props {
  count: number;
  name: string;
}

export default function VotesCard({ count, name }: Props) {
  return (
    <div className="mb-3 border-2 border-black rounded-lg text-center text-black px-24 py-10">
      <h1 className="text-2xl mb-2">
        {name}
      </h1>
      <p className="text-lg">
        {count} Pemilih
      </p>
    </div>
  )
}
