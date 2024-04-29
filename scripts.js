const config = {
   interval_ms: 200,
    barcodes : [
      ["5412345", {format: "ean8"}],
      ["1234567", {format: "ean8"}]
    ]
}

// maybe expose this to a text editor or omsething then save to cookies or something for some persistence?

let idx=0;

function switchBarcode(){
  const specy = config.barcodes[idx];
  JsBarcode("#barcode", specy[0], specy[1]);
  idx = (idx + 1) % config.barcodes.length;
}
function submitConfig(){
}

setInterval(switchBarcode,config.interval_ms);

