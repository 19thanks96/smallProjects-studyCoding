    let posY = 205;
    let posX = 560;
    let html = '';
    let speedX = -1;
    let speedY = -1;
    let blockX = 40;
    let blockY = 40;
    let line = document.querySelector('#linear')
    let boolean = true;
    let lives = 175;

    for (let i = 0; i < 5; i ++) {
    for (let j = 0; j < 5 ; j ++) {
        let formulaX = blockX+ (j*80);
        let formulaY = blockY + (i*20);
        document.body.innerHTML += `<div class='block' data-y='${formulaY}' data-x='${formulaX}' style='position : absolute; background-color: #00${i*1}; height: 10px; width : 20px; left : ${formulaX}px; top : ${formulaY}px; border : 1px solid #000;'></div> `

    }
}

    
function step() {
    posX += speedX;
    posY += speedY;
    if (posY < 5 || posY > 390) {
        speedY *= -1;
    }
    if (posX < 5 || posX > 600) {
        speedX *= -1;
    }
    collisionBlock()
    
    document.querySelector('.square').innerHTML = `<div  style='background-color: black; position: absolute; left : ${posY}px; top: ${posX}px; border-radius: 50%; height: 10px; width: 10px;'></div>`
    minusLives();
    setTimeout(step, 2)
}

window.addEventListener('click', startGame);
function startGame() {
    if (boolean === true) {
    
setTimeout(step, 2);
document.querySelector('.square').addEventListener('mousemove', function (event) {
    let x = event.clientX;
    let y = event.clientY;
    document.querySelector('#linear').style.left = x + "px";
    document.querySelector('#linear').setAttribute('data-x',x);
}
)
boolean = true;
}
}

function collisionBlock() {
    let linear = document.querySelector('#linear').getAttribute('data-x');
    let brick = document.querySelectorAll('.block');
    brick.forEach(el => {
    let blockX = Number(el.getAttribute('data-x'));
    let blockY = Number(el.getAttribute('data-y'));
    if (blockY + 10 > posX &&
        blockY < posX + 10 &&
        blockX + 20 > posY &&
        blockX < posY + 10) {
            if (blockY + 10 > posX &&
                blockY < posX + 10 ) {
            el.remove()
            speedY *= -1;
            } else {
                el.remove();
                speedX *= -1;
            }
        }
        
        if (posX + 20 > 580 &&
            posY > blockY  &&
            posY < blockY + 40
            
            ) { speedY *= -1;
                speedX *= -1;
                console.lo
            }
        if (posX > 585 
            ) {
            lives -= 0.05;
            
        }
    });
    
}

function minusLives() {
    document.querySelector('.lives').innerHTML = 'your iq: ' + Math.floor(lives) + '  points' ;
}