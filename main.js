let $person = document.querySelector('.person')
let personURL = "https://swapi.dev/api/people/1/"
let $btn = document.querySelectorAll('button')
let item1,
    item2,
    item3

let $h3 = document.querySelectorAll('h3')



function loadData(url) {
    let server = new XMLHttpRequest()
    let response

    server.open("GET", url)
    server.send()

    server.onload = function(){
        console.log(server.status)
        if (server.status !== 200) {
            console.log(`Server error code ${server.status}. ${server.statusText}`)
        } else {
            response = JSON.parse(server.response)
            showData(response)
            console.log(response)
        }   
    }
}

function showData(obj) {
    for (key in obj) {
        if (!Array.isArray(obj[key]) && !obj[key].includes('http') && !obj[key].includes('2014')){
            if (key == "name") {
                writeName(key.replace('_',' '), obj[key], $person)
            }
            writeData(key.replace('_',' '), obj[key], $person)
        }
        else if (key === "homeworld"){
            item1 = obj[key]
        } 
        else if (key === "starships"){
            item2 = obj[key]
        } 
    }
   
}

function writeData(key, value, place){
    let html = `<b>${key}:</b> <i>${value}</i><br>`
    place.insertAdjacentHTML('beforeend', html)
}

function writeName(key, value, place){
    let html = `<h3><i>${value}</i></h3>`
    place.insertAdjacentHTML('beforeend', html)
}

for(let i = 0; i < $btn.length; i++){
    $btn[i].addEventListener('click', function() {
        switch (i){
            case 0:
                loadData(personURL)
                $btn[i].disabled = true
                break
            case 1:
                loadData(item1)
                $btn[i].disabled = true
                break
            case 2:
                for (el of item2) {
                    loadData(el)
                }
                $btn[i].disabled = true
                break
        }
    })
}

console.log(item1, item2)