import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroModel } from '../models/hero.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
	private url:string = 'https://heroapp-1d591.firebaseio.com';

  constructor(
  	private http: HttpClient
  ) { }

  getHeroes(){
    return  this.http.get(`${this.url}/heroes.json`)
                .pipe(
                  map( this.heroesArr )
                );
  }

  getHero(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  private heroesArr( heroesObj: Object){
    if (heroesObj === null) {return []};
    
    const heroes: Array<HeroModel> = [];

    Object.keys(heroesObj).forEach( key => {
      const hero: HeroModel = heroesObj[key];
      hero.id = key;
      heroes.push(hero);
    });

    return heroes;
  }

  createHero(hero: HeroModel) {
  	return 	this.http.post(`${this.url}/heroes.json`, hero)
  					.pipe(
  						map(resp => {
  							hero.id = resp['name'];
  							return hero;
  						})
  					);
  }//end createHero

  updateHero(hero: HeroModel) {
  	const id = hero['id'];
  	const heroTemp = {
  		...hero
  	};

  	delete heroTemp.id;
  	
  	return this.http.put(`${this.url}/heroes/${id}.json`, 
  												heroTemp);
  }//end updateHero

  delete(id: string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
