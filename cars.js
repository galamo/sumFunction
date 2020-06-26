const colors = ["Black", "Blue", "Yellow", "Red", "Green"];
const types = ["BMW", "Mercedes", "Audi", "Seat", "Volkswagen", "Skoda", "Porsche" , "Ford" , "Chevrolet"];
const subTypes = {
    bmw : ["M2", "M3", "X5", "i8", "Z4"],
    mercedes : ["A Class", "E Class", "G Class", "S Class", "AMG"],
    audi : ["Q7", "R8", "A3", "A1"],
    seat : ["Arona", "Ateca", "Ibiza", "Leon"],
    volkswagen : ["Golf", "Passat CC", "Touareg"],
    skoda : ["Octavia", "Fabia", "Superb"],
    porsche : ["911", "Boxter", "Cayenne", "Cayman", "Macan"],
    ford : ["Explorer", "Mustang", "Raptor"],
    chevrolete : ["Camaro", "Corvette", "Silverado"],
};
const carsImg = [
    "./asset/Cars/m2.png", "./asset/Cars/m3.png", "./asset/Cars/x5.png", "./asset/Cars/i8.png", "./asset/Cars/z4.png",
    "./asset/Cars/a class.png", "./asset/Cars/e class.png", "./asset/Cars/g class.png", "./asset/Cars/s class.png", "./asset/Cars/amg.png",
    "./asset/Cars/q7.png", "./asset/Cars/r8.png", "./asset/Cars/a3.png", "./asset/Cars/a1.png",
    "./asset/Cars/arona.png", "./asset/Cars/ateca.png", "./asset/Cars/ibiza.png","./asset/Cars/leon.png",
    "./asset/Cars/golf.png", "./asset/Cars/passat cc.png", "./asset/Cars/touareg.png",
    "./asset/Cars/octavia.png", "./asset/Cars/fabia.png", "./asset/Cars/superb.png",
    "./asset/Cars/911.png", "./asset/Cars/boxter.png", "./asset/Cars/cayenne.png","./asset/Cars/cayman.png","./asset/Cars/macan.png",
    "./asset/Cars/explorer.png", "./asset/Cars/mustang.png","./asset/Cars/raptor.png",
    "./asset/Cars/camaro.png", "./asset/Cars/corvette.png", "./asset/Cars/silverado.png"
];
const brandLogo = [ 
    "./asset/Logos/mercedes.png", 
    "./asset/Logos/ford.png",
    "./asset/Logos/chevrolete.png",
    "./asset/Logos/bmw.png",
    "./asset/Logos/audi.png",
    "./asset/Logos/volkswagen.png",
    "./asset/Logos/skoda.png",
    "./asset/Logos/seat.png",
    "./asset/Logos/porsche.png"
];
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
        if (isArray) cars.push(generateSingleCar())
        else {
            const singleCar = generateSingleCar()
            cars[singleCar.lp.toString()] = singleCar;
        }
    }
    console.log(cars)
    return cars;
}

