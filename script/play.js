//Setup my variables

const reset = document.querySelector(`.resetB`);
const restart = document.querySelector(`.restartG`);
const axe = document.querySelector(`.axe`);
const pickAxe = document.querySelector(`.pickAxe`);
const shovel = document.querySelector(`.shovel`);
const soil = document.querySelector(`.rSoil`);
const wood = document.querySelector(`.rWood`);
const rbreak = document.querySelector(`.rBreak`);
let selector =5;


//Reset game function
reset.addEventListener("click", () => {
  playArea.innerHTML ='';
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
let breakCounter = 0;
soil.textContent = `${soilCounter}`;
wood.textContent = `${woodCounter}`;
rbreak.textContent = `${breakCounter}`;