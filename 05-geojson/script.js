let singapore = [1.29, 103.85];
let map = L.map('singapore-map');
map.setView(singapore, 13);

// setup tilelayer
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
}).addTo(map);


window.addEventListener('DOMContentLoaded', async ()=>{
    let response = await axios.get('dengue.geojson');
    let layer = L.geoJson(response.data, {
        onEachFeature: function(feature, layer) {
            console.log(feature);
            let divElement = document.createElement('div');
            divElement.innerHTML = feature.properties.Description;
            let locality = divElement.querySelector('td').innerHTML;
            let cases = divElement.querySelectorAll('td')[1].innerHTML;
            
            layer.bindPopup(`<div>
            <h1>${locality}</h1>
            <h2>Cases: ${cases}</h2>
            <div>`);
        }
    });
    layer.addTo(map);
    layer.setStyle({
        'color':'red',
        'fillColor':'purple'
    })

     let response2 = await axios.get('southwest.geojson');
     let layer2 = L.geoJson(response2.data, {
        onEachFeature: function(feature, layer) {
           layer.bindPopup(feature.properties.Description)
        }
    });
    layer2.addTo(map);
    layer2.setStyle({
        'color':'blue',
        'fillColor':'orange'
    })
    
})