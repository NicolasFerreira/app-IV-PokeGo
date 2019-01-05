var list = document.getElementById('list')
var btn = document.getElementById('btn')

var PokemonsTemp = []
var PokemonsFinal = []

function myList(){
  var result = list.value.split('  ');

  result.forEach(ligne => {
    var result2 = ligne.split(',')
    PokemonsTemp.push(result2)
  });

  for (let index = 1; index < PokemonsTemp.length; index++) {
    const element = PokemonsTemp[index];
    let json = {
      "Name":element[0],
      "Number":element[1],
      "CP":element[2],
      "HP":element[3],
      "Move1":element[4],
      "Move2":element[5],
      "Height":element[6],
      "Weight":element[7],
      "Attack":element[8],
      "Defence":element[9],
      "Stamina":element[10],
      "Total":element[11],
      "Date":element[12],
      "Form":element[13],
      "Shiny":element[14],
      "Level":element[15],
      "Lucky":element[16],
      "Trade":element[17]
    }
    PokemonsFinal.push(json)
  }
  console.log(PokemonsFinal)

  // number sort
  PokemonsFinal.sort(function (a, b) {
    return b.CP - a.CP
  });
  /*  PokemonsFinal.sort(function (a, b) {
    return b.Total - a.Total
  }); */
  PokemonsFinal.sort(function (a, b) {
    return a.Number - b.Number
  });

  // recent sort
/*   PokemonsFinal.sort(function (a, b) {
    return b.Date - a.Date
  }); */

  // IV sort 
 /*  PokemonsFinal.sort(function (a, b) {
    return b.Total - a.Total
  }); */

  console.log(PokemonsFinal)
  displayList()
}

function displayList(){
  if(PokemonsFinal.length > 0){
    var ul = document.getElementById('display-list')

    for (let index = 0; index < PokemonsFinal.length; index++) {
      let li = document.createElement("li");
      const element = PokemonsFinal[index]

      // PC
      let pc1 = document.createElement("p")
      let pc2 = document.createElement("p")
      let pc = document.createElement("div")
      pc.setAttribute('class','div-pc')
      pc1.innerHTML = 'PC'
      pc2.innerHTML = element.CP
      pc.appendChild(pc1)
      pc.appendChild(pc2)

      // IMG
      let img = document.createElement("img")
      if(element.Form > 0){ // forme alola image
        img.setAttribute('src','https://www.pokebip.com/pages/jeuxvideo/pokemon_go/images/pokemon/'+ element.Number.padStart(3, '0') +'a.png')
      }else if(element.Shiny > 0) {
        img.setAttribute('src','https://www.pokebip.com/pages/jeuxvideo/pokemon_go/images/shinies/'+ element.Number.padStart(3, '0') +'.png')
      }else {
        img.setAttribute('src','https://www.pokebip.com/pages/jeuxvideo/pokemon_go/images/pokemon/'+ element.Number.padStart(3, '0') +'.png')
      }
      img.setAttribute('class','img-pokemon')

      //Name
      let name = document.createElement("p")
      name.innerHTML = element.Name

      // IV 
      let IV = document.createElement("p")
      let pokeIV = (element.Total*100/45).toFixed(0)
      IV.innerHTML = element.Attack + ' / ' + element.Defence + ' / ' + element.Stamina + ' => ' + pokeIV + '%'


      if(pokeIV >= 90){
        li.setAttribute('class','bg-best')
      }else if(pokeIV < 90 && pokeIV >= 80){
        li.setAttribute('class','bg-medium')
      }else{
        li.setAttribute('class','bg-bad')
      }
      // final result
      li.appendChild(pc)
      li.appendChild(img)
      li.appendChild(name)
      li.appendChild(IV)
      ul.appendChild(li)
      
      
      
    }

  }
}



document.getElementById('search').addEventListener('change',function(){
  console.log(document.getElementById('search').value)
})