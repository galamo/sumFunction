const colors = ["red", "green", "yellow", "black"];

// print the colors?
// how to?
// for, foreach ,

const types = ["BMW", "MRCDS", "Mazda", "Subaro"];

const doors = [2, 4, 5];

function generateCars(numberOfCars) {
  //return array with Cars ( each car is an object in JS)
  if (typeof numberOfCars !== "number") return;
  const cars = [];
  for (let index = 0; index < numberOfCars; index++) {
    cars.push(generateSingleCar(index));
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

(function () {
  // DONT DO THIS!
  const result = generateCars(100000);
  console.log(result);

  // result.forEach(function(element,index)  {
  //     console.log(element,index)
  // });
  document.getElementById("bt").addEventListener("click", function () {
    document.getElementById("loader").style.display = "block";
    setTimeout(function () {
      document.getElementById("loader").style.display = "none";
      const pic = document.getElementById("pic");
      pic.classList.add("pic-style");
    }, 5000);
  });

  document.getElementById("search").addEventListener("keyup", function () {
    document.getElementById("loader").style.display = "block";
    if (!this.value) return;
    const value = Number(this.value);
    setTimeout(() => {
      const searchResult = [];
      for (let index = 0; index < result.length; index++) {
        if (result[index].lp === value) {
          console.log(result[index]);
        }
      }
      document.getElementById("loader").style.display = "none";
    }, 0);
    // draw searchResult
  });
})();
