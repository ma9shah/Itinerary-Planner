class Location {
  constructor(lat, long) {
    this.lat = lat;
    this.long = long;
  }
  setLat(lat) {
    this.lat = lat;
  }
  getLat() {
    return this.lat;
  }
  setLong(long) {
    this.long = long;
  }
  getLong(long) {
    return this.long;
  }
}
module.exports = Location;
