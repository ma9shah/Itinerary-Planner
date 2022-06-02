import React from "react";
import { useState, useEffect } from "react";
import ItineraryService from "../services/itineraryService";
import DatePicker from "./datepicker";
import Itinerary from "./itinerary";
import Loader from './loader';
import DestinationField from "./destinationfield";
import CalenderExport from "./calenderexport";

import NavBar from "./NavBar";
import '../styles/mainPage.css'

const MainPage = () => {
  const [placeName, setplaceName] = useState("");
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [routes, setroutes] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(startDate)
    if (startDate > endDate) {
      console.log("End date can not be before the start date!")
      return
    }

    setisLoading(true);
    ItineraryService.getItinerary(placeName, startDate, endDate, localStorage.getItem('email'))
      .then((data) => {
        setroutes(data);
        console.log("HERE!", routes);
        localStorage.setItem('placeName', placeName)
        localStorage.setItem('endDate', endDate)
        localStorage.setItem('startDate', startDate)
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setisLoading(false);
    setisLoaded(true);
  }, [routes]);

  useEffect(() => {
    setisLoading(false);
    setisLoaded(false);
  }, []);

  return (
    
    <div className="grid-container">

      <NavBar></NavBar>

      <section className="main-area">
        <section className="tagline">
          Discover Your Life, Travel Where You Want!
        </section>

        <section className="mainform-outer">
          <div className="mainform-inner">
            <div className="destinationfield">
            <label className="searchLabel">
              Location
              </label>
              <br />
              <DestinationField setplaceName={setplaceName} placeName={placeName}></DestinationField>

              {/* <input type="text" placeholder="Where are you going?" className="destinationfield" /> */}
            </div>
            {/* </section> */}

              <div className="date-picker-outer">
                {/* <DatePicker state={startDate} newState={setstartDate}></DatePicker> */}
                <label className="searchLabel">
                  Start Date
                </label>
                <br/>
                <DatePicker value={startDate} state={startDate} newState={setstartDate}></DatePicker>
                {/* <input type="date" name="" id="" className="datepicker-inner"/> */}
              </div>

              <div className="date-picker-outer">
                <label className="searchLabel">

                  End Date
                </label>
                <br />
                <DatePicker state={endDate} newState={setendDate}></DatePicker>
                {/* <input type="date" name="" id="" className="datepicker-inner"/> */}
              </div>
            <div>
              <button className="searchicon"> GO! </button>
            </div>
          </div>

        </section>
      </section>
    
      {/* <section className="main-footer">
        <img src={require('../assets/carimage.jpg')} className="footer-image" alt="" srcset="" />
      </section> */}
    

{/* 
      {!isLoaded && !isLoading && (
        // <section className="h-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card-body p-md-5 text-black">
                <h3 className="mb-5 text-uppercase text-center">
                  Itinerary Planner
                </h3>
                <DestinationField setplaceName={setplaceName} placeName={placeName}></DestinationField>

                <div className="row">
                  <DatePicker state={startDate} newState={setstartDate}></DatePicker>
                  <DatePicker state={endDate} newState={setendDate}></DatePicker>
                </div>

                <div className="d-flex justify-content-center pt-3">
                  <button
                    type="button"
                    className="btn btn-warning btn-lg ms-2"
                    disabled={(placeName && endDate && startDate && startDate <= endDate) ? false : true}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Get Itinerary
                  </button>
                </div>
                <br />
                <center>{startDate && endDate && startDate > endDate && <h4 className="">End Date must be after the Start Date</h4>}</center>
              </div>
            </div>
          </div>
        </div>
      )} */}

        
      {isLoading && !isLoaded && <Loader></Loader>}
      {isLoaded && !isLoading && (
        <>
          <Itinerary routes={routes}></Itinerary>
          <CalenderExport routes={routes}></CalenderExport>
        </>
      )}
    </div>
  );
};
export default MainPage;