function generateSingleCar() {
    let carType = _generateType();
    let carSubType = _selectSubType(carType);
    return {
        type: carType,
        subType: carSubType,
        lp: _generateLP(),
        color: _generateColor(),
        carImg : _selectImg(carSubType),
        logo: _selectLogo(carType),
    };

    function _generateType() {
        return types[Math.floor(Math.random() * types.length)];
    }
    function _selectSubType(selectedType) {
        let subType;
        switch(true) {
            case selectedType === "BMW": {subType = subTypes.bmw[Math.floor(Math.random() * subTypes.bmw.length) ]} break;
            case selectedType === "Mercedes": {subType = subTypes.mercedes[Math.floor(Math.random() * subTypes.mercedes.length) ]} break;
            case selectedType === "Audi": {subType = subTypes.audi[Math.floor(Math.random() * subTypes.audi.length) ]} break;
            case selectedType === "Seat": {subType = subTypes.seat[Math.floor(Math.random() * subTypes.seat.length) ]} break;
            case selectedType === "Volkswagen": {subType = subTypes.volkswagen[Math.floor(Math.random() * subTypes.volkswagen.length) ]} break;
            case selectedType === "Skoda": {subType = subTypes.skoda[Math.floor(Math.random() * subTypes.skoda.length)]} break;
            case selectedType === "Porsche": {subType = subTypes.porsche[Math.floor(Math.random() * subTypes.porsche.length)]} break;
            case selectedType === "Ford": {subType = subTypes.ford[Math.floor(Math.random() * subTypes.ford.length)]} break;
            case selectedType === "Chevrolet": {subType = subTypes.chevrolete[Math.floor(Math.random() * subTypes.chevrolete.length)]} break;
        }
        return subType;
    }
    function _generateLP() {
        cellOne = Math.floor(Math.random() * (999 - 100) + 100);
        cellTwo = Math.ceil(Math.random() * (99 - 10) + 10);
        cellThree = Math.floor(Math.random() * (999 - 100) + 100);

        return `${cellOne}-${cellTwo}-${cellThree}`;
    }
    function _generateColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function _selectImg(selectedSubType) {
        return carsImg.filter(imgURL => imgURL.indexOf(selectedSubType.toLowerCase()) > -1);
    }
    function _selectLogo(selectedType) {
        return brandLogo.filter(imgURL => imgURL.indexOf(selectedType.toLowerCase()) > -1);
    }

}

(function () {
    const cars = generateCars(50, true)
    const table = document.getElementById('table');
    DOM.listData = document.getElementById("data-list");
    DOM.cardsData = document.getElementById("data-cards");
    DOM.tableData = document.getElementById("data-table");
    
    draw(cars, DOM.listData, "list");

    const listViewButton = document.getElementById("listView");
    const cardViewButton = document.getElementById("cardView");
    const tableViewButton = document.getElementById("tableView");
    listViewButton.addEventListener("click", function () {
        if (!(table.classList.contains('none'))) {
            table.classList.add('none');
        }
        draw(cars, DOM.listData, "list")
    })
    cardViewButton.addEventListener("click", function () {
        if (!(table.classList.contains('none'))) {
            table.classList.add('none');
        }

        draw(cars, DOM.cardsData, "cards")
    })
    tableViewButton.addEventListener("click", function () {
        if (table.classList.contains('none')) {
            table.classList.remove('none');
        }
        draw(cars, DOM.tableData, "table");
    })
}())

function draw(data, domContainer, displayType) {
    clearDOM()
    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if (typeof displayFunction !== 'function') return;
    data.forEach(car => {
        domContainer.append(displayFunction(car))
    });
}

function clearDOM() {
    DOM.listData.innerHTML = "";
    DOM.cardsData.innerHTML = "";
    DOM.tableData.innerHTML = "";
}
function getListItem(carData) {
    const listItem = document.createElement("li");
    const itemLogoWrap = document.createElement('div');
    const itemLogo = document.createElement('img');
    const itemType = document.createElement('p');
    const itemSubType = document.createElement('p');
    const itemLP = document.createElement('p');
    const itemColor = document.createElement('p');

    listItem.classList = 'list-item list-group-item';
    itemLogoWrap.classList.add('list-item-wrap');
    itemLogo.classList.add('list-item-logo');
    itemType.classList.add('list-type');
    itemSubType.classList.add('list-sub-type');
    itemLP.classList.add('list-lp');

    itemLogo.src = carData.logo;
    itemType.innerHTML = carData.type;
    itemSubType.innerHTML = carData.subType ;
    itemLP.innerHTML = carData.lp;
    itemColor.innerHTML = carData.color;
    itemColor.style.color = carData.color;

    listItem.appendChild(itemType);
    listItem.appendChild(itemSubType);
    listItem.appendChild(itemLP);
    listItem.appendChild(itemColor);
    listItem.appendChild(itemLogoWrap);
    itemLogoWrap.appendChild(itemLogo);
    return listItem;
}

