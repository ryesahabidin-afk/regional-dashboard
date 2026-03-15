const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQYLIUtVcdWQ3VGWlkIo3FUnrOwk-NQdj4ouP7KHWoiA8wWRiOguPDcZ1nn-gANb-jQyzyWKkjenX8V/pub?gid=0&single=true&output=csv";

async function loadData(){

const response = await fetch(sheetURL);
const data = await response.text();

const rows = data.split("\n").slice(1);

let labels = [];
let omset = [];

rows.forEach(row => {

const cols = row.split(",");

const tanggal = cols[0];
const outlet = cols[1];
const lob = cols[2];
const kelas = cols[3];
const area = cols[4];
const fnb = Number(cols[5]);
const cinema = Number(cols[6]);
const penonton = Number(cols[7]);
const bill = Number(cols[8]);
const targetHead = Number(cols[9]);
const head = Number(cols[10]);
const dayaSerap = Number(cols[11]);
const at = Number(cols[12]);

const table = document.querySelector("#dataTable tbody");

table.innerHTML += `
<tr>
<td>${tanggal}</td>
<td>${outlet}</td>
<td>${lob}</td>
<td>${kelas}</td>
<td>${area}</td>
<td>${fnb}</td>
<td>${cinema}</td>
<td>${penonton}</td>
<td>${bill}</td>
<td>${targetHead}</td>
<td>${head}</td>
<td>${dayaSerap}</td>
<td>${at}</td>
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