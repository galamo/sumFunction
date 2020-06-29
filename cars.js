const colors = ["red", "green", "yellow", "black"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
const DOM = {};

const displayFunctions = {
  cards: getCardItem,
  list: getListItem,
  table: getRowItem,
};

const columns = [
  {
    value: "lp",
    label: "LP",
  },
  {
    value: "color",
    label: "Color",
  },
  {
    value: "type",
    label: "Type",
  },
  {
    value: "doors",
    label: "Doors",
  },
];

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
  return {
    lp: _generateLP(),
    color: _generateColor(),
    type: _generateType(),
    doors: _generateDoors(),
    isSunRoof: _isSunRoof(index),
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
    return index % 2 === 0 ? true : false;
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
  const cars = generateCars(100, true);
  DOM.listData = document.getElementById("data");
  DOM.cardsData = document.getElementById("data-cards");
  DOM.tableData = document.getElementById("table-data");
  DOM.tableHead = document.getElementById("table-head");

  draw(cars, DOM.listData, "list");

  const listViewButton = document.getElementById("listView");
  const cardViewButton = document.getElementById("cardView");
  const tableViewButton = document.getElementById("tableView");

  listViewButton.addEventListener("click", function () {
    draw(cars, DOM.listData, "list");
  });
  cardViewButton.addEventListener("click", function () {
    draw(cars, DOM.cardsData, "cards");
  });
  tableViewButton.addEventListener("click", function () {
    draw(cars, DOM.tableData, "table");
  });
})();

function draw(data, domContainer, displayType) {
  clearDOM();
  if (!Array.isArray(data)) return;
  if (typeof domContainer !== "object") return;
  const displayFunction = displayFunctions[displayType];
  if (typeof displayFunction !== "function") return;

  if (displayType == "table") {
    drawTableHead(columns, DOM.tableHead);
  }

  data.forEach((car) => {
    domContainer.append(displayFunction(car));
  });
}

function clearDOM() {
  // DOM.listData.innerHTML = "";
  // DOM.cardsData.innerHTML = "";
  // DOM.tableData.innerHTML = "";

  // this is more dynamic

  Object.keys(DOM).forEach((keyInDom) => {
    if (typeof DOM[keyInDom] !== "object") return;
    DOM[keyInDom].innerHTML = "";
  });
}
function getListItem(carData) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-group-item");
  listItem.innerText = `car lp: ${carData.lp}, car color: ${carData.color}`;
  return listItem;
}

function getCardItem(carData) {
  const card = document.createElement("div");
  card.style.border = "1px solid black";
  card.style.height = "50px";
  card.style.width = "300px";
  card.style.display = "inline-block";
  card.innerText = `car lp: ${carData.lp}, car color: ${carData.color}`;
  return card;
}

function getRowItem(carData) {
  // const lp = carData.lp;
  // const color = carData.color;
  // const type = carData.type;
  // const doors = carData.doors;
  const { lp, type, doors, color } = carData; // destructuring es6
  // return getRowItem;
  const tr = _getTR();
  const tdLP = _getTD(lp);
  const tdColor = _getTD(color);
  const tdType = _getTD(type);
  const tdDoors = _getTD(doors);
  tr.append(tdLP, tdColor, tdType, tdDoors);
  return tr;
  function _getTR() {
    return document.createElement("TR");
  }

  function _getTD(value) {
    const allowedTypes = ["string", "number"];
    const theType = typeof value;
    // if (!allowedTypes.includes(theType)) return;
    let currentValue = !allowedTypes.includes(theType) ? "-" : value;
    // if (theType !== "string" && theType !== "number") return;
    const td = document.createElement("TD");
    td.innerText = currentValue;
    return td;
  }
}

function drawTableHead(columnsArray, domContainer) {
  const tr = document.createElement("tr");
  console.log("hi");
  for (i = 0; i < columnsArray.length; i++) {
    let th = document.createElement("th");
    th.classList.add("col");
    th.innerHTML = `${columnsArray[i].label}`;
    tr.appendChild(th);
  }
  domContainer.appendChild(tr);
}
//     <tr>
//     <th scope="col">LP</th>
//     <th scope="col">Color</th>
//     <th scope="col">Type</th>
//     <th scope="col">Doors</th>
// </tr>
