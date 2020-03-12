import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor() { }

  loading(title: string, text: string){
  	Swal.fire({
  		title,
  		text,
  		icon: 'info',
  		allowOutsideClick: false
  	});
  	Swal.showLoading();
  }//end loading

  success(title: string, text: string){
  	Swal.fire({
			title,
			text,
			icon: 'success'
		});
  }//end success

  question(title: string, text: string){
    return Swal.fire({
      title,
      text,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true    
    });
  }//end delete

  close(){
    Swal.close();
  }
}
