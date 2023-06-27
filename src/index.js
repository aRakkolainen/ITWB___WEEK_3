import "./styles.css";
//This function is written based on the demo4 Example in the course material!
//Other source is this: https://www.geeksforgeeks.org/how-to-use-the-javascript-fetch-api-to-get-data/
//How to fetch data from API and loop through it https://stackoverflow.com/questions/71740975/how-can-i-retrieve-and-loop-through-data-retrieved-from-a-fetch-request
const populateWithData = async () => {
  const myNewTable = document.createElement("table");
  myNewTable.setAttribute("id", "informationTable");
  const tableHead = document.createElement("thead");
  const thMunicipality = document.createElement("th");
  const thPopulation = document.createElement("th");
  thMunicipality.innerText = "Municipality";
  thPopulation.innerText = "Population";
  tableHead.appendChild(thMunicipality);
  tableHead.appendChild(thPopulation);
  const tableBody = document.createElement("tbody");
  const myDiv = document.getElementById("center");
  myDiv.appendChild(myNewTable);
  const url =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  //Getting the names of municipalities and populations of those
  const dataPromise = await fetch(url);
  const infoJSON = await dataPromise.json();
  //Lecture video from week 6 was source for this
  const municipalities = Object.values(
    infoJSON.dataset.dimension.Alue.category.label
  );
  const populations = infoJSON.dataset.value;
  //Getting the additional data about employment amount
  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
  //Populating the table with the data
  const employmentData = await fetch(url2);
  const employmentJSON = await employmentData.json();
  //console.log(employmentJSON)
  const employmentAmounts = employmentJSON.dataset.value;
  //const myTable = document.getElementById("populations_of_municipalities");
  const thEmploymentAmount = document.createElement("th");
  const thEmploymentRate = document.createElement("th");
  thEmploymentAmount.innerText = "Employment";
  thEmploymentRate.innerText = "Employment-%";
  tableHead.appendChild(thEmploymentAmount);
  tableHead.appendChild(thEmploymentRate);
  for (let i = 0; i < municipalities.length; i++) {
    let newRow = document.createElement("tr");
    let newMunicipalityCell = document.createElement("td");
    let newPopulationCell = document.createElement("td");
    let newEmploymentCell = document.createElement("td");
    let newEmploymentRateCell = document.createElement("td");
    newMunicipalityCell.innerText = municipalities[i];
    newPopulationCell.innerText = populations[i];
    newEmploymentCell.innerText = employmentAmounts[i];
    let employmentRate = (employmentAmounts[i] / populations[i]) * 100;
    //How to round to two decimals: https://www.tutorialspoint.com/How-to-format-a-number-with-two-decimals-in-JavaScript
    newEmploymentRateCell.innerText = employmentRate.toFixed(2) + "%";
    // Setting the background color: https://stackoverflow.com/questions/11517150/how-to-change-background-color-of-cell-in-table-using-java-script
    if (employmentRate > 45) {
      newRow.style.backgroundColor = "#abffbd";
    } else if (employmentRate < 25) {
      newRow.style.backgroundColor = "#ff9e9e";
    }
    newRow.appendChild(newMunicipalityCell);
    newRow.appendChild(newPopulationCell);
    newRow.appendChild(newEmploymentCell);
    newRow.appendChild(newEmploymentRateCell);
    tableBody.appendChild(newRow);
    myNewTable.appendChild(tableHead);
    myNewTable.appendChild(tableBody);
  }
};
populateWithData();
