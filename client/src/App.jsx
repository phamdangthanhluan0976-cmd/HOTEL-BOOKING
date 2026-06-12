/* eslint-disable no-constant-binary-expression */
import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import AllRoom from './pages/AllRoom'
import RoomDetails from './pages/RoomDetails'
import MyBooking from './pages/MyBooking'
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import ListRoom from './pages/hotelOwner/ListRoom'
import Dashboard from './pages/hotelOwner/Dashboard'
import Addroom from './pages/hotelOwner/Addroom'


const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner")
  return (
    <div>
      {!isOwnerPath && <Navbar />}
      {false && <HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRoom />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<Addroom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>

      </div>
      <Footer />
    </div>
  )
}

export default App
