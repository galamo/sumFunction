const colors = ["red", "green", "yellow", "Blue"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
const DOM = {}

const displayFunctions = {
    "cards": getCardItem,
    "list": getListItem,
    "table": getRowItem,
};
const cardsImages = {
    "BMW": "https://i.pinimg.com/originals/6e/de/9a/6ede9a835035ba5d9d43c510e63cfb5d.jpg",
    "MRCDS": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHEhMSBxMWFRUXFxsbGBUXFRcaFhgfGhkXGhoYGBgZHSggGRolGxgVJTEiJSkrLi8uFyEzODMsNygtLiwBCgoKDg0OGBAQGy0ZHSUrKy0tLSsrLSsrLS0tKzctLSstKy0tLSstLS0tLi0tLS0rLS0rLS0tLS0rLS0tLS0tK//AABEIALwBDAMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABQYHBAMCAQj/xABHEAACAQICBQgFCAgEBwAAAAAAAQIDBAURBhIhMUEHIlFhcYGRoRMyQlKxFCMzYnKCksEVQ1OissLR0iQ1s+EWJTRjo+Lw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAIB/8QAHREBAAICAwEBAAAAAAAAAAAAAAERAjESIVFBQv/aAAwDAQACEQMRAD8A3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHhO7oQ459S2/DceUr+K3Rl5L8wOwEc8Snwgvx/+ojikfag+5p/0AkQccMStpes3HtWzxWw6oThU202n2MD6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+SlGCzk8kuJD4titC0g53ktSmunY5dvU+je/IDvq3a3UdvX7K7+PcVvHNKsMw/NXVT0k/2cNuXas8l95le/SGPaZSdPBU6NBbHUecfNfwrb0stOA6EYThGUqkfS1OM6iTWf1Y7l5s2q2m5nSvQx7STF/8AJLXVhwnJbPF5R+J7x0a0uu9t1cxh1KT/AJYr4l/SS3H6LKZhpBhF9glGpUr3VWpOKi1lOaW17d8tpJx0TxzJStrzWTWa1pVOPbme+njdWhXz3a0Uu7Uz82yw6L1/lNpby6aUfJJfkbfRXap1bXSvD/XjGsuxSf7uUvJnnb6SQpSyvYzoy4y2uK7Wtq71kaIcl/htniCyu4J9ftLse8yykZY47rJOplOL3Tjk/hsfcTVGtTrrWotNdKKNieid7hLdXAJZre6b2xf2orf2xyZ44Nj03J+izp1V61KW5rpj70evehRfrQwcWGYlRxGOdLY160XvX9V1naYoAAAAAAAAAAAAAAAAAAAAAAAAAOPEKygtVvJZZy7Ojte7xA4MbxahZQlUuXlCO1fWa49azyyXF5dRScJwu+06q+nxNyhaxfNjnk5dnX0vuR+VoVtNb30NNtUKTzm11PLJPxS+8zTba3pWsIwt0oxikkluSRWk7LW2oWcFC1ioxislFLJI9QCVAB8V6ioxlKXBN+CzApml3Otaj6Zt/wDkSO7k2rurYU098JVI/vya8mjg0nhKnYxU96jDPt14ZnzyU11KjcU/dq55dUor80yvifq8gAlQVjSrRalii9JZfN1o7YyjsefV1/HzLOATDLsKxW6pTeutS4pevHdGa95L3XszXB7ezRcKxCjidNVKPZKPGL4plW5QcAqVYq8wvZWpbXl7S4prist6/wByI0Vx+nbzhWp/Q1sozjn9HLdt+y33xkmVtETUtMABKwAAAAAAAAAAAAAAAAAAAAB+NpbWUfTrF52lF+iz16j2dWeer4JN9uRcb6WUcl7Ty8d/lmZ1Wp/p7FKVPfCnz5dGzJ+aVPxNhOS26D4JHBLWEZLnzynPpza2R7ls8SwAGKAAAOPGJqFGpnxWX4nkvidhGY9z4Qh71SP7vP8A5QILTRZWr7Ifx0yD5LKupc3MPehCX4XJfzFg06WVvUy6I/6lMpugFx6DEoxf6yE4+C1v5WVGkTtrwAJWAAD8lFSTUtzMcxaw/QV9VtZfRXC9JSXDX25Lv50e+JshnnLNZT+TUru22VLerF59Tf5S1Ssdpy0sehGJvErZKp69N+jl0vJLVffFrzLAZvoDiCjeNR2QuaKqRXDPZNJfdnJfdNIMnbcZ6AAY0AAAAAAAAAAAAAAAAAAEZjdZ0o7OEZS70sl8WVLk8oelurus9y5i7HJ/lFHlyrY3Ww+rYUKH6+vCMn9VVIZrzR38mC+buH01F8M/zKrpP1dgASoAAAisWlrVbeHXKXgox/nOm/xCFplGC15vdBfFv2V1+GZyUMLq15KrfyfpPZ1dih1RXR2558egMRmnO2hV7I/6lMzPArpW2JWr/wC4l+JOP5mq6TWNW+pTpwlDWkklm8v1lN//AHaukg8H5PrC2l6W+k6tXentjGL6YpPeult9OwqJqEzEzK+gh6OIVrBqGKbY8K35TS3fa3dOXGYTz3ErAAAIXTSz+X2F3TW90Z5dqi3HzSJo8byKnTmnxi/gwSwvQbEJf8sqN+rW9C31a7SX4asfA3owOOFT0e9FTluV/CUPsydu18Gb4VkjAABKwAAAAAAAAAAAAAAAAAAZVy10tSvhVV7o3CWf3qcvyZPcm0lTld03vjOLy/Ev5Tl5bbCV3h8alL1qNaM8+hNSi34yT7jj0Dv18v1t0bq3U19rZPLwnPwL/KP000A+ak4U03UaSW9vciFvojri+qV26eG7ZLZKfsw/ul8PI/JyrYhuzp0uL3Sn2e7HzZWdINPMJwFOlhqVSa2ZRfNj2yNiGTKz0qNphMZTuZLPfKcntfS22UXSflNpUs4YIlJ/tH6i7Fvl5LtM7x/SjEsenldSc23zaUE8u6K2yZI4NybaS45tukran01Ns32U08/HIqMYjaJymdIWrjtzi1StG9m6jnSyzfVVpT5qWyK5u5E9o3yhYrgrUMQzr0+t/OLsk/W7H4ovmC8k2jmGxfyjXrVGsnUlJxy+zGLyXmQukHJPV2ywWqpLhTqbJd01sfekbcSzjlHa6YFpJhOkcP8ABzUtnOg9ko8Nqe3vOqEbjCv+nTnS40/ah1w6vq+GXH+fr/CsY0cqJ3UKlGS9WW7wktjLrotyo1qGVPH1rR/axW1fait/d4GTj4qMvWw21xSuoqVB5p8fya4PqPUr9jcW1+vlGBVIvPfk84T6pLg+veiWs72FzmmnGa9aD3rrXSutELdR4X0tWnUf1JfBnucOMT1abS9pqPjtfkmBl2mKc7qwpR3yuqXk6X+5r5kip/pXHbWnF5qjGVaXVlnq/wAcDWyp+Jx+gAJUAAAAAAAAAAAAAAAAAADhxzD4Yrb1qFXdUhKPitj8cjFcHuLnD4U5T+ksa+rJcXDNvw21F3I3gzDTjCo4RefKkvmbiPo62zc37fc1F93WVjKMo+tGjfUJwhUpvWU0nDLa5ZrNZLsK9pFpLhuDc7F5qU1tjbwebXXLr63sKlh9fHK8o4bgkqdBwhzq9STlOUc91JdGT3LLdvRYMH5M8GtXr4s5XVTe3UfMz+wt/wB5sVENuZ0pGI6TaT6bSdPBaU/R7tWnsivt1Xku7MlcD5Ja9XKWkNbJfsqO/sdR/ku81ajRpUEo0IqMVuUUkl2JH2OXhx9ROB6NYPgMcsLoxg+Mss5vtm9r8SWAJUAADzr0KNzFxuIqUXvUkmn3Mo2P8lmCYjnLDs7eb93nU/wPd3NF9BsTTJiJYRcaKaYaGzdXDs5xW+dHOUWvr09/k+0smj3KPYYlq08eXoKsd1VbI5/GPY9hqZBY9ohgePf5hRjrftI82f4lv78zbvaeNad1nfa2qrhp5+rUj6k/6Pq8CP0gu4Qb13lGnFtvobWb8I7e8qctE8e0S26P3Ea1FySdvX45vdFrZnlxWW7MiuUTFbmVOjYWCyubpqLgpOWqpPJ87e1nsz6ExXbZnpIcj9tLEq17iVVfSTdKn9mL1nl36q+6agRmjWD0cAtaNtb7qcEm/eftS73m+8kzJm5bjFQAAxoAAAAAAAAAAAAAAAAAABxYvh1HFKUqVdZprzO0AZFWsbuznGmm416DzoT9+Mf1bfGSXijRNGMfo45Tz9WrHZUp8U+lfVZ+aSYHDFY509lSO1NbHs3ZPhJcGUeMbqhVU6L9Hcx2Z7o1eqS9/pjufDqraNNSBB4DpHQxPmXC9HWW+D2Jv6ue/s3k4SsAAAAAAAAPmpOFJN1HklvZ8XNxStlnVfYuL6kuJVdJ9I7TDKbrYrJQgvVp5pyk+CSz50urcvMMmXzpXpFbYVSlc37yjFNQhxk3uSXvPyWfWQHJVgF3iFWeL4+vnKuaoQe6EH7ST3ZrYurbxInRrAMR5RriN9pHF07Km/mbd5/Odck98Xxlx3LYbLCMYJKCyS2JLcupFT10yO+36ACVAAAAAAAAAAAAAAAAAAAAAAAABE45gVviqzfNnwllv6FLpRLADNMQtq9jLUxaD+rVW19XOfrrtyZLYXjl9bJc5V4dOb1l2vevvIuNehSuIuNeKlF701misYhoZSk9fCqkqUujNuPYmtq8yrTVJe1x6yr+u3B/WWzxWwkKVelW+ikpdjT+BQLiz0kw/wClpRrL3o7X+7k/FHL/AMRU7d/423nCXZ/ckxRyaafjajvM0rabYXRjnKNXuS/uOOenmG1NlKhVm+jKP9WZUnKGnVcRtKftp9Uec/BHFc4tPJ+iSglvlPh15J5LvZQYY5pViWzB7BxXCVRSy89VfE6KWgOP4289KLtqD/VU3muzLJRXgxRfjyxzTm2oS9Hg6ld3Eti1c5R7M1v7I+KP3R/k9vsZqq807lry3wtvYit+UluS+qu9svOAaMYRo+ssNpJS4ze2b7ZPb3EwbdaON7fMIRppKmkklkklkklwSPoAlQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfMoxn66T7T6AHO7G0l61OH4I/0Punb0aX0UYrsSXwPUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z",
    "Mazda": "data:image/png;base64,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",
    "Subaro": "https://w7.pngwing.com/pngs/432/968/png-transparent-subaru-impreza-wrx-sti-car-logo-fuji-heavy-industries-subaru-emblem-computer-wallpaper-product.png",
};


function generateCars(numberOfCars, isArray) { //return array with Cars ( each car is an object in JS)
    if (typeof numberOfCars !== 'number') return;
    const cars = isArray ? [] : {};
    for (let index = 0; index < numberOfCars; index++) {
        if (isArray) cars.push(generateSingleCar(index))
        else {
            const singleCar = generateSingleCar(index)
            cars[singleCar.lp.toString()] = singleCar;
        }
    }
    return cars;
}

function generateSingleCar(index) {
    return {
        lp: _generateLP(),
        color: _generateColor(),
        type: _generateType(),
        doors: _generateDoors(),
        isSunRoof: _isSunRoof(index)
    };


    function _generateLP() {
        return Math.ceil(Math.random() * 999999);
    }
    function _generateColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function _generateDoors() {
        return doors[Math.floor(Math.random() * doors.length)];
    }
    function _isSunRoof(index) {
        return index % 2 === 0 ? true : false
    }
    function _generateType() {
        return types[Math.floor(Math.random() * types.length)];
    }

}

// array [....]
// filter - filter by boolean statment
// find - like filter but exactly one, the first one.
// findIndex - exactly like find, but return only the index.
// map - return partial result
// reduce - next time..


(function () {
    const cars = generateCars(100, true)
    DOM.listData = document.getElementById("data");
    DOM.cardsData = document.getElementById("data-cards");
    DOM.tableData = document.getElementById("table");
    draw(cars, DOM.cardsData, "list");

    const listViewButton = document.getElementById("listView");
    const cardViewButton = document.getElementById("cardView");
    const tableViewButton = document.getElementById("tableView");
    
    listViewButton.addEventListener("click", function () {
        draw(cars, DOM.listData, "list")
    })
    cardViewButton.addEventListener("click", function () {
        draw(cars, DOM.cardsData, "cards")
    })
    tableViewButton.addEventListener("click", function () {
        draw(cars, DOM.tableData, "table")
    })
}())

function draw(data, domContainer, displayType) {
    clearDOM()
    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if (typeof displayFunction !== 'function') return;
    if(displayType === "table"){
        domContainer.append(createTableHead())
        const tbody = document.getElementById("table-data")
        data.forEach((car) => {
            tbody.append(displayFunction(car))
        });
    }
    else{
        data.forEach((car) => {
            domContainer.append(displayFunction(car))
        });
    }
}

function clearDOM() {
    DOM.listData.innerHTML = "";
    DOM.cardsData.innerHTML = "";
    DOM.tableData.innerHTML = "";
}
function getListItem(carData) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerText = `car lp: ${carData.lp}, car color: ${carData.color}, Type : ${carData.type}`;
    return listItem;
}

