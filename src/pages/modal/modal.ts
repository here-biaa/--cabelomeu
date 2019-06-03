import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Validators, FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { PasswordValidator } from '../../validacao/senha.validacao';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  validacao_form: FormGroup;
  
  user = {
    pass: '',
    uid: '',
   };

  constructor(
    private view: ViewController,
    private storage: Storage,
    private formBuilder: FormBuilder,
    ) 
    {
      this.buildForm();
      this.getCurrentUser();
    }
  buildForm() {
    this.validacao_form = this.formBuilder.group({
      pass: new FormControl('', Validators.compose([
        // A senha deve ter 8 caracteres sendo 1 letra maius..(A), 1 minus(a), 1 num..
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      novaSenha: new FormControl('', Validators.compose([
        // A senha deve ter 8 caracteres sendo 1 letra maius..(A), 1 minus(a), 1 num..
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),

      confirmPass: new FormControl('', Validators.compose([
        // A senha deve ter 8 caracteres sendo 1 letra maius..(A), 1 minus(a), 1 num..
        Validators.minLength(8),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]))
    },{
      Validators: PasswordValidator.isMatching
    })};

  
  closeModal(){
    this.view.dismiss();
  }
  //Buscar dados do usuario no storage
  getCurrentUser() {
    this.storage.get('user_cabelomeu')
      .then((user) => {
        this.user = user;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

}
