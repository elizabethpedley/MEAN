import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor(private _http: HttpClient) {
    this.getPoke(1);
   }

  compareAbilities(data){

    for(var i=0;i<data.abilities.length;i++){
      let ability;
      console.log(data.abilities[i].ability.url)
      ability = this._http.get(data.abilities[i].ability.url);
      ability.subscribe(res =>{
        console.log(`${res.pokemon.length} other pokemon share the ability ${res.name}`)
      })
    }
  }

  getPoke(num){
    let bulbasaur = this._http.get('https://pokeapi.co/api/v2/pokemon/'+num+'/');

    bulbasaur.subscribe(data =>{
      this.compareAbilities(data);
      console.log(data);
    })
  }
}
