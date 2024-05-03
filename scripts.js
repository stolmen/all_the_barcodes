// valid formats:
// <svg id="code128"></svg>
// <svg id="ean-13"></svg>
// <svg id="ean-8"></svg>
// <svg id="ean-5"></svg>
// <svg id="ean-2"></svg>
// <svg id="upc-a"></svg>
// <svg id="code39"></svg>
// <svg id="itf-14"></svg>
// <svg id="msi"></svg>
// <svg id="pharmacode"></svg>


console.log(JSON.parse(localStorage.getItem('barcodeConfig')) );
let config = JSON.parse(localStorage.getItem('barcodeConfig')) ||  {
   interval_ms: 200,
   jitter_pct: 5,
	rotate90:false,
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
	const barcodeElement = document.querySelector("#barcode");
	const x = 100-Math.random()*config.jitter_pct;
	const y = 100-Math.random()*config.jitter_pct;
	barcodeElement.style.width =`${x}%`;
	barcodeElement.style.height =`${y}%`;
	const containerElement = document.querySelector(".barcodeContainer");
	if (config.rotate90){
		containerElement.style.transform = "rotate(90deg)";
	}


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

