import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>

    <ul class="heroes">
      <li *ngFor="let hero of heroes">
        {{hero.text}}
      </li>
    </ul>
    <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  `,
    styles: [`
    
  `],
    providers: [HeroService]
})
export class AppComponent implements OnInit {
    errorMessage: string;
    title = "Today\'s Tweets";
    heroes: Hero[];

    selectedHero: Hero;
    constructor(private heroService: HeroService) { }
    getHeroes(): void {
        // this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    getTweets(): void {
        // this.heroService.getTweets().then(heroes => this.heroes = heroes);
        this.heroService.getTweets()
            .then(
                heroes => this.heroes = heroes,
                error =>  this.errorMessage = <any>error);

    }

    ngOnInit(): void {
        //this.getHeroes();
        this.getTweets();
    }
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
}
