$(document).ready(function(){
   const render = document.getElementById('render-pokemones');
   const url = "https://pokeapi.co/api/v2/pokemon";

   $.get(url, function(data){
      let pokemones = [];   
      for(let i = 0; i<data.results.length; i++){
         let pokemon = {
            'nombre': data.results[i].name,
            'url': data.results[i].url,
            'imagen': ''
         };
         pokemones.push(pokemon);
      }

      
      pokemones.forEach((pokemon)=>{
         $.get(pokemon.url, function(response){
                        
            pokemon.imagen = response.sprites.front_default;
             
            
            let img = document.createElement('img');
            img.src = pokemon.imagen;
            img.className = "img-pokemon";
            let titulo = document.createElement('h2');
            titulo.innerHTML = pokemon.nombre;
            titulo.className = "titulo-pokemon text-break";
            const divCaja = document.createElement('div');
            divCaja.className = "div-pokemon";

            divCaja.append(titulo);
            divCaja.append(img);
            render.appendChild(divCaja);
         });

         $.get(pokemon.url, function(response){
             //Box de busqueda
             const boton = document.getElementById('boton');
 
             boton.addEventListener('click', e=>{
             const inputPokemon = document.getElementById('input-pokemon');
             const imgPokemon = document.getElementById('imagen-buscador');
             const namePokemon = document.getElementById('nombre-buscador');
             const habilidadPokemon = document.getElementById('habilidad-buscador');
             let buscarNombre = inputPokemon.value;
 
             if(buscarNombre === response.name){
               imgPokemon.src = response.sprites.front_default;
               namePokemon.innerHTML = response.name;
               habilidadPokemon.innerHTML = "ABILITY: " + response.abilities[0].ability.name;                 
             }
              //console.log(response.abilities[0].ability.name);
             });
         })

        
      });
      
   });

});


   