function getRandomLatLng(map) {
  // get the boundaries of the map
  let bounds = map.getBounds();
  let southWest = bounds.getSouthWest();
  let northEast = bounds.getNorthEast();
  let lngSpan = northEast.lng - southWest.lng;
  let latSpan = northEast.lat - southWest.lat;

  let randomLng = Math.random() * lngSpan + southWest.lng;
  let randomLat = Math.random() * latSpan + southWest.lat;

  return [randomLat, randomLng];
}

document.querySelector('#switch-btn').addEventListener('click', function(){
    if (map.hasLayer(circleGroup) == false) {
        map.addLayer(circleGroup);
        map.removeLayer(markerClusters)
    }
})

let singapore = [1.29, 103.85];
let map = L.map("singapore-map");
map.setView(singapore, 13);

// setup tilelayer
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg"
  }
).addTo(map);

let group = L.layerGroup();

let singaporeMarker = L.marker([1.29, 103.85]);
// map.addLayer(singaporeMarker);
singaporeMarker.addTo(group);
singaporeMarker.bindPopup(
  `<div><h1>Singapore</h1>
  <img src="https://p1.hiclipart.com/preview/695/309/263/world-flag-icons-singapore-flag-art-thumbnail.jpg">
  </div>
  `
);

let circleGroup = L.layerGroup();
let circle = L.circle([1.3541, 103.7769], {
  color: "green",
  fillColor: "emerald",
  fillOpacity: 0.5,
  radius: 500
});

circle.addTo(circleGroup);


let markerClusters = L.layerGroup();
// we have to include the marker cluster JS file before we can do the following
let markerClusterGroup = L.markerClusterGroup();
for (let i=0; i<50; i++) {
    L.marker(getRandomLatLng(map)).addTo(markerClusterGroup);
}

markerClusterGroup.addTo(markerClusters)

// Layer controls
let baseLayers = {
    'Markers': markerClusters,
    'Circles': circleGroup
}

let overlays = {
    'Singapore Marker': group
}

L.control.layers(baseLayers, overlays).addTo(map);
group.addTo(map);
markerClusters.addTo(map);
circleGroup.addTo(map);

