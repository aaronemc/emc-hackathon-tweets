import { Component, OnInit } from '@angular/core';
import { Tweet } from './tweet';
import { TweetService } from './tweet.service';

@Component({
    selector: 'my-app',
    template: `
    <h1>{{title}}</h1>

    <ul class="tweets">
      <li *ngFor="let tweet of tweets">
        {{tweet.text}}
      </li>
    </ul>
  `,
    styles: [`
    
  `],
    providers: [TweetService]
})
export class AppComponent implements OnInit {
    errorMessage: string;
    title = "Today\'s Tweets";
    tweets: Tweet[];

    constructor(private tweetService: TweetService) { }

    getTweets(): void {

        this.tweetService.getTweets()
            .then(
                tweets => this.tweets = tweets,
                error =>  this.errorMessage = <any>error);

    }

    ngOnInit(): void {
        this.getTweets();
    }
}
