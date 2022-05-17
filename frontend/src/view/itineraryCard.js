import React from 'react'

function toReadableTime(time) {
    var hrs = parseInt(time / 100);
    var t = hrs.toString();
    if (hrs < 10) t = "0" + t;
    var mins = parseInt(time % 100);
    var m = mins.toString();
    if (mins < 10) m = "0" + m;
    return t + ":" + m + " hrs";
  }

  function getNextDay(d) {
    var tomorrow = new Date(d);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toDateString();
  }

  
  export default function ItineraryCard({allroutes}) {
    // const allroutes = JSON.parse(JSON.stringify(routes));
    
    // console.log("ALL ROUTES", allroutes)
    return (
        <div className="bgcolor">
            <section className="timeline_area section_padding_130">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-sm-8 col-lg-6">
                            <div className="section_heading text-center">
                                {/* <h6>----</h6> */}
                                <h6></h6>
                                
                                <div className="line"></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className="apland-timeline-area">
                                {/* {console.log("HERE",allroutes.routes)} */}
                            {allroutes?.routes?.map((r) => (
                                    <div className="single-timeline-area" key={r.date}>
                                        <div
                                            className="timeline-date wow fadeInLeft"
                                            data-wow-delay="0.1s"
                                            style={{
                                                visibility: "visible",
                                                animationDelay: "0.1s",
                                                animationName: "fadeInLeft",
                                            }}
                                        >
                                            <p>{getNextDay(r.date)}</p>
                                        </div>
                                        <div className="row">
                                            {r.route.route?.map((place) => (
                                                <div
                                                    className="col-12 col-md-6 col-lg-4"
                                                    key={place.place_id}
                                                >
                                                    <div
                                                        className="single-timeline-content d-flex wow fadeInLeft"
                                                        data-wow-delay="0.3s"
                                                        style={{
                                                            visibility: "visible",
                                                            animationDelay: "0.3s",
                                                            animationName: "fadeInLeft",
                                                            minHeight: "150px"
                                                        }}
                                                    >
                                                        <div className="timeline-icon">
                                                            <i
                                                                className="fa fa-address-card"
                                                                aria-hidden="true"
                                                            >
                                                                {/* <img src="../assets/bg.jpg"></img> */}
                                                                {/* <img src=""></img> */}
                                                                {/* hello */}
                                                            </i>
                                                        </div>
                                                        <div className="timeline-text">
                                                            <h6>{place.name}</h6>
                                                            <p>{place.formatted_address}</p>
                                                            {/* <hr/> */}
                                                            <div className="row">
                                                                <p className="col-6">
                                                                    {toReadableTime(place.startTime)}
                                                                </p>
                                                                <p className="col-6">
                                                                    {toReadableTime(place.endTime)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
