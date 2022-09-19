

async function getData() {
    const config = {
        headers: {
          "Accept": "application/json"
        }
      }
    const res = await fetch('https://disease.sh/v3/covid-19/all', config);
    const result = await res.json();
    createDataCard(result);
  }

getData()

// Poner html dentro de const

const createDataCard = (result) => {
  const cardHTML = `
      <div id="maincontainer" class="maincontainer">
        <div class="container" id="container">
          <h1>COVID-19 TRACKER</h1>
          <section class="stats" id="stats">
              <div class="totalcase"><span class="casestext">Total Case</span><div class="statscontainer"><span class="todayChanges">+${result.todayCases}</span><span class="casesnumbers" style="color:red; font-weight: 800;">${result.cases}</span></div></div>
              <div class="activecase"><span class="casestext">Active Case</span> <span class="casesnumbers" style="color:orange; font-weight: 800;">${result.active}</span></div>
              <div class="recoveredcase"><span class="casestext">Recovered Case</span><div class="statscontainer"><span class="todayChanges">+${result.todayRecovered}</span><span class="casesnumbers" style="color:limegreen; font-weight: 800;">${result.recovered}</span></div></div>
              <div class="deathcase"><span class="casestext">Death Case</span><div class="statscontainer"><span class="todayChanges">+${result.todayDeaths}</span><span class="casesnumbers" style="color:blue; font-weight: 800;">${result.deaths}</span></div></div>
          </section>
          <h2>Top 10 Country</h2>
          <section class="topcountries" id="topcountries">
          </section>
        </div>
        <div class="container-2" id="container-2">
          <div class="dropdowncontainer" id="dropdowncontainer">
            <label class="dropdownlist" id="dropdownlist">
            </label>
            <div class="casescontainer" id="casescontainer">
            </div>
          </div>
          <div class="mapa-container" id="mapa-container"><img class="mapa" src="/images/mapa.png"/></div>
          <section class="alt-stats-container" id="alt-stats-container">
          <div class="alt-stats"><span class="alt-info">Total Confirmed</span><span class="alt-stats-result" style="color: #0b0b4e;">${result.cases}</span></div>
          <div class="alt-stats"><span class="alt-info">Total Recovered</span><span class="alt-stats-result" style="color: #0b0b4e;">${result.recovered}</span></div>
          <div class="alt-stats"><span class="alt-info">Total Deaths</span><span class="alt-stats-result" style="color: #0b0b4e;"> ${result.deaths}</span></div>
          <div class="alt-stats"><span class="alt-info">New Deaths</span><span class="alt-stats-result" style="color: #0b0b4e;">${result.todayDeaths}</span></div>
          <div class="alt-stats"><span class="alt-info">Help No.</span><span class="alt-stats-result" style="color: #0b0b4e;">198</span></div>
        </section>
        </div>
      </div>
      `;
  main.innerHTML = cardHTML;
};


// funcion para conseguir data de pais especifico

async function getCountryData() {
  const config = {
    headers: {
      "Accept": "application/json"
    }
  }
  const res = await fetch('https://disease.sh/v3/covid-19/countries?sort=cases', config);
  const result = await res.json();
  createTopCountry(result);
}

getCountryData()

// crea una lista con (result) el cual es un array, el numero de slice varia cuantos paises añade a la lista, el array viene ordenado desde fetch
// y se puede cambiar el orden de sort=cases por otro parametro, al hacer la lista se hace un item por cada numero de slice, y se le da una clase.
// despues de darle la case se hace un append y luego se añade html a un const.

const createTopCountry = (result) => {
  let countries = result.slice(0, 10),
  ul = document.createElement('ul');
  ul.classList.add("countries");
  
  document.getElementById('topcountries').appendChild(ul);
  
  countries.forEach(item => {
  let li = document.createElement('li');
  li.classList.add("countrycard");
  ul.appendChild(li);
  
  const liHTML = `
  <span class="countryname"><img class="countryflag" src="${item.countryInfo.flag}">${item.country}</span> <span class="casesnumber" style="color:#080081; font-weight:600; opacity:80%;">${item.cases}</span>
  `;
  
  li.innerHTML = liHTML;
  });
}



const countryListDropdown = (result) => {
  let countries = result.slice(0, 230),
  select = document.createElement('select');
  select.setAttribute("id", "selectdropdown");
  
  document.getElementById('dropdownlist').appendChild(select);

  countries.forEach(item => {
    let option = document.createElement('option');
    option.setAttribute("id", "option")
    select.appendChild(option);
    
    
    const optionHTML = `
    ${item.country}
    `;
    option.innerHTML = optionHTML;
  })

  select.addEventListener('change', function() {
    option = select.options[select.selectedIndex];
    async function getdropdownCountry() {
      const config = {
        headers: {
          "Accept": "application/json"
        }
      }
      
      const res = await fetch('https://disease.sh/v3/covid-19/countries/'+option.text, config);
      const result = await res.json();
      console.log(result.cases);
      console.log(option.text);
      const casescontainerHTML = `
      <div class="countrydata"><span class="countryinfo">Total Cases</span><span class="countryresult" style="color: blue;">${result.cases}</span></div>
      <div class="countrydata"><span class="countryinfo">Total Deaths</span><span class="countryresult" style="color: red;">${result.deaths}</span></div>
      <div class="countrydata"><span class="countryinfo">Total Recovered</span><span class="countryresult" style="color: limegreen;"> ${result.recovered}</span></div>
      <div class="countrydata"><span class="countryinfo">Total Active</span><span class="countryresult" style="color: rgb(36, 124, 255);">${result.active}</span></div>
      <div class="countrydata"><span class="countryinfo">New Cases</span><span class="countryresult" style="color: orange;">${result.todayCases}</span></div>
      <div class="countrydata"><span class="countryinfo">New Deaths</span><span class="countryresult" style="color: red;">${result.todayDeaths}</span></div>
    `;

  casescontainer.innerHTML = casescontainerHTML;
}
getdropdownCountry()})}



async function getCountryList() {
  const config = {
    headers: {
      "Accept": "application/json"
    }
  }
  const res = await fetch('https://disease.sh/v3/covid-19/countries', config);
  const result = await res.json();
  console.log(result);
  countryListDropdown(result);
  const casescontainerHTML = `
              <div class="countrydata"><span class="countryinfo">Total Cases</span><span class="countryresult" style="color: blue;">${result[0].cases}</span></div>
              <div class="countrydata"><span class="countryinfo">Total Deaths</span><span class="countryresult" style="color: red;">${result[0].deaths}</span></div>
              <div class="countrydata"><span class="countryinfo">Total Recovered</span><span class="countryresult" style="color: limegreen;"> ${result[0].recovered}</span></div>
              <div class="countrydata"><span class="countryinfo">Total Active</span><span class="countryresult" style="color: rgb(36, 124, 255);">${result[0].active}</span></div>
              <div class="countrydata"><span class="countryinfo">New Cases</span><span class="countryresult" style="color: orange;">${result[0].todayCases}</span></div>
              <div class="countrydata"><span class="countryinfo">New Deaths</span><span class="countryresult" style="color: red;">${result[0].todayDeaths}</span></div>
    `;

  casescontainer.innerHTML = casescontainerHTML;
}

getCountryList()