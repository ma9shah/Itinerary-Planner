import React, { useEffect, useState } from 'react'
import Itinerary from './itinerary'
import ItineraryCard from './itineraryCard'
import Loader from './loader'

// for testing the loader
const delay = ms => new Promise(res => setTimeout(res, ms));

export default function SavedTripsDynamic() {

    const [isLoading, setIsLoading] = useState(1)
    const [allTrips, setAllTrips] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            // I am sure there's a get request way to do this but I can't find a way to send the email address :()
            const response = await fetch('http://localhost:3001/retrieveTrips/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('email')
                    })
                });

            const data = await response.json()
            await delay(2000)
            setAllTrips(data.trips)
            setIsLoading(0)
        }

        // call the function
        fetchData()
            .then(() => {
                console.log("All Trips", allTrips)
            })
            // make sure to catch any error
            .catch(console.error);
    }, [])

    return (
        <div className='container'>
            <br />
            <br />
            <center><h2>All Your Trips!</h2></center>
            <br />
            {isLoading !== 0 && <Loader></Loader>}
            <div className="accordion" id="accordionExample">
                {allTrips.map((eachTrip, index) => (
                    <div className="card" key={index}>
                        <div className="card-header bold btn-link btn" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls={"collapse" + { index }}>
                                    {/* <button className="h-1 btn btn-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> */}
                                    <h5>    {eachTrip.placeName} from {eachTrip.startDate} to {eachTrip.endDate} </h5>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseOne" className="collapse show m-0" aria-labelledby="headingOne" data-parent="#accordionExample">
                            {/* <div id="collapseOne" className="collapse show m-0" aria-labelledby="headingOne" data-parent="#accordionExample"> */}
                            <div className="card card-body">
                                <br></br>

                                {/* <Itinerary routes={eachTrip.routes.routes}/> */}
                                <ItineraryCard allroutes={eachTrip.routes} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}
