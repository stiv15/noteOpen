import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotasService } from "../../services/notas.service";

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

	nota = {id: null, titulo: null, descripcion: null};
	id = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public notasService: NotasService) {
  	this.id = navParams.get('id');
    if(this.id != 0){
      notasService.getNota(this.id)
        .valueChanges()
        .subscribe(nota => {
          //this.nota=nota;
          this.nota.id=nota['id'];
          this.nota.titulo=nota['titulo'];
          this.nota.descripcion=nota['descripcion'];
        });
           
    }
  }
  addNota(){

    if(this.id != 0){
      //Edición Nota
      this.notasService.editNota(this.nota);
      alert('Che buono!! Nota editada con éxito!');
    } else {
      //Crear Nota
      this.nota.id = Date.now();
      this.notasService.createNota(this.nota);
      alert('Che buono!! Nota creada con éxito!');
    }

    this.navCtrl.pop();

  }
  deleteNota(){
    this.notasService.deleteNota(this.nota);
    alert('Che buono!! Nota eliminada con éxito!');
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallePage');
  }

}
