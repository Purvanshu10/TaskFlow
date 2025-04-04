import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-purple-900 shadow-md w-full">
    <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
      {/* <!-- Logo --> */}
      <div className="text-white text-xl font-bold">
        TaskFlow
      </div>
      
      {/* <!-- Navigation Links --> */}
      <div className="flex space-x-6">
        <a href="#" className="text-white hover:font-bold transition duration-200">Home</a>
        <a href="#" className="text-white hover:font-bold transition duration-200">Your Tasks</a>
      </div>
    </div>
  </nav>
  )
}

export default Navbar
