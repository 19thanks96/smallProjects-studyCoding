let ballNumber = 0; 
let firstBall = document.createElement('img'); 
firstBall.id = 'firstBall'; 
firstBall.src = 'metalBall.png'; 
firstBall.className = 'ball' 
document.body.append(firstBall) 
 
const newBall = { 
    x: 0, 
    y: 0, 
    width: 100, 
    height: 100, 
    vx: 4, 
    vy: 0, 
    elem: document.querySelector('#firstBall'), 
} 
 
let balls = [newBall]; 
 
const g = 0.2; 
const forceX = 0; 
const forceY = g; 
let chains = []; 
 
function time() { 
    /**/ 
    balls.forEach(moveBall); 
    balls.forEach(renderBall) 
    chains.forEach(moveChain)  
    chains.forEach(renderChain)  
    setTimeout(time, 1000/60) 
} 
 
document.addEventListener('click', handleMouseClick) 
 
function handleMouseClick(event) { 
    ballNumber += 1; 
    const id = 'ball' + ballNumber; 
    let imgElement = document.createElement('img') 
    imgElement.id = id; 
    imgElement.className = 'ball' 
    imgElement.src = 'metalBall.png' 
    document.body.append(imgElement) 
 
    let lastEddedBall = balls[balls.length-1] 
 
    let lineElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); 
    lineElement.setAttribute('x1',`${event.x}`) 
    lineElement.setAttribute('x2',`${lastEddedBall.x}`) 
    lineElement.setAttribute('y1',`${event.y}`) 
    lineElement.setAttribute('y2',`${lastEddedBall.y}`) 
    lineElement.setAttribute('stroke',"black") 
    document.querySelector('#svg').append(lineElement) 
    document.querySelector('#svg').setAttribute('viewBox',`0 0 ${window.innerWidth} ${window.innerHeight}`) 
    const newBall = { 
        x: event.x, 
        y: event.y, 
        width: 100, 
        height: 100, 
        vx: ballNumber, 
        vy: ballNumber, 
        elem: document.querySelector('#' + id), 
    } 
    const line = { 
        ballStart : lastEddedBall, 
        ballEnd : newBall, 
        elem : lineElement, 
    } 
    chains.push(line) 
    console.log(chains) 
    balls.push(newBall) 
     
} 
 
function moveBall(ball) { 
    ball.x += ball.vx; 
    ball.y += ball.vy; 
     
    if (ball.y > window.innerHeight - 50 )  
    {  
        ball.vy = Math.floor(-ball.vy * 0.92); 
    } else { 
    ball.vx += forceX; 
    ball.vy += forceY; 
    } 
    if(ball.x > window.innerWidth - 68) { 
        ball.vx = Math.floor(-ball.vx) 
    } else if (ball.x <= -100) { 
        ball.vx = Math.floor(-ball.vx) 
    }  
} 
 
function renderBall(ball) { 
    ball.elem.style.left = ball.x + 'px'; 
    ball.elem.style.top = ball.y + 'px'; 
} 
 
function moveChain() { 
 
} 
 
function renderChain(line) { 
    line.elem.setAttribute('x1', line.ballStart.x) 
    line.elem.setAttribute('y1', line.ballStart.y) 
    line.elem.setAttribute('x2', line.ballEnd.x) 
    line.elem.setAttribute('y2', line.ballEnd.y) 
} 
 
setTimeout(time, 1000/60)