import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroModel } from '../../models/hero.model';
import { Router } from '@angular/router';
import { AlertsService } from '../../services/alerts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {
	heroes: Array<HeroModel>;
	loading: boolean;

  constructor(
  	private _heroesService: HeroesService,
  	private _router: Router,
    private _alert: AlertsService
  ) { 
  	this.getHeroes();
  	this.loading = true;
  }

  ngOnInit() {
  }

  getHeroes(){
  	this._heroesService.getHeroes()
  			.subscribe((data: Array<HeroModel>) => {
  				console.log(data)
  				this.heroes = data;
  				this.loading = false;
  			});
  }

  deleteHero(id: string, i: number){
    this._alert.question('You are going to eliminate a hero',
                         'Are you sure?')
    .then( res => {
      if (res.value) {
        this._alert.loading('Loading','Wait a moment');
        this._heroesService.delete(id).subscribe( data => {
          this.heroes.splice(i,1);
          this._alert.close();
        }); 
      } else { false }      
    }).catch(err => { console.log(err); });
  }
}
