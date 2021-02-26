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


//Reset game function
reset.addEventListener("click", () => {
  playArea.innerHTML = '';
  play();
});


//Choose tool Function: 
//0 = axe, 1 = pickAxe 2 = Shovel
axe.addEventListener("click", () => selector = 0);
pickAxe.addEventListener("click", () => selector = 1);
shovel.addEventListener("click", () => selector = 2);


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
const skyNear = (z) => {
  let x = Number(z.getAttribute(`row`));
  let y = Number(z.getAttribute(`column`));

  let right = document.querySelector(`[row = "${x}"][column = "${y+1}"]`);
  let left = document.querySelector(`[row = "${x}"][column = "${y-1}"]`);
  let top = document.querySelector(`[row = "${x-1}"][column = "${y}"]`);
  let bottom = document.querySelector(`[row = "${x+1}"][column = "${y}"]`);
  
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
  if(
    (selector === 0 && (currentSeg.classList.contains((`treeT`) || (`treeL`)))) ||
    (selector === 1 && (currentSeg.classList.contains(`block`))) ||
    (selector === 2 && (currentSeg.classList.contains(`land`)))){
    return true
  }
  return false
}


//Add event listener to all segmants and update the current
segmant.forEach(seg => seg.addEventListener("click", () => currentSeg = seg));
