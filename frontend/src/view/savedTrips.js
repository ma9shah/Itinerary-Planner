import React, { useEffect, useState } from 'react'
import Itinerary from './itinerary'
import ItineraryCard from './itineraryCard'
import Loader from './loader'
import NavBar from './NavBar'
// for testing the loader
const delay = ms => new Promise(res => setTimeout(res, ms));

export default function SavedTripsDynamic() {

    const [isLoading, setIsLoading] = useState(1)
    const [allTrips, setAllTrips] = useState([])
    const [noTrips, setNoTrips] = useState('Still loading!')

    useEffect(() => {
        const fetchData = async () => {
            // I'm sure there's a GET request way to do this but I can't find a way to send the email param
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
            // await delay(2000)
            if (data.trips) {
                setAllTrips(data.trips)
                setNoTrips(false)
            } else {
                setNoTrips(true)
            }
            setIsLoading(0)
        }

        fetchData()
            .then(() => {
                console.log("All Trips", allTrips)
            })
            .catch(console.error);
    }, [])

    return (
        <>

            <NavBar></NavBar>
            {noTrips && (
                //TODO: Center message on the page
                <h3>
                    You don't have any trips saved!
                </h3>

            )}

            {!noTrips && (<div className='container '>
                <br />
                <br />
                <center><h2>All Your Trips!</h2></center>
                <br />
                {isLoading !== 0 && <Loader></Loader>}
                <div className="accordion border-0" id="accordionExample">
                    {allTrips.map((eachTrip, index) => (
                        <div className="card" key={index} id={index}>
                            <div className="card-header bold btn-link btn border-0" id="headingOne">
                                <h2 className="mb-0">
                                    <button className="btn btn-white border-0" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls={"collapse" + { index }}>
                                        <h5>    {eachTrip.placeName} from {eachTrip.startDate} to {eachTrip.endDate} </h5>
                                    </button>
                                </h2>
                            </div>
                            <div id="collapseOne" className="collapse show m-0 border-0" aria-labelledby="headingOne" data-parent="#accordionExample">
                                <div className="card card-body border-0">
                                    <br></br>
                                    <ItineraryCard allroutes={eachTrip.routes} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>)}
        </>

    )
}
