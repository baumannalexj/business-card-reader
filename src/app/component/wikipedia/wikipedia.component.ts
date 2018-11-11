import {Component, OnInit} from '@angular/core';
import {WikipediaService} from '../../service/wikipedia.service';

@Component({
  selector: 'app-wikipedia',
  templateUrl: './wikipedia.component.html',
  styleUrls: ['./wikipedia.component.css']
})
export class WikipediaComponent implements OnInit {
  public results: any;

  constructor(private wikipediaService: WikipediaService) {
  }

  ngOnInit() {
  }


  getWikipediaSearchResults(queryText: string) {

    console.log(`searching for ${queryText}`);

    this.wikipediaService
      .searchWikipedia(queryText)
      .subscribe((response: any) => {
          this.results = response.query.search;
          console.log(response.query.search);
        }
      );

  }

}
