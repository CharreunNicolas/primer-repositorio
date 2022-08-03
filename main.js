$(document).ready(function(){
   const render = document.querySelector('.render-pokemones');
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
            img.className = "card-img-top caja-img bg-success";

            let titulo = document.createElement('div');
            titulo.innerHTML = pokemon.nombre;
            titulo.className = "card-body text-break text-center text-white text-uppercase";
         
            const divCaja = document.createElement('div');
            divCaja.className = "card caja-pokemon bg-success border border-1 my-1 container-fluid col-12 col-md-6 col-lg-4";
            
            divCaja.append(titulo);
            divCaja.append(img);
            render.appendChild(divCaja);

         });
//
         $.get(pokemon.url, function(response){
             //Llamado al DOM 
            const boton = document.getElementById('boton');

         boton.addEventListener('click', e=>{
             
             e.preventDefault();
             //Llamado al DOM 
             const inputPokemon = document.getElementById('input-pokemon');

             console.clear();
             console.log(inputPokemon.value);
         
             let buscarNombre = inputPokemon.value;

             if(buscarNombre === response.name || buscarNombre === response.name.toUpperCase()){
             
               const nombrePokemon = document.querySelector('.nombrePokemon');
               const atributoPokemon = document.getElementById('atributoPokemon');
               const img = document.getElementById('img');

               nombrePokemon.innerHTML = `¡Has atrapado a ${buscarNombre}!`;
               nombrePokemon.style.color = "green";
               atributoPokemon.innerHTML = "Habilidad: " + response.abilities[0].ability.name;
               img.src = response.sprites.front_default;
             }
            });
         });

        
      });
      
   });

});


   