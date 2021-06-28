const baseURL = 'https://api.foursquare.com/v2/';
const clientID = "OWM4RWDVI1IXUTU0PGYXUBKQ0BDVLGV1VWP2N35XIJ4TYXEF";
const clientSecret = "EIIORYOHQZDTH540G4W54A0ZMNLDSAC5XYNDOFGIYOPNVGJ5";
const version = "20201903"

async function search(lat, lng, query) {
    // setup search parameters
    let ll = lat + "," + lng;
    let response = await axios.get(baseURL+'venues/search', {
        params: {
            'll': ll,
            'client_id': clientID,
            'client_secret': clientSecret,
            'v': version,
            'query': query
        }
    })
    return response.data;
}