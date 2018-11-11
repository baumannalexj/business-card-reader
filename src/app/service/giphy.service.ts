import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {HistoryService} from "../history/history.service";


@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  private giphyApiKey: string;
  private giphyBaseUrl: string;


  constructor(public httpClient: HttpClient,
              public historyService: HistoryService) {

    this.giphyApiKey = environment.giphyConfig.apiKey;
    this.giphyBaseUrl = environment.giphyConfig.baseUrl;
  }


  searchGiphy(searchText: string): Observable<any> {
    var queryUrl =
      `${this.giphyBaseUrl}` +
      `?api_key=${this.giphyApiKey}` +
      `&q=${searchText}` +
      `&limit=5` +
      `&offset=0` +
      `&rating=G` +
      `&lang=en`;

    this.historyService.addSearchHistory(searchText);

    return this.httpClient.get(queryUrl);
  }


}
