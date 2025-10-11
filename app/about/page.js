'use client';
import React from 'react'
   import { useEffect, useState } from "react";
function Page() {


  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      alert("Geolocation not supported");
    }
  }, []);



  return (
    <div className='m-10 p-10'>
      <h1>My Current Location</h1>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>



  )
}

export default Page