
let i = 0;
let left = [];
let top = [];

while (i < 100) {
    let a = Math.random() * screen.width;
    let b = Math.random() * screen.height;
    left.push(a);
    top.push(b);
    document.body.innerHTML +=  `<div style="position: absolute; left: ${a}px; top: ${b}px;">*</div>`;
    i++;
}
export {left, top};