import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../login/auth.service";
import {HistoryService} from "../history/history.service";


@Injectable({
  providedIn: 'root'
})
export class WikipediaService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private historyService: HistoryService) {
  }

  searchWikipedia(queryText: string) {
    var queryUrl =
      "https://en.wikipedia.org/w/api.php" +
      "?action=query" +
      "&format=json" +
      "&list=search" +
      "&origin=*" +
      `&srsearch=${queryText}`;



    let options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    this.historyService.addSearchHistory(queryText);

    return this.httpClient.get(queryUrl, options)
  }

}
