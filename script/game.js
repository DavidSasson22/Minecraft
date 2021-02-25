//Set play area variables

const playArea = document.querySelector(`.playArea`);
console.log(playArea);
const playAreaW = parseInt(window.getComputedStyle(playArea).width);
console.log(playAreaW);
const playAreaH = parseInt(window.getComputedStyle(playArea).height);
console.log(playAreaH);


const groundSt = 11;


//Fill play area with sky segmants, and CREATE MATRIX for game area

const skyMaker = () => {
  for (let i = 0; i < playAreaH / 25; i++) {
    for (let j = 0; j < playAreaW / 25; j++) {
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
  let topGround = document.querySelectorAll(`[row = '${groundSt}']`);
  for (seg of topGround) {
    seg.classList.remove(`sky`);
    seg.classList.add(`upperLand`);
  }
  for (let i = groundSt + 1; i < playAreaH / 25; i++) {
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
    element.classList.remove(`sky`);
    element.classList.add(`cloud`);
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

  tl.classList.remove(`sky`);
  tl.classList.add(`sunTL`);

  tr.classList.remove(`sky`);
  tr.classList.add(`sunTR`);

  bl.classList.remove(`sky`);
  bl.classList.add(`sunBL`);

  br.classList.remove(`sky`);
  br.classList.add(`sunBR`);

}


//Lets make some blocks

const blockMaker = () => {
  let blocks = [];
  //first chunk

  for (let i = groundSt - 4; i < groundSt; i++) {
    for (let j = 0; j < i -4 ; j++) {
      let block = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      blocks.push(block);
    }
  }
  
  //second chunk
  l = 0;
  for (let i = groundSt - 2 ; i < groundSt; i++) {
    for (let j = 30 - l; j < 38 + l; j++) {
      let temp = document.querySelector(`[row = "${i}"][column = "${j}"]`);
      blocks.push(temp);
    }
    l += 1;
  }
  console.log(blocks);
  blocks.forEach(block => {
    block.classList.remove(`sky`);
    block.classList.add(`block`);
  })
}


//Finaly lets create TREES

//for the 


skyMaker();
groundMaker();
cloudMaker();
sunMaker();
blockMaker();