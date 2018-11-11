import {Component, OnInit} from '@angular/core';
import {GiphyService} from '../../service/giphy.service';

@Component({
  selector: 'app-giphy',
  templateUrl: './giphy.component.html',
  styleUrls: ['./giphy.component.css']
})
export class GiphyComponent implements OnInit {
  gifSourceUrl: any = "";

  constructor(private giphyService: GiphyService) {
  }

  ngOnInit() {
  }

  getGiphyFromSearch(queryText: string) {

    console.log(`searching for ${queryText}`);
    this.giphyService
      .searchGiphy(queryText)
      .subscribe((response: any) => {

          console.log(response);
          var data = response.data;

          var firstDownsizedResult;
          if (data.length >0 ) {
            firstDownsizedResult = data[0].images.downsized;
            this.gifSourceUrl = firstDownsizedResult.url;
          } else {
            alert("No gif found. Please try another search.");
          }
        }
      )
    ;
  }
}
