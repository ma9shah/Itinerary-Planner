import React from 'react'
import Autocomplete from "react-google-autocomplete";

const DestinationField = ({ placeName, setplaceName }) => {
    return (
        <div className="form-outline mb-4">
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
            <input
                type="text"
                id="placeName"
                className="form-control form-control-lg"
                placeholder="Please enter the destination name"
                value={placeName}
                onChange={(e) => setplaceName(e.target.value)}
            />
        </div>
    )
}

export default DestinationField
