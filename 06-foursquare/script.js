function main() {
    let map;

    function init() {
        map = initMap();
        let searchResultLayer = L.layerGroup();
        window.addEventListener('DOMContentLoaded', () => {

            document.querySelector('#toggle-search-btn').addEventListener('click', async ()=>{
                let currentDisplay = document.querySelector("#search-container").style.display;
                if (! currentDisplay || currentDisplay == 'none') {
                    document.querySelector("#search-container").style.display="block";
                } else {
                    document.querySelector("#search-container").style.display="none";
                }
                
            })

            document.querySelector('#search-btn').addEventListener('click', async ()=>{
                let query = document.querySelector('#search-input').value;
                let center = map.getBounds().getCenter();
                let results = await search(center.lat, center.lng, query);
                let searchMarkers = [];

                // remove results from the previous search
                searchResultLayer.clearLayers();

                let searchResultDiv = document.querySelector('#search-results');

                for(let eachVenue of results.response.venues) {
                    // create a marker for each location
                    addSearchResultToMap(map, searchResultLayer, searchResultDiv, eachVenue, searchMarkers);

                }

                // display the search result layer if it is not displayed
                if (!map.hasLayer(searchResultLayer)) {
                    map.addLayer(searchResultLayer);
                }
            })
        })
    };

    init();
}

function initMap() {
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

    return map;
}

main();