import {left as x, top as y} from './particles.js';
let second = 0;
setInterval(time, 1000/10);
function time() {
    second+= 1;
    console.log(second + ' sec') ;
    draw();
}

function draw() {
    let divs = document.querySelectorAll('div');
    divs.forEach(drawOnePartical); 
}

function drawOnePartical(div, index) {
    x[index] += Math.random() * 20 - 10;
    y[index] += 1;
    div.style.left = x[index] + 'px';
    div.style.top = y[index] + 'px';
}