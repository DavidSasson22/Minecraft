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
let currentTool = axe;
let currentSeg;
let myToolBox = [soil, wood, leave, rbreak, axe, pickAxe, shovel];


//sky reset function
const skyReset = () => {
  for (let i = 0; i < 409 / 25; i++) {
    for (let j = 0; j < 1250 / 25; j++) {
      let sky = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      sky.classList.remove(...sky.classList);
      sky.classList.add(`sky`);
      sky.classList.add(`segmant`);
    }
  }
}


//Reset game function
reset.addEventListener("click", () => {
  soilCounter = 0;
  woodCounter = 0;
  leaveCounter = 0;
  breakCounter = 0;
  soil.textContent = `${soilCounter}`;
  wood.textContent = `${woodCounter}`;
  leave.textContent = `${leaveCounter}`;
  rbreak.textContent = `${breakCounter}`;
  skyReset();
  play1();
});


//RestartGame
restart.addEventListener("click", () => {
  soilCounter = 0;
  woodCounter = 0;
  leaveCounter = 0;
  breakCounter = 0;
  soil.textContent = `${soilCounter}`;
  wood.textContent = `${woodCounter}`;
  leave.textContent = `${leaveCounter}`;
  rbreak.textContent = `${breakCounter}`;
  skyReset();
  play1();
  landingPage.style.display = "flex";
  playArea.style.background = "none";
  playArea.style.display = "none";
  toolBox.style.display = "none";
})


//Choose tool Function: 
//axe = 0  , pickAxe = 1  Shovel = 2  
axe.addEventListener("click", () => {
  selector = 0;
  currentTool.classList.remove('chosen');
  currentTool = axe;
  axe.classList.add(`chosen`);
});

pickAxe.addEventListener("click", () => {
  selector = 1;
  currentTool.classList.remove('chosen');
  currentTool = pickAxe;
  pickAxe.classList.add(`chosen`);
});

shovel.addEventListener("click", () => {
  selector = 2;
  currentTool.classList.remove('chosen');
  currentTool = shovel;
  shovel.classList.add(`chosen`);

});

soil.addEventListener("click", () => {
  selector = 3;
  currentTool.classList.remove('chosen');
  currentTool = soil;
  soil.classList.add(`chosen`);

});

wood.addEventListener("click", () => {
  selector = 4;
  currentTool.classList.remove('chosen');
  currentTool = wood;
  wood.classList.add(`chosen`);

});

leave.addEventListener("click", () => {
  selector = 5;
  currentTool.classList.remove('chosen');
  currentTool = leave;
  leave.classList.add(`chosen`);

});

rbreak.addEventListener("click", () => {
  selector = 6;
  currentTool.classList.remove('chosen');
  currentTool = rbreak;
  rbreak.classList.add(`chosen`);

});


//Count resources
var soilCounter = 0;
var woodCounter = 0;
var leaveCounter = 0;
var breakCounter = 0;

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
    console.log(`fillAble returned true`);
    return true
  }
  console.log(`fillAble returned false`);
  return false
}

//Function to add div classes

const fillSky = () => {
  if (fillAble()) {
    if (selector === 3 && soilCounter > 0) {
      soilCounter -= 1;
      soil.textContent = `${soilCounter}`;
      currentSeg.classList.remove(`sky`);
      currentSeg.classList.add(`land`);
    }
    else if (selector === 4 && woodCounter > 0) {
      woodCounter -= 1;
      wood.textContent = `${woodCounter}`;
      currentSeg.classList.remove(`sky`);
      currentSeg.classList.add(`treeT`);
    }
    else if (selector === 5 && leaveCounter > 0) {
      leaveCounter -= 1;
      leave.textContent = `${leaveCounter}`;
      currentSeg.classList.remove(`sky`);
      currentSeg.classList.add(`treeL`);
    }
    else if (selector === 6 && breakCounter > 0) {
      breakCounter -= 1;
      rbreak.textContent = `${breakCounter}`;
      currentSeg.classList.remove(`sky`);
      currentSeg.classList.add(`block`);
    }
  }
}


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