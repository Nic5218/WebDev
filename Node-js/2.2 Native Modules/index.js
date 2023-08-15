const fs = require("fs"); // file system, require is kinda like import

// fs.writeFile("message.txt", "Hello from NodeJS!", (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   }
// );

fs.readFile("./message.txt", "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
  }
);