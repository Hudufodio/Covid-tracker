
// ajax table

$(document).ready(async function () {
  let mydata = await fetch("https://disease.sh/v3/covid-19/countries?sort=cases")
  .then(response => response.json());
    $('#example').DataTable({
      data : mydata,
      columns : [
          { data : 'countryInfo.flag', 
            render: function (data, type){
                return `<img class="imagetable" src="${data}">` 
              }
          },
          {'data' : 'country'},
          {'data' : 'cases'},

          {'data' : 'oneCasePerPeople'},
          {'data' : 'deaths'},
          {'data' : 'oneDeathPerPeople'}, 
          {'data' : 'recovered'},
          {'data' : 'active'},
          {'data' : 'critical'},
          {'data' : 'tests'},
          

      ]
    });
        

  } );

  // fin ajax table