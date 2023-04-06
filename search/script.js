window.onload = () => {
    let input = document.querySelector('#input').oninput = function() {
        let value = this.value.trim()
        let list = document.querySelectorAll('.ul li');

        if(value) {
            list.forEach(e => {
                if(e.innerText.search(value) == -1) {
                    e.classList.add('hide');
                }
            })
        } else {
            list.forEach(e => {
                e.classList.remove('hide');
            })
        }
    }
}

console.log('a')