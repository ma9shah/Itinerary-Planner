import React from "react";
const DatePicker = ({ state, newState }) => {
    // console.log(state, newState)
    return (
        <div className="col-6">
            <div className="form-outline mb-4">
                <input
                    type="date"
                    id="startDate"
                    className="form-control form-control-lg"
                    placeholder="Start Date"
                    value={state}
                    onChange={(e) => newState(e.target.value)}
                />
            </div>
        </div>
    )
}


export default DatePicker