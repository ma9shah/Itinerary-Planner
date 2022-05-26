const API_URL = "http://localhost:3001/";
class ItineraryService {
  getItinerary(name, startDate, endDate, email) {
    return fetch(
      API_URL +
        "places/?" +
        new URLSearchParams({ placeName: name, startDate, endDate, email })
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new ItineraryService();
