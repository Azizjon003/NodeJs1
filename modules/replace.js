const outFunct = function (html, obj) {
  let out = html.replace(/{image}/g, obj.image);
  out = out.replace(/{nameProduct}/g
  , obj.productName);
  out = out.replace("{organic}", obj.organic ? "organic" : "");
  out = out.replace("{quantity}", obj.quantity);
  out = out.replace("{prodyctvitamin}", obj.nutrients);
  out = out.replace("{ProductCountry}", obj.from);
  out = out.replace("{decrtipiton}", obj.description);
  out = out.replace(/{price}/g, obj.price);
  out = out.replace("{idProduct}", obj.id);
  return out;
};
module.exports = outFunct;
