//Set play area variables

const playArea = document.querySelector(`.playArea`);
const startGame = document.querySelector(`.startGame`);
const landingPage = document.querySelector(`.landingPage`);
const toolBox = document.querySelector(`.toolBox`);
const playAreaW = parseInt(window.getComputedStyle(playArea).width);
const playAreaH = parseInt(window.getComputedStyle(playArea).height);


const groundSt = 11;


//Fill play area with sky segmants, and CREATE MATRIX for game area

const skyMaker = () => {
  for (let i = 0; i < 409 / 25; i++) {
    for (let j = 0; j < 1250 / 25; j++) {
      let sky = document.createElement(`div`);
      sky.classList.add(`sky`);
      sky.classList.add(`segmant`);
      sky.setAttribute(`row`, i);
      sky.setAttribute(`column`, j);
      playArea.appendChild(sky);
    }
  }
}




//Fill bottom with land

const groundMaker = () => {
  let dur = 1000;
  let topGround = document.querySelectorAll(`[row = '${groundSt}']`);
  for (seg of topGround) {
    seg.classList.remove(`sky`);
    seg.classList.add(`upperLand`);
  }
  for (let i = groundSt + 1; i < 409 / 25; i++) {
    let ground = document.querySelectorAll(`[row = "${i}"]`);
    for (seg of ground) {
      seg.classList.remove(`sky`);
      seg.classList.add(`land`);
    }
  }
}


// Some clouds are necessary

//first cloud
const cloudMaker = () => {
  let l = 0;
  let cloudAr = [];
  for (let i = 1; i < 3; i++) {
    for (let j = 2 - l; j < 4 + l; j++) {
      let temp = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      cloudAr.push(temp);
    }
    l += 1;
  }

  //second cloud
  l = 0;
  for (let i = 2; i < 4; i++) {
    for (let j = 20 - l; j < 24 + l; j++) {
      let temp = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      cloudAr.push(temp);
    }
    l += 1;
  }

  //add clouds
  cloudAr.forEach(element => {
    setTimeout(() => { element.classList.add(`cloud`) }, 800);
  })
}


//Now for sun
const sunMaker = () => {
  let i = 1;
  let j = 47;
  let tl = document.querySelector(`[row = "${i}"][column = "${j}"]`);
  let tr = document.querySelector(`[row = "${i}"][column = "${j + 1}"]`);
  let bl = document.querySelector(`[row = "${i + 1}"][column = "${j}"]`);
  let br = document.querySelector(`[row = "${i + 1}"][column = "${j + 1}"]`);

  // tl.classList.remove(`sky`);
  setTimeout(() => { tl.classList.add(`sunTL`) }, 1000);


  // tr.classList.remove(`sky`);
  setTimeout(() => { tr.classList.add(`sunTR`) }, 1000);

  // bl.classList.remove(`sky`);
  setTimeout(() => { bl.classList.add(`sunBL`) }, 1000);

  // br.classList.remove(`sky`);
  setTimeout(() => { br.classList.add(`sunBR`) }, 1000);

}


//Lets make some blocks

const blockMaker = () => {
  let blocks = [];
  let dur = 40;


  //first chunk
  for (let i = groundSt - 4; i < groundSt; i++) {
    for (let j = 0; j < i - 4; j++) {
      let block = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      blocks.push(block);
    }
  }

  //second chunk
  l = 0;
  for (let i = groundSt - 2; i < groundSt; i++) {
    for (let j = 30 - l; j < 38 + l; j++) {
      let temp = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      blocks.push(temp);
    }
    l += 1;
  }
  blocks.forEach(function (block, index) {
    setTimeout(function () {
      block.classList.remove(`sky`);
      block.classList.add(`block`);
    }, dur * index);
  })
}


//Finaly lets create TREES

//for the trees-truck
const treeMaker = () => {
  let durk = 100;
  let trucks = [];
  for (let i = groundSt - 4; i < groundSt; i++) {
    let temp = document.querySelector(`[row = "${i}"][column = "${14}"]`);
    let temp2 = document.querySelector(`[row = "${i}"][column = "${44}"]`);
    trucks.push(temp, temp2);
  }

  trucks.forEach(function (truck, index) {
    setTimeout(function () {
      truck.classList.remove(`sky`);
      truck.classList.add(`treeT`);
    }, durk * index);
  })


  //For the leaves
  let leaves = [];
  let dur = 1000;
  for (let i = groundSt - 7; i < groundSt - 4; i++) {
    for (let j = 12; j < 16; j++) {
      let temp = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      leaves.push(temp);
    }
    for (let j = 42; j < 46; j++) {
      let temp2 = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      leaves.push(temp2);
    }
    leaves.forEach(leave => {
      leave.classList.remove(`sky`);
      leave.classList.add(`treeL`);
      leave.animate([
        { opacity: `0` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` },
        { opacity: `1` }
      ], {
        duration: dur,
      });
      dur += 150;
    })
  }
}


const play1 = () => {
  groundMaker();
  cloudMaker();
  sunMaker();
  blockMaker();
  treeMaker();
}

skyMaker();
play1();


startGame.addEventListener("click", () => {
  landingPage.style.display = "none";
  playArea.style.background = "#3FBFFF";
  playArea.style.display = "flex";
  toolBox.style.display = "flex";
  console.log("start game clicked");
})