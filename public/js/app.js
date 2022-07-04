console.log('client side js loaded')

// we are using popular fetch api that is not part of js it is a browser based api
// which means we can use ut in all modern browsers but not accessible in node js

// our purpose is to access the data that we send in response to client

// run asyn io operation same as calling a request in nodejs
// fetch('http://localhost:3000/weather?address=London').then( (response) => {
//     // when data is available against that user then (will execute)
//     response.json().then((data)=>{
//         // this will get inside when response (string) is parsed into json
//         console.log(data) 
//     })
// })

// shown data to browser console

//to know when user click on search button we need to access that html button click...
//  to do this we need query selector and we pass stirng to it... same as in css we apply styling to element via passing element tags like header or footer and also via class
// form is html tag and document.queryselector return us javascript representation of that element and we can use it to manipulate elemet or to get to know when user interacts

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageTwo = document.querySelector('#messageTwo') // if we want to access via element than we use # at start than id
const messageOne = document.querySelector('#messageOne') // if we want to access via element than we use # at start than id
// query selector only match the first element means of we have two paragraphs P then query slector only match first p paragraph
// so we can asssign unique ids to html element 


// to know when user click button we need to add event listener ... many kinds of listener we had like hover , scrolling etc.
// so in first args we pass name of event which is submit in this case when user submit form
weatherForm.addEventListener('submit' , (e)=> {
    messageOne.textContent = "Loading"
    messageTwo.textContent = ""
    // prevent default behaviour to refresh again whole page and load it again so it allows us only the thing that we want to do in this function  
    e.preventDefault()
    // what user type in input field and store in var
    const location = search.value
   
   
    fetch('http://localhost:3000/weather?address='+ location).then( (response) => {
    // when data is available against that user then (will execute)
    response.json().then((dataWeather)=>{
        // this will get inside when response (string) is parsed into json
        if(dataWeather.error){
            messageOne.textContent = dataWeather.error
        }else{
            messageOne.textContent = dataWeather.location 
            messageTwo.textContent =  dataWeather.forecast
        }
    })
})


})

// forms is completely reloed the js ... means when we click button all js is loaded again ( refresh ) even we input in text field is also cleared whole page is refreshed


