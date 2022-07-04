// const request = require('request')

// // call back abstraction 

// // we had single reusable function geo code that return latitude and longitude of location and we can call it many time 
// // by providing address and callback funcrtion to retreive the information.
// const geocode  = (latitude , longitude , callback) => {
//     // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieGFtb3B1IiwiYSI6ImNsNDRlNXNqYTAwZ3MzY3FsYWd6dGszbGwifQ.HPnVtjJntTT8AYabTGQcUQ&limit=1'
//     const reverse_geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+latitude+','+longitude+'.json?access_token=pk.eyJ1IjoieGFtb3B1IiwiYSI6ImNsNDRlNXNqYTAwZ3MzY3FsYWd6dGszbGwifQ.HPnVtjJntTT8AYabTGQcUQ&limit=1' 
//     request({uri: reverse_geocode , json: true} , (error , response) => {
//         if(error){
//             callback('Unable to connect to location services')
//         }else if (response.body.features.length == 0){
//             callback('Unable to find location try another search')
//         }
//         else{
//             // callback(undefined , response.body.features[0].place_name)
//             // callback(undefined , response.body.features[0].center)
//             // callback(undefined , {
//             //     latitude: response.body.features[0].center[0],
//             //     longitude:response.body.features[0].center[1],
//             //     location: response.body.features[0].place_name
//             // })

//             callback(undefined , {
//                 location: response.body.features[0].place_name
//             })

//         }
//     })
// }

// module.exports = geocode


const request = require('request')

// call back abstraction 

// we had single reusable function geo code that return latitude and longitude of location and we can call it many time 
// by providing address and callback funcrtion to retreive the information.
const geocode  = (latitude , longitude , callback) => {
    // const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoieGFtb3B1IiwiYSI6ImNsNDRlNXNqYTAwZ3MzY3FsYWd6dGszbGwifQ.HPnVtjJntTT8AYabTGQcUQ&limit=1'
    const reverse_geocode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+latitude+','+longitude+'.json?access_token=pk.eyJ1IjoieGFtb3B1IiwiYSI6ImNsNDRlNXNqYTAwZ3MzY3FsYWd6dGszbGwifQ.HPnVtjJntTT8AYabTGQcUQ&limit=1' 
    request({uri: reverse_geocode , json: true} , (error , {body}) => {
        if(error){
            callback('Unable to connect to location services')
        }else if (body.features.length == 0){
            callback('Unable to find location try another search')
        }
        else{
            // callback(undefined , response.body.features[0].place_name)
            // callback(undefined , response.body.features[0].center)
            // callback(undefined , {
            //     latitude: response.body.features[0].center[0],
            //     longitude:response.body.features[0].center[1],
            //     location: response.body.features[0].place_name
            // })

            callback(undefined , {
                location: body.features[0].place_name
            })

        }
    })
}

module.exports = geocode