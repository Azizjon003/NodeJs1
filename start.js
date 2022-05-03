async function fetch1() {
  let sana = await fetch("http://127.0.0.1:400/api");
  let json = await sana.json();
  console.log(json);
}
fetch1();
