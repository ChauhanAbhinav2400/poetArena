import React from 'react'
import PoetryDetailPage from "./components/PoetryDetailPage"

const Page = ({ params }) => {

  console.log("params",params.poetryId)
  return (
    <div>
      <PoetryDetailPage/>
    </div>
  )
}

export default Page
