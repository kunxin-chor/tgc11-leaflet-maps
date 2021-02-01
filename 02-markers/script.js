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

let singaporeMarker = L.marker([1.29, 103.85]);
// map.addLayer(singaporeMarker);
singaporeMarker.addTo(map);
singaporeMarker.bindPopup(
  `<div><h1>Singapore</h1>
  <img src="https://p1.hiclipart.com/preview/695/309/263/world-flag-icons-singapore-flag-art-thumbnail.jpg">
  </div>
  `
);

singaporeMarker.addEventListener('click', function(){
    alert("Hi there welcome to Singapore");
})

let circle = L.circle([1.3541, 103.7769], {
    color: 'green',
    fillColor: 'emerald',
    fillOpacity: 0.5,
    radius: 500
})

circle.addTo(map);