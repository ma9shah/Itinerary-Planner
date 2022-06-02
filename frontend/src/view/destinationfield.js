import React from 'react'
import Autocomplete from "react-google-autocomplete";

const DestinationField = ({ placeName, setplaceName }) => {
    return (
        <div className="">
            <input
                type="text"
                id="placeName"
                // className="form-control form-control-lg"
                className="destinationfield"
                placeholder="Where are you going?"
                value={placeName}
                onChange={(e) => setplaceName(e.target.value)}
            />
            {/* <Autocomplete
                type="text"
                id="placeName"
                className="form-control form-control-lg"
                placeholder="Please enter the destination name"
                // value={placeName}
                onPlaceSelected={(place) => {
                    console.log(place)
                    setplaceName(place.formatted_address);
                }}
            // value={placeName}
            // onChange={(e) => setplaceName(e.target.value)}
            /> */}
        </div>

    )


}

export default DestinationField
