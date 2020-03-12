import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HeroModel } from '../../models/hero.model';
import { FormGroup, Validators, FormBuilder,
         FormArray } from '@angular/forms';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html'
})
export class HeroFormComponent implements OnInit {
	@Input() hero: HeroModel;

	@Output() vForm: EventEmitter<any>;
	@Output() heroStatus: EventEmitter<any>;
	form: FormGroup;


  constructor(private fb: FormBuilder) { 
  	this.formCreate();
  	this.vForm = new EventEmitter();
  	this.heroStatus = new EventEmitter();
  }

  ngOnInit() {
  }

  //getters
  private get firebaseId(){
  	return this.form.get('id');
  }

  private get name(){
  	return this.form.get('name');
  }

  private get superPower(){
  	return this.form.get('superPower');
  }

 	private get status(){
  	return this.form.get('status');
  }

  get noValidId(){
  	return 	this.firebaseId.invalid &&
  					this.firebaseId.touched;
  }

  get noValidName(){
  	return 	this.name.invalid &&
  					this.name.touched;
  }

  get noValidSuperPower(){
  	return 	this.superPower.invalid &&
  					this.superPower.touched;
  }

  get noValidStatus(){
  	return 	this.status.invalid &&
  					this.status.touched;
  }

  formCreate() {
  	this.form = this.fb.group({
  		id: [''],
  		name: ['', 
  			[
  				Validators.required,
  				Validators.minLength(3)
  			]
  		],
  		superPower: ['', 
  			[
  				Validators.required,
  				Validators.minLength(3)
  			]
  		],
  		status: ['']
  	});
  } // end formCreate


  loadData(hero){
    this.form.reset(hero);
    console.log(hero);
  } //end loadData

  validateForm() {  
  	let result;	
		result = ( this.form.valid ) ? this.form : false;
		this.vForm.emit(result);
	}

	hStatus(){
		this.heroStatus.emit(true);
	}

	touchingInvalid() {
		return Object.values(this.form.controls).forEach( 
      control => {
        if( control instanceof FormGroup ) {
          Object.values(control.controls).forEach(
            control => { control.markAsTouched(); }
          )
        } else { control.markAsTouched(); }
      }
    )
  } //end touchingInvalid
}
