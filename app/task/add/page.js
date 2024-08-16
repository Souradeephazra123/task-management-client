import CreateTask from '@/components/CreateTask'
import React from 'react'

const page = ({searchParams}) => {
  const decoded1 = decodeURIComponent(searchParams?.name);
  const decoded2 = decodeURIComponent(searchParams?.status);
  
  return (
    <div><CreateTask search={decoded1} searchStatus={decoded2}/></div>
  )
}

export default page