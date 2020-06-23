const colors = ["red", "green", "yellow", "black"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
const DOM = {}

const displayFunctions = {
    "cards": getCardItem,
    "list": getListItem,
    "table": getRowItem,
};
console.log(displayFunctions)


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
        return index % 2 === 0 ? "Yes" : "No"
    }

    function _generateType() {
        return types[Math.floor(Math.random() * types.length)];
    }

}

(function () {
    const cars = generateCars(100, true)
    DOM.listData = document.getElementById("data");
    DOM.cardsData = document.getElementById("data-cards");
    DOM.tableData = document.getElementById("table");

    draw(cars, DOM.listData, "list");

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
    console.log(domContainer)
    clearDOM()

    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if (typeof displayFunction !== 'function') return;
    if (displayType === "table") {
        domContainer.append(handleTableHead())
        const tbody = document.getElementById("table-data")
        data.forEach(car => {
            tbody.append(displayFunction(car))
        });
    } else {
        data.forEach(car => {
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
    listItem.classList = `list-group-item bg-${getClassByColor(carData.color)}`;
    listItem.innerText = `car lp: ${carData.lp}, car color: ${carData.color}`;
    return listItem;
}

function getClassByColor(color) {
    switch (color) {
        case "red":
            return "danger"
        case "green":
            return "success"
        case "yellow":
            return "warning"
        case "black":
            return "dark"
        default:
            return "light"
    }

}

function getImgByType(type) {
    switch (type) {
        case "BMW":
            return "https://i.ya-webdesign.com/images/2017-bmw-png-8.png"
        case "MRCDS":
            return "https://www.mercedes-benz.co.il/wp-content/uploads/775-2-2-1200x578.png"
        case "Mazda":
            return "https://i.ya-webdesign.com/images/mazda-3-png-2.png"
        case "Subaro":
            return "https://vignette.wikia.nocookie.net/forzamotorsport/images/a/a7/HOR_XB1_Subaru_Impreza_08.png/revision/latest?cb=20191028151949"
        default:
            return "https://img2.pngio.com/cartoon-vehicle-vector-cartoon-car-png-download-500500-free-vehicle-vector-png-500_500.png"
    }
}

function getCardItem(carData) {
    const mainDivCard = document.createElement("div");
    mainDivCard.classList = `card text-white bg-${getClassByColor(carData.color)} mb-3 col-4`
    mainDivCard.style = "max-width: 23rem;margin:5px;"


    const headerDivCard = document.createElement("div")
    headerDivCard.innerText = `Car Model: ${carData.type}`
    headerDivCard.classList = "card-header"
    mainDivCard.appendChild(headerDivCard)

    const bodyDivCard = document.createElement("div")
    bodyDivCard.classList = "card-body"
    mainDivCard.appendChild(bodyDivCard)

    const imageDiv = document.createElement("div")
    imageDiv.style = "position:absolute;right:0;top:0;"
    bodyDivCard.appendChild(imageDiv)

    const imgCarCard = document.createElement("img")
    imgCarCard.src = getImgByType(carData.type)
    imgCarCard.style = "height:50px;width:70px"
    imageDiv.appendChild(imgCarCard)

    const titleCard = document.createElement("h5")
    titleCard.innerText = `Licence Plate: ${carData.lp}`
    titleCard.classList = "card-title"
    bodyDivCard.appendChild(titleCard)

    const cardText = document.createElement("p")
    cardText.classList = "card-text"
    bodyDivCard.appendChild(cardText)

    cardText.innerText = `Doors: ${carData.doors}, Car Color: ${carData.color}, SunRoof: ${carData.isSunRoof}`;
    return mainDivCard;
}

function handleTableHead() {
    const table = document.createElement("table")
    table.classList.add("table")

    const thead = document.createElement("thead")
    table.appendChild(thead)

    const tr = document.createElement("tr")

    const lp = document.createElement("th")
    lp.innerHTML = "Lp"
    tr.appendChild(lp)

    const model = document.createElement("th")
    model.innerHTML = "Model"
    tr.appendChild(model)

    const color = document.createElement("th")
    color.innerHTML = "Color"
    tr.appendChild(color)

    const doors = document.createElement("th")
    doors.innerHTML = "Doors"
    tr.appendChild(doors)

    const sunRoof = document.createElement("th")
    sunRoof.innerHTML = "SunRoof"
    tr.appendChild(sunRoof)

    const tbody = document.createElement("tbody")
    tbody.id = "table-data"

    thead.appendChild(tr)
    table.appendChild(tbody)

    console.log(tbody)
    return table
}

function getRowItem(carData) {
    const row = document.createElement("tr")
    row.classList.add(`table-${getClassByColor(carData.color)}`)
    const lp = document.createElement("td")
    lp.innerText = carData.lp
    row.appendChild(lp)
    const model = document.createElement("td")
    model.innerText = carData.type
    row.appendChild(model)
    const color = document.createElement("td")
    color.innerText = carData.color
    row.appendChild(color)
    const doors = document.createElement("td")
    doors.innerText = carData.doors
    row.appendChild(doors)
    const sunRoof = document.createElement("td")
    sunRoof.innerText = carData.isSunRoof
    row.appendChild(sunRoof)
    return row

}