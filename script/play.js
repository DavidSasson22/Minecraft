//Setup my variables

const reset = document.querySelector(`.resetB`);
const restart = document.querySelector(`.restartG`);

const axe = document.querySelector(`.axe`);
const pickAxe = document.querySelector(`.pickAxe`);
const shovel = document.querySelector(`.shovel`);

const soil = document.querySelector(`.rSoil`);
const wood = document.querySelector(`.rWood`);
const leave = document.querySelector(`.rLeaves`);
const rbreak = document.querySelector(`.rBreak`);

let segmant = document.querySelectorAll(`.segmant`);


let selector = -1;
let currentSeg;
let myToolBox = [soil, wood, leave, rbreak, axe, pickAxe, shovel];


//Reset game function
reset.addEventListener("click", () => {
  // location.reload();
  play1();
});


//Choose tool Function: 
//axe = 0  , pickAxe = 1  Shovel = 2  
axe.addEventListener("click", () => {
  selector = 0;
  myToolBox.forEach(ele => ele.classList.remove('chosen'));
  axe.classList.add(`chosen`);
});

pickAxe.addEventListener("click", () => {
  selector = 1;
  myToolBox.forEach(ele => ele.classList.remove('chosen'));
  pickAxe.classList.add(`chosen`);
});

shovel.addEventListener("click", () => {
  myToolBox.forEach(ele => ele.classList.remove('chosen'));
  shovel.classList.add(`chosen`);
  selector = 2;
});

soil.addEventListener("click", () => {
  myToolBox.forEach(ele => ele.classList.remove('chosen'));
  soil.classList.add(`chosen`);
  selector = 3;
});

wood.addEventListener("click", () => {
  myToolBox.forEach(ele => ele.classList.remove('chosen'));
  wood.classList.add(`chosen`);
  selector = 4;
});

leave.addEventListener("click", () => {
  myToolBox.forEach(ele => ele.classList.remove('chosen'));
  leave.classList.add(`chosen`);
  selector = 5;
});

rbreak.addEventListener("click", () => {
  myToolBox.forEach(ele => ele.classList.remove('chosen'));
  rbreak.classList.add(`chosen`);
  selector = 6;
});


//Count resources
let soilCounter = 0;
let woodCounter = 0;
let leaveCounter = 0;
let breakCounter = 0;

soil.textContent = `${soilCounter}`;
wood.textContent = `${woodCounter}`;
leave.textContent = `${leaveCounter}`;
rbreak.textContent = `${breakCounter}`;


//Check if specifc segmant has at least one border with sky element
const skyNear = () => {
  let x = Number(currentSeg.getAttribute(`row`));
  let y = Number(currentSeg.getAttribute(`column`));

  let right = document.querySelector(`[row = "${x}"][column = "${y + 1}"]`);
  let left = document.querySelector(`[row = "${x}"][column = "${y - 1}"]`);
  let top = document.querySelector(`[row = "${x - 1}"][column = "${y}"]`);
  let bottom = document.querySelector(`[row = "${x + 1}"][column = "${y}"]`);

  if (
    right.classList.contains(`sky`) ||
    left.classList.contains(`sky`) ||
    top.classList.contains(`sky`) ||
    bottom.classList.contains(`sky`)) {
    return true
  }
  else {
    return false
  }
}


// //Set conditions for mining 
const mineAble = () => {
  if (
    (selector === 0 && ((currentSeg.classList.contains(`treeT`) || currentSeg.classList.contains(`treeL`)))) ||
    (selector === 1 && (currentSeg.classList.contains(`block`))) ||
    (selector === 2 && ((currentSeg.classList.contains(`land`) || currentSeg.classList.contains(`upperLand`))))
  ) {
    return true
  }
  return false
}


//Function to substruct div classes

const switchClass = () => {
  if (mineAble() && skyNear()) {
    if (currentSeg.classList.contains(`upperLand`) || currentSeg.classList.contains(`land`)) {
      soilCounter += 1;
      soil.textContent = `${soilCounter}`;
    }
    else if (currentSeg.classList.contains(`block`)) {
      breakCounter += 1;
      rbreak.textContent = `${breakCounter}`;
    }
    else if (currentSeg.classList.contains(`treeT`)) {
      woodCounter += 1;
      wood.textContent = `${woodCounter}`;
    }
    else {
      leaveCounter += 1;
      leave.textContent = `${leaveCounter}`;
    }
    currentSeg.setAttribute(`class`, `segmant`);
    currentSeg.classList.add(`sky`);
  }
}


//set condition for filling 
const fillAble = () => {
  let x = Number(currentSeg.getAttribute(`row`));
  let y = Number(currentSeg.getAttribute(`column`));
  let bottom = document.querySelector(`[row = "${x + 1}"][column = "${y}"]`);

  if (currentSeg.classList.contains(`sky`) && !bottom.classList.contains(`sky`)) {
    if (selector > 2) {
      return true
    }
  }
  return false
}

//Function to add div classes

// const fillSky = () => {
//   if (fillAble()) {
//     if(selector = 3 && soilCounter > 0) {
//       currentSeg.classList.remove(`sky`);
//       currentSeg.classList.add(`land`);
//     }
//   } 
// }




//Add event listener to all segmants and update the current
const listener = () => {
  segmant.forEach(seg => seg.addEventListener("click", () => {
    currentSeg = seg;
    if (selector < 3) {
      switchClass();
      console.log(`switchClass activated`);
    }
    else {
      fillSky();
      console.log(`fillsky activated`);
    }
  }));
}

listener();

