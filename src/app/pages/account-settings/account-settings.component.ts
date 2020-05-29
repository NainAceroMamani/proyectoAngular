import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    // tslint:disable-next-line: variable-name
    private _ajustes: SettingsService  ) { }

  ngOnInit(): void {
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    // console.log(link);
    this.aplicarCheck(link);

    this._ajustes.aplicarTema( tema );
  }

  aplicarCheck( link: any ) {

    const selectores: any = document.getElementsByClassName('selector');

    for ( const ref of selectores ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  colocarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this._ajustes.ajustes.tema;
    for ( const ref of selectores ) {
      if ( ref.getAttribute('data-theme') === tema ) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
