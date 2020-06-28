const aColors = ["red", "silver", "white", "black"];
const aBrands = [
  "Toyota",
  "Audi",
  "Alfa Romeo",
  "BMW",
  "Mercedes-Benz",
  "Mazda",
  "Subaru",
];
const aTypes = ["Sudan", "Sports", "SUV"];
const oLogo = {
  alfaRomeo:
    "https://crdms.images.consumerreports.org/c_lfill,w_300,q_auto,f_auto/prod/cars/cr/makes/41-alfa-romeo",
  audi:
    "https://crdms.images.consumerreports.org/c_lfill,w_300,q_auto,f_auto/prod/cars/cr/makes/2-audi",
  BMW:
    "https://crdms.images.consumerreports.org/c_lfill,w_300,q_auto,f_auto/prod/cars/cr/makes/3-bmw",
  Mazda:
    "https://crdms.images.consumerreports.org/c_lfill,w_300,q_auto,f_auto/prod/cars/cr/makes/23-mazda",
  Subaru:
    "https://crdms.images.consumerreports.org/c_lfill,w_300,q_auto,f_auto/prod/cars/cr/makes/33-subaru",
  Toyota:
    "https://crdms.images.consumerreports.org/c_lfill,w_300,q_auto,f_auto/prod/cars/cr/makes/35-toyota",
  "Mercedes-Benz":
    "https://crdms.images.consumerreports.org/c_lfill,w_300,q_auto,f_auto/prod/cars/cr/makes/24-mercedes-benz",
};

const doors = [2, 4, 5];
const DOM = {};

const displayFunctions = {
  cards: getCardItem,
  list: getListItem,
  table: getRowItem,
};
console.log(displayFunctions);

function generateCars(numberOfCars, isArray) {
  //return array with Cars ( each car is an object in JS)
  if (typeof numberOfCars !== "number") return;
  const cars = isArray ? [] : {};
  for (let index = 0; index < numberOfCars; index++) {
    if (isArray) cars.push(generateSingleCar(index));
    else {
      const singleCar = generateSingleCar(index);
      cars[singleCar.lp.toString()] = singleCar;
    }
  }
  return cars;
}

function generateSingleCar(index) {
  const brand = _generateBrand(),
    logo = _generateLogo(),
    lp = _generateLP(),
    color = _generateColor(),
    type = _generateType(),
    isSunRoof = _isSunRoof(index);

  return {
    lp,
    color,
    type,
    brand,
    logo,
    isSunRoof,
  };

  function _generateLP() {
    return Math.ceil(Math.random() * 999999);
  }
  function _generateColor() {
    return aColors[Math.floor(Math.random() * aColors.length)];
  }
  function _generateLogo() {
    let sBrand = brand.toLowerCase().replace(/ /g, "");
    let url = "";
    for (x in oLogo) {
      if (x.toLowerCase() === sBrand) {
        url = oLogo[x];
        break;
      }
    }
    return url;
  }
  function _isSunRoof(index) {
    return index % 2 === 0 ? true : false;
  }
  function _generateBrand() {
    return aBrands[Math.floor(Math.random() * aBrands.length)];
  }
  function _generateType() {
    return aTypes[Math.floor(Math.random() * aTypes.length)];
  }
}

// array [....]
// filter - filter by boolean statment
// find - like filter but exactly one, the first one.
// findIndex - exactly like find, but return only the index.
// map - return partial result
// reduce - next time..
let currentView = "list";
(function () {
  const cars = generateCars(100, true);

  DOM.listData = document.getElementById("data-list");
  DOM.cardsData = document.getElementById("data-cards");
  DOM.tableData = document.getElementById("data-table");
  draw(cars, DOM.listData, "list");
  const searchCategory = document.getElementById("searchCategory");
  const searchBar = document.getElementById("searchBar");

  const listViewButton = document.getElementById("listView");
  const cardViewButton = document.getElementById("cardView");
  const tableViewButton = document.getElementById("tableView");
  listViewButton.addEventListener("click", function () {
    currentView = "list";
    draw(cars, DOM.listData, "list");
  });
  cardViewButton.addEventListener("click", function () {
    currentView = "cards";
    console.log(searchBar.value);
    draw(cars, DOM.listData, "cards");
  });
  tableViewButton.addEventListener("click", function () {
    currentView = "table";
    draw(cars, DOM.tableData, "table");
  });
  console.log(currentView);

  search(cars, DOM);
})();

