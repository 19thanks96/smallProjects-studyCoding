//copy object and call function with variable

const xuyec = {
    x: 5,
    t: 3,
}

function abs(xuy) {
    const updated = Object.assign({}, xuy);
    updated.t ++;
    return updated;
}
console.dir(abs)
const updated = abs(xuyec);
console.log(xuyec);
delete updated.x;
console.log(updated);

//callback function  3:10:00

function first() {
    console.log('callback function work');
}

function second(first) {
    first();
}
second(first);

//
console.log(0 && 3);
const newHuyec = {
    ... xuyec,
    dlina: 16,
}
console.table(newHuyec);