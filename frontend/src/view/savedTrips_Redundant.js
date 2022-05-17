import React, { useEffect, useState } from 'react'
import Itinerary from './itinerary'
import ItineraryCard from './itineraryCard'
let trips = [
    {
        "placeName": "New York, NY, USA",
        "startDate": "2022-05-05",
        "endDate": "2022-05-06",
        "routes": {
            "routes": [
                {
                    "date": "2022-05-05T00:00:00.000Z",
                    "route": {
                        "route": [
                            {
                                "place_id": "ChIJaXQRs6lZwokRY6EFpJnhNNE",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "20 W 34th St, New York, NY 10001, United States",
                                "name": "Empire State Building",
                                "type": [
                                    "tourist_attraction",
                                    "museum",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.7,
                                "user_ratings_total": 82338,
                                "startTime": 900,
                                "endTime": 1100
                            },
                            {
                                "place_id": "ChIJmQJIxlVYwokRLgeuocVOGVU",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "Manhattan, NY 10036, United States",
                                "name": "Times Square",
                                "type": [
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.7,
                                "user_ratings_total": 177992,
                                "startTime": 1109,
                                "endTime": 1309
                            },
                            {
                                "place_id": "ChIJ9U1mz_5YwokRosza1aAk0jM",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "45 Rockefeller Plaza, New York, NY 10111, United States",
                                "name": "Rockefeller Center",
                                "type": [
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.7,
                                "user_ratings_total": 144319,
                                "startTime": 1312,
                                "endTime": 1512
                            },
                            {
                                "place_id": "ChIJ4zGFAZpYwokRGUGph3Mf37k",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "New York, NY, United States",
                                "name": "Central Park",
                                "type": [
                                    "park",
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.8,
                                "user_ratings_total": 232638,
                                "startTime": 1519,
                                "endTime": 1719
                            }
                        ],
                        "ratingScore": 754628.2749999999,
                        "distanceScore": 980.75,
                        "profitScore": 2.9398140981685112
                    }
                },
                {
                    "date": "2022-05-06T00:00:00.000Z",
                    "route": {
                        "route": [
                            {
                                "place_id": "ChIJb8Jg9pZYwokR-qHGtvSkLzs",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "1000 5th Ave, New York, NY 10028, United States",
                                "name": "The Metropolitan Museum of Art",
                                "type": [
                                    "tourist_attraction",
                                    "museum",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.8,
                                "user_ratings_total": 67340,
                                "startTime": 900,
                                "endTime": 1100
                            },
                            {
                                "place_id": "ChIJPTacEpBQwokRKwIlDXelxkA",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "New York, NY 10004, United States",
                                "name": "Statue of Liberty",
                                "type": [
                                    "tourist_attraction",
                                    "park",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.7,
                                "user_ratings_total": 82366,
                                "startTime": 1120,
                                "endTime": 1320
                            },
                            {
                                "place_id": "ChIJK3vOQyNawokRXEa9errdJiU",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "Brooklyn Bridge, New York, NY 10038, United States",
                                "name": "Brooklyn Bridge",
                                "type": [
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.8,
                                "user_ratings_total": 56117,
                                "startTime": 1326,
                                "endTime": 1526
                            },
                            {
                                "place_id": "ChIJvbGg56pZwokRp_E3JbivnLQ",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "New York, NY 10018, United States",
                                "name": "Bryant Park",
                                "type": [
                                    "park",
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.7,
                                "user_ratings_total": 69238,
                                "startTime": 1542,
                                "endTime": 1742
                            }
                        ],
                        "ratingScore": 326283.1,
                        "distanceScore": 6290.25,
                        "profitScore": 2.433129460334912
                    }
                }
            ]
        }
    },
    {
        "placeName": "Chicago, IL, USA",
        "startDate": "2022-05-05",
        "endDate": "2022-05-06",
        "routes": {
            "routes": [
                {
                    "date": "2022-05-05T00:00:00.000Z",
                    "route": {
                        "route": [
                            {
                                "place_id": "ChIJu_tp4r4sDogR_dRFCX8wCc8",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "233 S Wacker Dr, Chicago, IL 60606, United States",
                                "name": "Skydeck Chicago",
                                "type": [
                                    "tourist_attraction",
                                    "museum",
                                    "point_of_interest",
                                    "store",
                                    "establishment"
                                ],
                                "rating": 4.5,
                                "user_ratings_total": 22441,
                                "startTime": 900,
                                "endTime": 1100
                            },
                            {
                                "place_id": "ChIJA5xPiqYsDogRBBCptdwsGEQ",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "201 E Randolph St, Chicago, IL 60602, United States",
                                "name": "Millennium Park",
                                "type": [
                                    "park",
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.8,
                                "user_ratings_total": 68671,
                                "startTime": 1106,
                                "endTime": 1306
                            },
                            {
                                "place_id": "ChIJ9Sszh6YsDogRUUo6zu8_TQY",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "201 E Randolph St, Chicago, IL 60602, United States",
                                "name": "Cloud Gate",
                                "type": [
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.8,
                                "user_ratings_total": 21436,
                                "startTime": 1308,
                                "endTime": 1508
                            },
                            {
                                "place_id": "ChIJ2y7xkU0rDogR3KSIsJbbrNA",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "600 E Grand Ave, Chicago, IL 60611, United States",
                                "name": "Navy Pier",
                                "type": [
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.6,
                                "user_ratings_total": 60640,
                                "startTime": 1514,
                                "endTime": 1714
                            }
                        ],
                        "ratingScore": 203110.65,
                        "distanceScore": 1001.75,
                        "profitScore": 2.6538847121187246
                    }
                },
                {
                    "date": "2022-05-06T00:00:00.000Z",
                    "route": {
                        "route": [
                            {
                                "place_id": "ChIJ-XW3X2MrDogR3_tQ3-OdBTI",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "1200 S DuSable Lake Shore Dr, Chicago, IL 60605, United States",
                                "name": "Shedd Aquarium",
                                "type": [
                                    "aquarium",
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.6,
                                "user_ratings_total": 27025,
                                "startTime": 900,
                                "endTime": 1100
                            },
                            {
                                "place_id": "ChIJV0AwM30rDogR2sd-X0cgErU",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "1400 S Lake Shore Dr, Chicago, IL 60605, United States",
                                "name": "Field Museum",
                                "type": [
                                    "museum",
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.7,
                                "user_ratings_total": 19142,
                                "startTime": 1102,
                                "endTime": 1302
                            },
                            {
                                "place_id": "ChIJlUbZ4qMsDogR3tCinMzzKUg",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "111 S Michigan Ave, Chicago, IL 60603, United States",
                                "name": "The Art Institute of Chicago",
                                "type": [
                                    "museum",
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.8,
                                "user_ratings_total": 26426,
                                "startTime": 1309,
                                "endTime": 1509
                            },
                            {
                                "place_id": "ChIJId-a5bLTD4gRRtbdduE-6hw",
                                "business_status": "OPERATIONAL",
                                "formatted_address": "1060 W Addison St, Chicago, IL 60613, United States",
                                "name": "Wrigley Field",
                                "type": [
                                    "stadium",
                                    "tourist_attraction",
                                    "point_of_interest",
                                    "establishment"
                                ],
                                "rating": 4.8,
                                "user_ratings_total": 29389,
                                "startTime": 1524,
                                "endTime": 1724
                            }
                        ],
                        "ratingScore": 120548.6,
                        "distanceScore": 3451,
                        "profitScore": 2.4276282995925142
                    }
                }
            ]
        }
    }
]
const allroutes = JSON.parse(JSON.stringify(trips));






export default function SavedTrips() {
    
    // const [isLoading, setIsLoading] = useState(1)
    // const [allTrips, setAllTrips] = useState('')

    // useEffect(() => {
    //     const MultipleTrips = async () => {
    //         const response = await fetch('http://localhost:3001/retrieveTrips', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: localStorage.getItem('email')
    //             }),
    //         })
    //         const data = await response.json()
    //         setAllTrips(data)
    //         setIsLoading(0)
    //     }
    //     void MultipleTrips()
    // }, [])
    return (
        <div className='container'>
            <br />
            <br />
            <center><h2>All Your Trips!</h2></center>
            <br />

            <div className="accordion" id="accordionExample">
                {allroutes.map((eachTrip, index) => (
                    <div className="card" key={index}>
                        
                        <div className="card-header bold btn-link btn" id="headingOne">
                            <h2 className="mb-0">
                            <button class="btn btn-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls={"collapse"+{index}}>
                                {/* <button className="h-1 btn btn-white" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> */}
                                <h5>    {eachTrip.placeName} from {eachTrip.startDate} to {eachTrip.endDate} </h5>
                                </button>
                            </h2>
                        </div>
                        <div id="collapseOne" class="collapse show m-0" aria-labelledby="headingOne" data-parent="#accordionExample">
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