// function _arrayToObject(array, newObjectKey) {
//   const oCars = [];
//   for (i = 0; i < array.length; i++) {
//     oCars[array[i].newObjectKey.toString()] = array[i];
//   }
//   return oCars;
// }

function search(array, container) {
  searchBar.addEventListener("keyup", (e) => {
    let selectedCategory = searchCategory.value;
    let typedValue = e.target.value.toLowerCase();
    let filteredResult;
    let filteredContainer;

    if (selectedCategory == "brand") {
      filteredResult = array.filter((car) => {
        return car.brand.toLowerCase().includes(typedValue);
      });
    } else if (selectedCategory == "color") {
      filteredResult = array.filter((car) => {
        return car.color.toLowerCase().includes(typedValue);
      });
    } else if (selectedCategory == "lp") {
      filteredResult = array.filter((car) => {
        return car.lp.toString().includes(typedValue);
      });
    } else {
      filteredResult = array.filter((car) => {
        return car.type.toLowerCase().includes(typedValue);
      });
    }

    switch (currentView) {
      case "list":
        filteredContainer = container.listData;
        break;
      case "cards":
        filteredContainer = container.cardsData;
        break;
      case "table":
        filteredContainer = container.tableData;
        break;
    }
    draw(filteredResult, filteredContainer, currentView);
  });
}

function draw(data, domContainer, displayType) {
  clearDOM();
  if (!Array.isArray(data)) return;
  if (typeof domContainer !== "object") return;
  const displayFunction = displayFunctions[displayType];
  if (typeof displayFunction !== "function") return;
  if (displayType === "table") {
    _appendTableHead(domContainer);
  }
  data.forEach((car) => {
    domContainer.append(displayFunction(car));
  });
}

function clearDOM() {
  DOM.listData.innerHTML = "";
  DOM.cardsData.innerHTML = "";
  DOM.tableData.innerHTML = "";
}
function getListItem(carData) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.innerHTML = `<img
 src=${carData.logo}
 alt="car-logo"
/>
<div>
 <h3>${carData.brand}</h3>
 <li class="license-number">LP:${carData.lp}</li>
 <li>
   Type: <span> ${carData.type} </span> &nbsp &nbsp | &nbsp &nbsp Color:
   <span>  ${carData.color} </span>
 </li>
</div>`;
  return listItem;
}

function getCardItem(carData) {
  const card = document.createElement("div");
  card.classList.add("card-item");
  card.innerHTML = `
  <img
  src=${carData.logo}
  alt="Car Logo"
  />
  <div class="card-bottom">
  <h3>${carData.brand}</h3>
  <div class="card-license-plate">LP: ${carData.lp}</div>
  <div>Type: ${carData.type}</div>
  <div>Color: ${carData.color}</div>
  </div>
  `;
  return card;
}

function _appendTableHead(container) {
  const tableHead = document.createElement("tr");
  tableHead.innerHTML = `   <th>Logo</th>
<th>License Plate</th>
<th>Brand</th>
<th>Type</th>
<th>Color</th>`;
  container.append(tableHead);
}

function getRowItem(carData) {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `    <tr>
  <td>
    <img
      src=${carData.logo}
      alt="Car logo"
    />
  </td>
  <td>${carData.lp}</td>
  <td>${carData.brand}</td>
  <td>${carData.type}</td>
  <td>${carData.color}</td>
</tr>`;
  return tableRow;
}
