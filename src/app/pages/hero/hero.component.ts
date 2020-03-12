import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HeroModel } from '../../models/hero.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { AlertsService } from '../../services/alerts.service';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html'
})
export class HeroComponent implements AfterViewInit, OnInit {
	hero = new HeroModel();
	@ViewChild(HeroFormComponent,{read:false,static: false}) form: HeroFormComponent;

  constructor(
  	private _heroesService: HeroesService,
  	private _alert: AlertsService,
    private route: ActivatedRoute
  ) { 
  	this.getHero();
  }

  ngOnInit(){}

  ngAfterViewInit(){}

  getHero(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id !== 'new'){
      this._heroesService.getHero(id)
          .subscribe( (data: HeroModel) => {
            console.log(data);
            this.hero = data;
            this.hero.id = id;
            this.form.loadData(this.hero);
      });
    } else {
      this.hero = new HeroModel();
    }
  }

  heroStatus(){
  	this.hero.status = !this.hero.status;
  }

  insertHero(vForm: FormGroup | boolean) {
  	if(vForm){
  		vForm['value'].status = this.hero.status;
	  	this.hero = vForm['value'];

	  	this._alert.loading('Wait a moment','Save information');

	  	let petition: Observable<any>;

	  	(this.hero.id) ? petition = this.update() :
	  									 petition = this.save();

  		petition.subscribe( data => {
				this.form.loadData(this.hero);
				this._alert.success(this.hero.name, 
														'The hero was updated');
			});

  	} else {
  		this.form.touchingInvalid();
  	}
  }//end insertHero

  save() {
  	return this._heroesService.createHero(this.hero);
  }//end save

  update() {
  	return this._heroesService.updateHero(this.hero);
  }//end update

}//end class
