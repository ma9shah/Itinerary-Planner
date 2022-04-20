const { Client } = require("@googlemaps/google-maps-services-js");
const client = new Client({});
const fs = require("fs");

const destinations = [];
const AllPlaces = new Map(); //Top 20 places sorted on ratings* user_rating_count
let startDate = new Date();
let endDate = new Date();
const dayItinerary = new Map();
const FinalRoutes = []; // Final route for each day
const FinalPlaces = new Map(); // Final places for the entire

async function filterPlaces(places = []) {
  // console.log(places)
  places.sort((x, y) => {
    if (x.rating * x.user_ratings_total < y.rating * y.user_ratings_total)
      return 1;
    if (x.rating * x.user_ratings_total > y.rating * y.user_ratings_total)
      return -1;
    return 0;
  });

  for (let i = 0, j = 0; i < places.length && j < 20; ++i) {
    if (AllPlaces.has(places[i].place_id)) continue;
    AllPlaces.set(places[i].place_id, places[i]);
    ++j;
  }

  for (let [key, value] of AllPlaces) {
    const response = await client.placeDetails({
      params: {
        place_id: key,
        key: process.env.API_KEY,
      },
    });
    value.opening_hours = new Map();
    if (
      response.data.result.opening_hours === undefined ||
      response.data.result.opening_hours.periods === undefined
    ) {
      for (let i = 0; i < 7; ++i) {
        const v = [];
        v.push(parseInt("0000"));
        const t = [];
        t.push(v);
        value.opening_hours.set(i, t);
      }
    } else {
      response.data.result.opening_hours.periods.forEach((p) => {
        const t = [];
        if (p.open.day < value.opening_hours.length)
          t = value.opening_hours[p.open.day];
        const v = [];
        v.push(parseInt(p.open.time));
        if (p.close !== undefined && p.open.day === p.close.day)
          v.push(parseInt(p.close.time));
        t.push(v);
        value.opening_hours.set(p.open.day, t);
      });
      if (value.opening_hours.size == 1) {
        for (let k = 1; k < 7; ++k) value.opening_hours.set(k, [[0]]);
      }
    }
  }
  // return finalPlaces;
}
async function findDistanceMatrix() {
  try {
    for (let [key, value] of AllPlaces) {
      destinations.push("place_id:" + key);
    }
    const distances = new Map();
    for (let i = 0; i < 20; i = i + 5) {
      const origin = [];
      for (let j = i; j < i + 5; ++j) origin.push(destinations[j]);
      const response = await client.distancematrix({
        params: {
          origins: origin,
          destinations: destinations,
          key: process.env.API_KEY,
        },
      });
      let l = 0;
      response.data.rows.forEach((row) => {
        distances.set(origin[l], row);
        // distances.set(destinations[l], row);
        ++l;
      });
    }
    return distances;
  } catch (error) {
    console.log("error" + error);
  }
}

