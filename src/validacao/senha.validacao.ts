import { FormControl, FormGroup } from '@angular/forms';
import { AbstractControl } from "@angular/forms";

export class PasswordValidator {

    static isMatching(AC: AbstractControl) {

        let password = AC.get('pass').value;
        let novaSenha = AC.get('novaSenhs').value;

        let confirmPassword = AC.get('confirmPass').value;

        if ((password != confirmPassword) || (novaSenha != confirmPassword))  {
            console.log("Senhas não conferem");
            console.log('Senha: ', password);
            console.log('Confirmar Senha: ', confirmPassword)
            AC.get('confirmPass').setErrors({ isMatching: false });
        } else {
            console.log("Senhas conferem");
            return null;
        }
    }
}