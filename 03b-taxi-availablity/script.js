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

let markerCluster = L.markerClusterGroup();
markerCluster.addTo(map)

window.addEventListener('DOMContentLoaded', async function(){
    let response = await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability');
    for (let taxi of response.data.features[0].geometry.coordinates) {
        L.marker([ taxi[1], taxi[0] ]).addTo(markerCluster);
    }
})

setInterval(async function() {
    let response = await axios.get('https://api.data.gov.sg/v1/transport/taxi-availability');
    markerCluster.clearLayers();
    for (let taxi of response.data.features[0].geometry.coordinates) {
        L.marker([ taxi[1], taxi[0] ]).addTo(markerCluster);
    }
}, 30000)