const findPermutations = (routes = [], places = [], tempPlaces = [], k) => {
  if (tempPlaces.length == k) {
    routes.push([...tempPlaces]);
  } else {
    for (let i = 0; i < places.length; ++i) {
      if (tempPlaces.includes(places[i])) continue;
      tempPlaces.push(places[i]);
      findPermutations(routes, places, tempPlaces, k);
      tempPlaces.splice(tempPlaces.length - 1, 1);
    }
  }
};
const convertHours = (a, b) => {
  let hrsA = parseInt(a / 100);
  let hrsB = parseInt(b / 100);
  let minA = a % 100;
  let mins = (b % 100) + minA;
  let c = parseInt(mins / 60);
  return (hrsA + hrsB + c) * 100 + (mins % 60);
};
const getTravelTime = (distances, sourceid, destinationId) => {
  const row = distances.get("place_id:" + sourceid);
  let i = 0;
  for (i = 0; i < destinations.length; ++i) {
    if (destinations[i] === "place_id:" + destinationId) break;
  }
  let seconds = row.elements[i].duration.value;
  let minutes = Math.ceil(seconds / 60);
  let hours = Math.floor(minutes / 60);
  return hours * 100 + (minutes % 60);
};
const getDistance = (distances, sourceid, destinationId) => {
  const row = distances.get("place_id:" + sourceid);
  let i = 0;
  for (i = 0; i < destinations.length; ++i) {
    if (destinations[i] === "place_id:" + destinationId) break;
  }
  return row.elements[i].distance.value;
};
const prepareItinerary = (routePermutations, distances, d) => {
  try {
    let day = d.getDay();
    let ratingScore = 0.0,
      maxRatingScore = -1.0,
      maxDistanceScore = -1.0,
      minRatingScore = Number.MAX_VALUE,
      minDistanceScore = Number.MAX_VALUE;

    distanceScore = 0.0;
    const Itinerary = [];
    routePermutations.forEach((route) => {
      ratingScore = 0.0;
      distanceScore = 0.0;
      if (FinalPlaces.has(route[0].substring(9))) return;
      let place = { ...AllPlaces.get(route[0].substring(9)) };
      if (
        !place.opening_hours.has(day) ||
        place.opening_hours.get(day)[0] > 900
      )
        return;
      const r = [];
      place.startTime = 900;
      place.endTime = convertHours(place.startTime, 200);
      r.push(place);
      ratingScore += Math.ceil(place.rating * place.user_ratings_total);
      let i = 1;
      for (i = 1; i < route.length; ++i) {
        let prevPlace = r[r.length - 1];
        if (FinalPlaces.has(route[i].substring(9))) return;
        place = { ...AllPlaces.get(route[i].substring(9)) };
        place.startTime = convertHours(
          prevPlace.endTime,
          getTravelTime(distances, prevPlace.place_id, place.place_id)
        );
        let j = 0;
        if (!place.opening_hours.has(day)) return;
        if (place.opening_hours.get(day)[0][0] > place.startTime) return;
        if (
          place.opening_hours.get(day)[0].length > 1 &&
          place.opening_hours.get(day)[0][1] <
            convertHours(place.startTime, 200)
        )
          return;

        place.endTime = convertHours(place.startTime, 200);
        ratingScore += place.rating * place.user_ratings_total;
        distanceScore += Math.ceil(
          getDistance(distances, prevPlace.place_id, place.place_id)
        );
        r.push(place);
      }
      if (r.length !== route.length) return;
      ratingScore /= route.length;
      distanceScore /= route.length;
      maxRatingScore = Math.max(maxRatingScore, ratingScore);
      maxDistanceScore = Math.max(maxDistanceScore, distanceScore);
      minRatingScore = Math.min(minRatingScore, ratingScore);
      minDistanceScore = Math.min(minDistanceScore, distanceScore);
      const it = {};
      it["route"] = r;
      it["ratingScore"] = ratingScore;
      it["distanceScore"] = distanceScore;
      it["profitScore"] = 0.0;
      Itinerary.push(it);
    });
    console.log(minRatingScore + " " + maxRatingScore);
    for (let i = 0; i < Itinerary.length; ++i) {
      Itinerary[i].profitScore = Math.abs(
        3 *
          ((Itinerary[i].ratingScore - minRatingScore) /
            (maxRatingScore - minRatingScore)) -
          (2 * (Itinerary[i].distanceScore - minDistanceScore)) /
            (maxDistanceScore - minDistanceScore)
      );
    }
    Itinerary.sort((x, y) => {
      if (x.profitScore < y.profitScore) return 1;
      if (x.profitScore > y.profitScore) return -1;
      return 0;
    });
    return Itinerary;
  } catch (error) {
    console.log(error);
  }
};
async function planRoutes(places = [], startDate, endDate) {
  // const placesList = await filterPlaces(places);
  await filterPlaces(places);
  const distances = await findDistanceMatrix();
  const tempPlaces = destinations;
  const routePermutations = [];
  findPermutations(routePermutations, tempPlaces, [], 4);
  var d = startDate;
  let it;
  for (d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    if (!dayItinerary.has(d.getDay)) {
      dayItinerary.set(
        d.getDay(),
        prepareItinerary(routePermutations, distances, d)
      );
    }
    it = dayItinerary.get(d.getDay());
    do {
      var count = 0;
      const route = it[Math.floor(Math.random() * ((d.getDay() + 1) * 10 + 1))];
      const temp = new Map();
      for (let j = 0; j < route.route.length; ++j) {
        if (temp.has(route.route[j].place_id)) break;
        temp.set(route.route[j].place_id, route.route[j]);
        ++count;
      }
      if (count == 4) {
        for (let [key, value] of temp) FinalPlaces.set(key, value);
        const ob = {
          date: new Date(d),
          route: route,
        };
        FinalRoutes.push(ob);
      }
      if (FinalPlaces.length == 20) break;
    } while (count < 4);
  }

  // return prepareItinerary(routePermutations, distances);
  //   console.log(routePermutations.length);
}

async function getTouristPlaces(req, res) {
  destinations.length = 0;
  FinalRoutes.length = 0;
  AllPlaces.clear();
  dayItinerary.clear();
  FinalPlaces.clear();
  const set = new Set();
  const textsearch = "tourist places in " + req.query.placeName;
  startDate = new Date(req.query.startDate);
  endDate = new Date(req.query.endDate);
  var nextPageToken = "";
  const places = [];
  var i = 0;
  do {
    try {
      const response = await client.textSearch({
        params: {
          query: textsearch,
          key: process.env.API_KEY,
          pagetoken: nextPageToken,
        },
      });

      response.data.results.forEach((r) => {
        if (r.business_status === "OPERATIONAL" && !set.has(r.place_id)) {
          const obj = {
            place_id: r.place_id,
            business_status: r.business_status,
            formatted_address: r.formatted_address,
            name: r.name,
            type: r.types,
            rating: r.rating,
            user_ratings_total: r.user_ratings_total,
          };
          places.push(obj);
          set.add(r.place_id);
          // fs.appendFileSync("test.txt", obj.place_id + " " + obj.name + "\n");
        }
      });

      nextPageToken = response.data.next_page_token;

      i++;
    } catch (error) {
      //   console.log("error" + error);
    }
  } while (nextPageToken !== "" && i < 4);

  // const routes = await planRoutes(place, startDate, endDate);
  // const r = [];
  // routes.forEach((route) => r.push(route));
  await planRoutes(places, startDate, endDate);
  res.status(200).send(FinalRoutes);
}

module.exports = { getTouristPlaces };
