const fps = 10;

let chains = [];
let ballNumber = 0;
const radBallAdd = 300;

// Gravity constant
const g = 0.7;
let forceY = g;
let forceX = 0;
const zagasannya = 0.8;
// Tension force constant (Hooks Law)
const k = 0.01;

let imgElement = document.createElement('img');
imgElement.id = 'firstId';
imgElement.className = 'ball';
imgElement.src = "metalBall.png";
document.body.append(imgElement);

document.querySelector('#svg').setAttribute('viewBox',`0, 0, ${window.innerWidth}, ${window.innerHeight}`);


const firstball = {
    x: window.innerWidth/2,
    y: window.innerHeight - 400,
    vx: 0,
    vy: 0,
    width: 50,
    height: 50,
    img: document.querySelector('#' + 'firstId'),
    
}

let uvelichenie = true;
const balls = [firstball];
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('click', handleMouseClick);
setInterval(time, fps);

function time () {
    //if(uvelichenie) {
    //    forceX += 0.001
    //    forceY = Math.sqrt(g*g-forceX*forceX)|| g
    //} else  {
    //    forceX -= 0.001
    //    forceY = -Math.sqrt(g*g-forceX*forceX)|| 0
    //}
    //if (forceX >= g) {
    //    uvelichenie = false
    //}
    //if (forceX <= -g) {
    //    uvelichenie = true
    //}
    
    balls.forEach(move);
    balls.forEach(renderImg);
    balls.forEach(applyGravity);
    balls.forEach(renflection); 
    chains.forEach(renderChain);
    chains.forEach(applyTension);
    balls.forEach(velocityDecay)
}

function move (ball) {
    ball.y += ball.vy;
    ball.x += ball.vx;
}

/**
 * Pryminuty natyaghnennia - act with Hooke's force on the ball: change ball velocity
 *  
 * @param ball - rubber is attached to this ball
 */ 
function applyTension (chain) {
    const ball = chain.ballEnd
    
    const point = {
        x : chain.ballStart.x,
        y : chain.ballStart.y,
    }
    const distY = ball.y - point.y;
    const distX = ball.x - point.x;
    const dist = Math.sqrt(distX*distX + distY*distY);
    const rostyignennya = dist - chain.length;
    const tensionForce = -k * rostyignennya;
    const stepX = distX/dist;
    const stepY = distY/dist;
    ball.vy += tensionForce * stepY;
    ball.vx += tensionForce * stepX;
    
    //
    chain.ballStart.vy += -tensionForce * stepY;
    chain.ballStart.vx += -tensionForce * stepX;
    chain.ballStart.vy *= zagasannya;
    chain.ballStart.vx *= zagasannya;
    
    //consoleLogs(ball, rostyignennya, tensionForce)
}

function velocityDecay(ball) {
    ball.vy *= zagasannya;
    ball.vx *= zagasannya;
}

function consoleLogs(ball, rostyignennya, tensionForce) {
    console.log('position: ',ball.y);
    console.log('position of x: ',ball.x);
    console.log('speed vx: ',ball.vx);
    console.log('vy: ',ball.vy);
    console.log('rostyignennya: ',rostyignennya);
    console.log('Tension: ',tensionForce);
    console.log('================================================================')
}

function createLine(pointStart, pointEnd) {
    let lineElement = document.createElementNS('http://www.w3.org/2000/svg','line');
    lineElement.setAttribute('x1',`${pointStart.x}`);
    lineElement.setAttribute("y1",`${pointStart.y}`);
    lineElement.setAttribute("x2",`${pointEnd.x}`);
    lineElement.setAttribute("y2",`${pointEnd.y}`);
    lineElement.setAttribute("stroke","black");
    document.querySelector('#svg').append(lineElement);
    let distance = Math.sqrt((pointStart.x-pointEnd.x)*(pointStart.x-pointEnd.x)+
                             (pointStart.y-pointEnd.y)*(pointStart.y-pointEnd.y));
    const chain = {
        ballStart : pointStart, 
        ballEnd : pointEnd, 
        img : lineElement,
        length : distance,
    }
                             
    chains.push(chain);
    
}

function renderImg (ball) {    
    
    ball.img.style.left = ball.x + 'px';
    ball.img.style.top = ball.y + 'px';
}


function renflection (ball) {
    if (ball.y > window.innerHeight - 60 ) {  
        ball.vy = -ball.vy * 0.92; 
        ball.y = window.innerHeight - 60
    } 
    
    if(ball.x > window.innerWidth - 68) { 
        ball.vx = -ball.vx;
    } else if (ball.x <= -100) { 
        ball.vx = -ball.vx;
    }  
}

function applyGravity (ball) {
    ball.vx += forceX;
    ball.vy += forceY;
}


function  handleMouseClick (event) {
    ballNumber += 1;
    const id = 'ball-' + ballNumber;
    
    let allBalsMinRad = []
    balls.forEach(ball => {
        
        const distance =  Math.sqrt((ball.x-event.x)*(ball.x-event.x)+
        (ball.y-event.y)*(ball.y-event.y));
        
        if(distance < radBallAdd) {
            allBalsMinRad.push(ball)
        }
    })
    if (allBalsMinRad.length === 0) {
        return
    }
    
    let imgElement = document.createElement('img');
    imgElement.id = id;
    imgElement.src = "metalBall.png";
    document.body.append(imgElement);

    const newBall = {
        x: event.x,
        y: event.y,
        vx: 0,
        vy: 0,
        width: 50,
        height: 50,
        img: document.querySelector('#' + id),
        
    }

    allBalsMinRad.forEach(ball => {
        createLine(ball, newBall);
    })

    newBall.img.className = 'ball';
    balls.push(newBall);
}


function renderChain(line) { 
    line.img.setAttribute('x1', line.ballStart.x);
    line.img.setAttribute('y1', line.ballStart.y);
    line.img.setAttribute('x2', line.ballEnd.x);
    line.img.setAttribute('y2', line.ballEnd.y);
} 

function handleMouseMove(event) {
    balls.forEach(ball => {
        
        const distance =  Math.sqrt((ball.x-event.x)*(ball.x-event.x)+
                                (ball.y-event.y)*(ball.y-event.y));

        if(distance < radBallAdd) {
            ball.img.classList.add('highlight')
        } else {
            ball.img.classList.remove('highlight')
        }
    })
    
    
}