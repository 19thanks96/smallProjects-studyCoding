document.body.innerHTML += '<p id = "one"> * </p>';
document.body.innerHTML += '<p id = "two">*</p>';
let p1 = document.querySelector("#one");
let p2 = document.querySelector("#two");
let p1left = 100;
let p1top = 100;
let p2left = 200;
let p2top = 50;
let speed = {
    v1x : 0.12,
    v1y : 0.1,
    v2x : 1,
    v2y : 0.13,
};

p1.style.position = 'absolute';
p2.style.position = 'absolute';


function time() {
    console.log('hello world');
    p1left +=speed.v1x;
    p1top += speed.v1y;
    p2left +=speed.v2x;
    p2top += speed.v2y;
    distance = Math.hypot(p2left - p1left, p2top - p1top);
    let force = 1 / distance;
    let forceX = force*(p2left-p1left)/distance;
    let forceY = force*(p2top-p1top)/distance;
    speed.v1y += forceY*10;
    speed.v1x += forceX*10;
    speed.v2x -= forceX*10;
    speed.v2y -= forceY*10;

    p1.style.left = p1left + 'px';
    p1.style.top = p1top + 'px';
    p2.style.left = p2left + 'px';
    p2.style.top = p2top + 'px';
}
setInterval(time, 1000/60);