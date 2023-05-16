const express = require('express')
var fs = require("fs")
const app = express()
const port = 80

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  let messages = '';
  if (fs.existsSync('test.txt')) {
    messages = fs.readFileSync('test.txt');
  }
  res.send(`
    <form style='text-align: center; border-radius: 10px; background-color: blue; padding: 20px 0 20px 0;' method="post" action="/">
      <label for="author">Author:</label>
      <input type="text" id="author" name="author"><br><br>
      <label for="message">Message:</label>
      <input type="text" id="message" name="message"><br><br>
      <input type="submit" value="Submit">
    </form>
    <br>
    <div style='text-align: center; border-radius: 10px; background-color: yellow; padding: 10px 0 10px 0'>Messages:<br>
    ${messages}
    </div>
  `);
});

app.post('/', (req, res) => {
  const author = req.body.author;
  const message = req.body.message;
  fs.appendFileSync('test.txt', `<div style='display: flex; justify-content: space-around;'><p>${author}:</p> <p>${message}</p></div>\n <br>` );
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})