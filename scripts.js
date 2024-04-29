console.log(JSON.parse(localStorage.getItem('barcodeConfig')) );
let config = JSON.parse(localStorage.getItem('barcodeConfig')) ||  {
   interval_ms: 200,
    barcodes : [
      ["5412345", {format: "ean8"}],
      ["1234567", {format: "ean8"}]
    ]
}
console.log(config)

document.getElementById("textinput").value=JSON.stringify(config);
// maybe expose this to a text editor or omsething then save to cookies or something for some persistence?

let idx=0;

function switchBarcode(){
	console.log(config)
	console.log("in switchBarcode")
  const specy = config.barcodes[idx];
  JsBarcode("#barcode", specy[0], specy[1]);
  idx = (idx + 1) % config.barcodes.length;
}
function submitConfig(){
	console.log('submitting')
	var textValue = document.getElementById("textinput").value;
	var parsed=JSON.parse(textValue);
	config = parsed;
	localStorage.setItem('barcodeConfig', textValue);
	window.clearInterval(intervalId);
	intervalId=setInterval(switchBarcode,config.interval_ms);
}


let intervalId=setInterval(switchBarcode,config.interval_ms);