function getCardItem(carData) {
    const card = document.createElement("div");
    const cardImgWrap = document.createElement('div');
    const cardImg = document.createElement("img");
    const cardBody = document.createElement("div");
    const cardType = document.createElement('h3');
    const cardLogo = document.createElement('img');
    const cardLP = document.createElement("p");

    card.classList = 'card-item card';
    cardImgWrap.classList.add('card-img-wrap');
    cardBody.classList = 'card-body bg-light border-top';
    cardType.classList = 'card-type card-sub-type';
    cardLP.classList.add('card-lp');

    cardImg.src = carData.carImg;
    cardType.innerHTML = `${carData.type} ${carData.subType}`;
    cardLogo.src = carData.logo;
    cardLP.innerHTML = `<b>License Plate</b><br>${carData.lp}`;

    card.appendChild(cardImgWrap);
    cardImgWrap.appendChild(cardImg);
    card.appendChild(cardBody);
    cardBody.appendChild(cardType);
    cardBody.appendChild(cardLogo);
    cardBody.appendChild(cardLP);
    
    return card;
}
function getRowItem(carData) { 
    const row = document.createElement('tr');
    row.classList.add('table-item')

    const typeCol = document.createElement('td');
    const subTypeCol = document.createElement('td');
    const lpCol = document.createElement('td');
    const colorCol = document.createElement('td');
    const logoCol = document.createElement('td');
    const logo = document.createElement('img');

    typeCol.classList.add('table-type');
    subTypeCol.classList.add('table-sub-type');
    lpCol.classList.add('table-lp');

    typeCol.innerText = carData.type;
    subTypeCol.innerText = carData.subType
    lpCol.innerText = carData.lp;
    logo.src = carData.logo;
    colorCol.innerText = carData.color;
    colorCol.style.color = carData.color;

    row.appendChild(typeCol);
    row.appendChild(subTypeCol);
    row.appendChild(lpCol);
    row.appendChild(colorCol);
    row.appendChild(logoCol);
    logoCol.appendChild(logo);

    return row;
}

function searchCar() {
    let whichUI;
    const searchValue = document.getElementById('searchBar').value.toLowerCase();
    const searchBy = document.getElementById('searchBy');
    const searchByValue = searchBy.options[searchBy.selectedIndex].value;

    switch(true) {
        case document.getElementsByClassName('list-type').length > 0: { whichUI = "list" } break;
        case document.getElementsByClassName('card-type').length > 0: { whichUI = "card" } break;
        case document.getElementsByClassName('table-type').length > 0: { whichUI = "table" } break;
    } // check which UI user search in

    const itemToRemove = document.getElementsByClassName(`${whichUI}-item`);

    switch(true) {
        case searchByValue === 'type': { _searchByType() } break;
        case searchByValue === 'sub_type': { _searchBySubType() } break;
        case searchByValue === 'lp': { _searchByLp() } break;
    } // check which option search for

    function _searchByType() {
        const typeValue = document.getElementsByClassName(`${whichUI}-type`);
        
        for (i = 0; i < typeValue.length; i++) {
            let typeValueText = typeValue[i].innerText.toLowerCase();

            if (typeValueText.indexOf(searchValue) !== 0) {
                itemToRemove[i].style.display = 'none';
            }
        }
    }
    function _searchBySubType() {
        const subTypeValue = document.getElementsByClassName(`${whichUI}-sub-type`);

        for (i = 0; i < subTypeValue.length; i++) {
            let subValueText = subTypeValue[i].innerText.toLowerCase();
            let strArr = subValueText.split(" ");
            strArr.shift();
            let cardSub = strArr.join(" ");

            if (subValueText.indexOf(searchValue) === -1 && (whichUI === 'list' || whichUI === 'table')) {
                itemToRemove[i].style.display = 'none';
            }  
            if (whichUI === 'card' && cardSub.indexOf(searchValue) === -1) {
                itemToRemove[i].style.display = 'none';
            }
        }
    }
    function _searchByLp() {
        const lpValue = document.getElementsByClassName(`${whichUI}-lp`);

        for (i = 0; i < lpValue.length; i++) {
            let lpValueText = lpValue[i].innerText.toLowerCase();

            if (lpValueText.indexOf(searchValue) === -1) {
                itemToRemove[i].style.display = 'none';
            }
        }
    }
}

document.getElementById('searchBtn').addEventListener('click', searchCar);