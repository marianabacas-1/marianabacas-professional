"use client"
import Login from '../components/login'

export default function Home() {
  return (
    <div className="bg-secondary min-h-screen min-w-screen flex items-center justify-center">
      <div className='p-4 w-full md:p-24 md:w-4/6'><Login /></div>
    </div>
  ) 
}
