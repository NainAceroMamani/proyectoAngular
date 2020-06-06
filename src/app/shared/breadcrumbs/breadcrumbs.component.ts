import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {

  public titulo: string;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta ) {

    this.getDataRoute().subscribe( data => {
      // console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );

      this.meta.addTags([
        { name: 'name', content: this.titulo },
        { property: 'og:title', content: 'Feria Tacna' },
        { property: 'og:type', content: 'website' },
        { charset: 'UTF-8' }
      ]);

    });
  }

  ngOnInit(): void {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }

}
