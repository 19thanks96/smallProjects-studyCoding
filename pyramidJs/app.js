let BRICK_WIDTH = 30;
let BRICK_HEIGHT = 12;
let BRICKS_IN_BASE = 20;

let row = BRICKS_IN_BASE;
let html = '';
let div = `<div class='block' style="height : ${BRICK_HEIGHT}px; padding : 0px; margin: 0px; display : inline-block; width : ${BRICK_WIDTH}px; border : 1px solid #000"></div>`;
let emptyBlock = `<div class='emty' style="height : ${BRICK_HEIGHT/2}px; width : ${BRICK_WIDTH/2}px; display : inline-block;"></div>`

function GraphicsProgram() {
    if (innerWidth < (BRICK_WIDTH * 4) + BRICK_WIDTH * BRICKS_IN_BASE){
        return document.body.innerHTML = '<h1 style="text-align: center;">Is too more blocks</h1>'
    }
    for(let rows = 0; rows < row; rows++) {
    html += emptyBlock;
    for(let indent = row; indent > rows; indent--) {
        html += emptyBlock;
    }   
    for(let columns = 0; columns < rows+1; columns++ ) {
        html += div;

    }
    html += '<br>'
    document.body.innerHTML = html
}

}

GraphicsProgram()