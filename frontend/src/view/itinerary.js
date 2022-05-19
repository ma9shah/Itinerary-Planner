import React from "react";
import ItineraryCard from "./itineraryCard";
import fileDownload from 'js-file-download'


export default function Itinerary(routes) {
  console.log("From Itinerary.js", routes)

  async function handleTripSave(e) {
    console.log("HandleTripSave invoked")
    e.preventDefault()
    const response = await fetch('http://localhost:3001/saveTrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: localStorage.getItem('startDate'),
        endDate: localStorage.getItem('endDate'),
        placeName: localStorage.getItem('placeName'),
        email: localStorage.getItem('email'),
        routes: routes
      }),
    })

    const data = await response.json()
    console.log(data)
  }

  async function handleCalendarDownload(e) {
    console.log("HandleCalendar invoked")
    e.preventDefault()
    const response = await fetch('http://localhost:3001/generateCalendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        routes: routes.routes
      }),
    })
    let data = await response.blob()
    fileDownload(data, `${localStorage.getItem('placeName')}_trip.ics`)
    // const file = await response.blob()
    // fileDownload(file)
    // console.log(file)


  }

  const allroutes = JSON.parse(JSON.stringify(routes));
  // console.log(allroutes)
  return (
    <div>
      <br></br>
      <h3 className="section_heading text-center">Itinerary for your trip to {localStorage.getItem('placeName')}!</h3>
      <br></br>
      <ItineraryCard allroutes={allroutes}></ItineraryCard>
      <form onSubmit={handleTripSave}>
        <button type="submit" className="section_heading text-center btn btn-warning p-2">Save this trip!</button>
      </form>
      <br></br>
      <form onSubmit={handleCalendarDownload}>
        <button type="submit" className="section_heading text-center btn btn-warning p-2">Export to Calendar</button>
      </form>
    </div>
  );
}
