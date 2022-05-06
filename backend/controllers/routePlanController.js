const filterPlaces = (places = []) => {
  places.sort((x, y) => {
    if (x.rating * x.user_ratings_total < y.rating * y.user_ratings_total)
      return 1;
    if (x.rating * x.user_ratings_total > y.rating * y.user_ratings_total)
      return -1;
    return 0;
  });
  
  const finalPlaces = new Map();
  for (let i = 0, j = 0; i < places.length && j < 20; ++i) {
    if (finalPlaces.has(places[i].place_id)) continue;
    finalPlaces.set(places[i].place_id, places[i]);
    ++j;
  }
  // return finalPlaces;
  for (let [key, value] of finalPlaces) {
    console.log(key + " = " + value.name + " " + value.rating);
  }
};
const planRoutes = (places = []) => {
  const placesList = filterPlaces(places);
};
// module.exports = { planRoutes };
