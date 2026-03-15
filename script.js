const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYLIUtVcdWQ3VGWlkIo3FUnrOwk-NQdj4ouP7KHWoiA8wWRiOguPDcZ1nn-gANb-jQyzyWKkjenX8V/pub?gid=0&single=true&output=csv";

async function loadData(){

const response = await fetch(sheetURL);
const data = await response.text();

const rows = data.split("\n").slice(1);

let labels = [];
let omset = [];

rows.forEach(row =>{

const cols = row.split(",");

const tanggal = cols[0];
const outlet = cols[1];
const fnb = Number(cols[2]);
const penonton = Number(cols[4]);
const bill = Number(cols[6]);

const head = fnb / penonton;
const atv = fnb / bill;

labels.push(tanggal);
omset.push(fnb);

const table = document.querySelector("#dataTable tbody");

table.innerHTML += `
<tr>
<td>${tanggal}</td>
<td>${outlet}</td>
<td>${fnb}</td>
<td>${penonton}</td>
<td>${head.toFixed(2)}</td>
<td>${atv.toFixed(2)}</td>
</tr>
`;

});

createChart(labels, omset);

}

function createChart(labels,data){

new Chart(document.getElementById("salesChart"),{

type:"line",

data:{
labels:labels,
datasets:[{
label:"Omset FNB",
data:data
}]
}

});

}

loadData();