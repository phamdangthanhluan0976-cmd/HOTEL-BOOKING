import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { assets, facilityIcons, roomCommonData, roomsDummyData } from '../assets/assets';
import StartRating from '../components/StarRating';


const RoomDetails = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [checkInDate, setCheckInDate] = useState("")
    const [checkOutDate, setCheckOutDate] = useState("")
    const [guests, setGuests] = useState(1)

    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [mainImage, setMainImage] = useState("null");

    const handleBooking = (e) => {
        e.preventDefault();

        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 1500);
        const booking = {
            _id: Date.now(),
            room,
            hotel: room.hotel,
            guests,
            checkInDate,
            checkOutDate,
            totalPrice: room.pricePerNight,
            isPaid: false
        };

        const oldBookings =
            JSON.parse(localStorage.getItem("myBookings")) || [];

        oldBookings.push(booking);

        localStorage.setItem(
            "myBookings",
            JSON.stringify(oldBookings)
        );

    }

    useEffect(() => {
        const room = roomsDummyData.find(room => room._id === id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <h1 className=''>{room.hotel.name} <span>({room.roomType})</span></h1>
                <p>20% OFF</p>
            </div>

            <div className="flex items-center gap-1 mt-2">
                <StartRating />
                <p className='ml-2'>200+ Reviews</p>
            </div>

            <div className="flex items-center gap-1 mt-2 text-gray-500">
                <img src={assets.locationIcon} alt='location-icon' />
                <span>{room.hotel.address}</span>
            </div>

            <div className="flex flex-col lg:flex-row mt-6 gap-6">
                <div className="lg:w-1/2 w-full">
                    <img src={mainImage} alt="Room image" className='w-full rounded-xl shadow-lg object-cover' />
                </div>

                <div className=" grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                    {room?.images.length > 1 && room.images.map((image, index) => (
                        <img onClick={() => setMainImage(image)}
                            key={index} src={image} alt="room-image"
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && "outline-3 outline-orange-500"}`}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between mt-10">
                <div className="flex flex-col">
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    <div className="flex flex-wrap items-center gap-4 mt-3 mb-6">
                        {room.amenities.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100">
                                <img src={facilityIcons[item]} alt="item" className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
            </div>

            {
                showAlert && (
                    <div className="fixed top-5 right-5 z-50 flex items-center justify-between max-w-80 w-full bg-blue-600/70 text-white px-3 h-10 rounded-sm shadow-lg">
                        <div className="flex items-center">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M10 14.167q.354 0 .593-.24.24-.24.24-.594a.8.8 0 0 0-.24-.593.8.8 0 0 0-.594-.24.8.8 0 0 0-.593.24.8.8 0 0 0-.24.593q0 .354.24.594t.593.24m-.834-3.334h1.667v-5H9.166zm.833 7.5a8.1 8.1 0 0 1-3.25-.656 8.4 8.4 0 0 1-2.645-1.781 8.4 8.4 0 0 1-1.782-2.646A8.1 8.1 0 0 1 1.666 10q0-1.73.656-3.25a8.4 8.4 0 0 1 1.782-2.646 8.4 8.4 0 0 1 2.645-1.781A8.1 8.1 0 0 1 10 1.667q1.73 0 3.25.656a8.4 8.4 0 0 1 2.646 1.781 8.4 8.4 0 0 1 1.781 2.646 8.1 8.1 0 0 1 .657 3.25 8.1 8.1 0 0 1-.657 3.25 8.4 8.4 0 0 1-1.78 2.646 8.4 8.4 0 0 1-2.647 1.781 8.1 8.1 0 0 1-3.25.656"
                                    fill="currentColor"
                                />
                            </svg>

                            <p className="text-sm ml-2">
                                Booking created successfully!
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowAlert(false)}
                            className="active:scale-90 transition-all ml-2"
                        >
                            ✕
                        </button>
                    </div>
                )
            }

            <form onSubmit={handleBooking} className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl' >
                <div className="flex flex-col flex-wrap md:flex-row items-start md:items-start md:items-center gap-4 md:gap-10 text-gray-500">

                    <div className="flex flex-col">
                        <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                        <input
                            type="date"
                            id="checkInDate"
                            value={checkInDate}
                            onChange={(e) => setCheckInDate(e.target.value)}
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                            required
                        />
                    </div>

                    <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

                    <div className="flex flex-col">
                        <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                        <input
                            type="date"
                            id="checkOutDate"
                            min={checkInDate}
                            value={checkOutDate}
                            onChange={(e) => setCheckOutDate(e.target.value)}
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                            required
                        />
                    </div>

                    <div className="w-px h-15 bg-gray-300/70 max-md:hidden"></div>

                    <div className="flex flex-col">
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input
                            type="number"
                            id="guests"
                            min="1"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none'
                            required
                        />
                    </div>
                </div>

                <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>Check Availability</button>


            </form>

            <div className="mt-25 space-y-4">
                {roomCommonData.map((spec, index) => (
                    <div key={index} className="flex items-start gap-2">
                        <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>

                ))}
            </div>

            <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
                <p>Guests will be allocated on the ground floor according to availability. You get a comfortable Two bedroom apartment has a true city feeling. The price quoted is for two guest, at the guest slot please mark the number of guests to get the exact price for groups. The Guests will be allocated ground floor according to availability. You get the comfortable two bedroom apartment that has a true city feeling.</p>
            </div>


            <div className="flex flex-col items-start gap-4">
                <div className='flex gap-4'>
                    <img src={room.hotel.owner.image} alt="Host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                        <div>
                            <StartRating />
                            <p className='ml-2'>200+ reviews</p>
                        </div>
                    </div>
                </div>

                <button className='px-6 py-2.5 mt-4 rounded text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer'>Contact Now</button>
            </div>

        </div>
    )
}

export default RoomDetails