function getCardItem(carData) {

    const card = document.createElement("div");
    card.classList.add("card") 
    card.style = "width: 18rem; margin: 10px"

    const cardImg = document.createElement("img");
    cardImg.src = cardsImages[carData.type];
    cardImg.classList.add("card-img-top")
    cardImg.style.width = "300px"
    cardImg.style.height = "250px"
    
    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    cardBody.style.backgroundColor = carData.color

    const cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    cardTitle.innerText = carData.type

    const cardTextLp = document.createElement("p")
    cardTextLp.classList.add("card-text")
    cardTextLp.innerText = `Licence Plate Number : ${carData.lp}`

    const cardTextColor = document.createElement("p")
    cardTextColor.classList.add("card-text")
    cardTextColor.innerText = `Car Color : ${carData.color}`
    
    const cardTextDoors = document.createElement("p")
    cardTextDoors.classList.add("card-text")
    cardTextDoors.innerText = `Car Doors : ${carData.doors}`
    
    const cardTextSunRoof = document.createElement("p")
    cardTextSunRoof.classList.add("card-text")
    cardTextSunRoof.innerText = `Does The Car Have Sunroof? : ${carData.isSunRoof}`

    card.appendChild(cardImg)
    card.appendChild(cardBody)
    cardBody.appendChild(cardTitle)
    cardBody.appendChild(cardTextLp)
    cardBody.appendChild(cardTextColor)
    cardBody.appendChild(cardTextDoors)
    cardBody.appendChild(cardTextSunRoof)
    
    return card;
}
function getRowItem(carData) {
    const row = document.createElement("tr")
    row.style.backgroundColor = carData.color
    
    const lp = document.createElement("td")
    lp.innerText = carData.lp
   
     
    const type = document.createElement("td")
    type.innerText = carData.type

    const color = document.createElement("td")
    color.innerText = carData.color

    const doors = document.createElement("td")
    doors.innerText = carData.doors

    const sunRoof = document.createElement("td")
    sunRoof.innerText = carData.isSunRoof
    
    const img = document.createElement("img")
    const imgTd = document.createElement("td")
    img.src = cardsImages[carData.type]
    img.style.width = "30px"
    img.style.height = "30px"
    imgTd.appendChild(img)

    row.appendChild(lp)
    row.appendChild(type)
    row.appendChild(color)
    row.appendChild(doors)
    row.appendChild(sunRoof)
    row.appendChild(imgTd)
    return row
 }


 function createTableHead(){
     const table = document.createElement("table")
    table.classList.add("table")

    const tHead = document.createElement("thead")
    table.appendChild(tHead)

    const tr = document.createElement("tr")
    tHead.appendChild(tr)

    const lp = document.createElement("th")
    lp.innerText = "Licence Plate"
    tr.appendChild(lp)

    const type = document.createElement("th")
    type.innerText = "Type"
    tr.appendChild(type)

    const color = document.createElement("th")
    color.innerText = "Color"
    tr.appendChild(color)

    const doors = document.createElement("th")
    doors.innerText = "Doors"
    tr.appendChild(doors)

    const sunRoof = document.createElement("th")
    sunRoof.innerText = "Sun Roof ?"
    tr.appendChild(sunRoof)

    const img = document.createElement("th")
    img.innerText = "Image "
    tr.appendChild(img)

    const tBody = document.createElement("tbody")
    tBody.id = "table-data"
    table.appendChild(tBody)





     return table
 }
 function searchList() {
     const searchBar = document.getElementById("search-bar");
     const filter = searchBar.value.toUpperCase();
     const ul = document.getElementById("data");
     const li = ul.getElementsByTagName('li');
     
     for (let i = 0; i < li.length; i++) {
         let liValue = ul.getElementsByTagName("li")[i]
         txtValue = liValue.textContent || liValue.innerText;
         if(txtValue.toUpperCase().indexOf(filter) > -1){
             li[i].style.display = "";
         } else {
             li[i].style.display = "none"
         }
         
         
         
        }
 }
 
 function searchCards() {
     const searchBar = document.getElementById("search-bar");
     const filter = searchBar.value.toUpperCase();
     const ul = document.getElementById("data-cards");
     const div = ul.getElementsByTagName('div');
     
     for (let i = 0; i < div.length; i++) {
         let divValue = ul.getElementsByTagName("div")[i]
         txtValue = divValue.textContent || divValue.innerText;
         if(txtValue.toUpperCase().indexOf(filter) > -1){
             div[i].style.display = "";
         } else {
            div[i].style.display = "none"
         }
         
         
         
        }
 }
 
 //this function doesnt work good its deleting all of the property's needed to be fixed
 function searchTable() {
     const searchBar = document.getElementById("search-bar");
     const filter = searchBar.value.toUpperCase();
     const tr = document.getElementById("table-data");
     const td = tr.getElementsByTagName('td');
     
     for (let i = 0; i < td.length; i++) {
         let tableValue = tr.getElementsByTagName("td")[i]
         txtValue = tableValue.textContent || tableValue.innerText;
         if(txtValue.toUpperCase().indexOf(filter) > -1){
             td[i].style.display = "";
         } else {
           td[i].style.display = "none"
         }
         
         
         
        }
 }
 