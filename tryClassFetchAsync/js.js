class comment {
    constructor (text) {
        this.text = text;
        this.votesQty = 0;
        this.likes = 0;
    }
    upvote() {
        this.votesQty += 1;
    }
    like() {
        this.likes = 1;
    }
    static mergeComments(first, second) {
        return `Ya ${first} ${second}`
    }
}

const firstComment = new comment('first comment');
firstComment.upvote();
console.log(firstComment instanceof comment)
console.log(firstComment instanceof Object)
console.log(firstComment.hasOwnProperty('likes'))
console.log(firstComment);
const fnWithError = () => {
    throw new Error('some error')
}
try {
    firstComment.mergeComments()
    fnWithError()
} catch(error) {
    console.error(error);
    console.log(error.message)
}
console.log('continue')
console.dir(comment);
console.log(comment.mergeComments('Yebu', 'JavaSqrt'));

//
console.log(" ");
console.log(" ");
console.log(" Next block");
console.log(" ");
console.log(" ");
//

class numbersArray extends Array {
    sum() {
        return this.reduce((el, acc) => acc += el, 0)
    }
}

const myArray = new numbersArray(2,5,7)

console.log(myArray)
console.log(myArray.sum())

//
console.log(" ");
console.log(" ");
console.log(" Next block");
console.log(" ");
console.log(" ");
//

function getCatImage() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://api.thecatapi.com/v1/images/search?q=cat', true);
      xhr.onload = function() {
        if (this.status === 200) {
          const data = JSON.parse(this.responseText);
          console.log(data)
          resolve(data[0].url);
        } else {
          reject(Error(this.statusText));
        }
      };
      xhr.onerror = function() {
        reject(Error('Network Error'));
      };
      xhr.send();
    });
  }
  
  getCatImage()
    .then((url) => {
      const img = document.createElement('img');
      img.src = url;
      document.body.appendChild(img);
      img.style.height = 100 + 'px'
    })
    .catch((error) => {
      console.error(error);
    });

    
//
console.log(" ");
console.log(" ");
console.log(" Next block");
console.log(" ");
console.log(" ");
//
const getData = (url) => 
  new Promise((resolve, reject) =>
    fetch(url)
    .then(response => {
        console.log(response)
        return response.json()
      }
    )
    .then(json => resolve(json))
    .catch(error => reject(error))
)


getData('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log(data))
  .catch(error => console.log(error.message))


  //
console.log(" ");
console.log(" ");
console.log(" Next block");
console.log(" ");
console.log(" ");
//


const asyncConst = async() => {
  return 10
}

async function asyncFunc () {
  throw new Error('ne pravilno')
}
asyncConst()
.then(val => console.log(val))
.catch(error => console.log(error.message));


asyncFunc()
  .then(val => console.log(val))
  .catch(error => console.log(error.message));


//
console.log(" ");
console.log(" ");
console.log(" Next block");
console.log(" ");
console.log(" ");



const timerPromise = () => 
  new Promise((resolve, reject) => 
    setTimeout(() => resolve(), 2000))

const asyncFn = async() => {
  console.log('Timer starts')
  const startTime = performance.now()
  await timerPromise()
  const endTime = performance.now()
  console.log('Timer ended', endTime - startTime)
}

asyncFn()



const getsData = async(url) => {
  const res = await fetch(url)
  const json = await res.json()
  return json
}

const url = 'https://jsonplaceholder.typicode.com/todos'

try{
const data = getsData(url)
console.log(data)
} catch(error) {
  console.log(error.message)
}