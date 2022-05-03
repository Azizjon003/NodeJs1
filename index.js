const { error } = require("console");
const fs = require("fs");
const http = require("http");
const url = require("url");
const outFunct = require("./modules/replace.js");
const slugify = require("slugify");
const home = fs.readFileSync("./html/home.html", "utf-8");
const data = fs.readFileSync("./dev-data/data.json", "utf-8");

// console.log(home);
// const read = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(read);
// fs.writeFileSync("./txt/output.txt", read + "salom funyo");
// console.log("yozib buldm");
// fs.writeFile("./txt/start.txt", "boshlandi", "utf-8", (er) => {
//   if (!er) throw new error("salom");
// });
const text1 = "salom dunyo qalaysan";
const text2  = slugify(text1,"_")
console.log(text2);
let overview = fs.readFileSync("./templates/overview.html", "utf-8");
let card = fs.readFileSync("./templates/card.html", "utf-8");
let product1 = fs.readFileSync("./templates/product.html", "utf-8");
let dataJson = JSON.parse(data);

// console.log(slug);
const server = http.createServer((req, res) => {
  const urlReq = req.url;
  let query = +url.parse(urlReq, true).query.id;
  console.log(query);
  const change = dataJson
    .map((val) => {
      return outFunct(card, val);
    })
    .join("");

  let product = overview.replace("{cardConatiner}", change);

  if (urlReq == "/overview" || urlReq == "/") {
    res.writeHead(200, {
      content_type: "text/html",
    });
    res.end(product);
  } else {
    if (urlReq == `/product?id=${query}`) {
      let idobj = dataJson.find((val) => val.id == query);
      const urlReq = slugify(idobj.productName);
      let data = outFunct(product1, idobj);
      res.writeHead(200, { content_type: "text/html" });
      res.end(data);
    } else {
      res.writeHead(404, { content_type: "text/html" });
      res.end("<h1 style= 'color:red'> Page not found </h1>");
    }
  }
  // if (urlReq == `/api`) {
  //   res.writeHead(200, {
  //     content_type: "text/html",
  //     mening_headerim: "zur ishladi",
  //   });
  //   res.end(data);
  // } else {
  //   res.writeHead(404, {
  //     content_type: "text/plain",
  //   });
  //   res.end("not found 404");
  // }
});

server.listen("400", "127.0.0.1");
