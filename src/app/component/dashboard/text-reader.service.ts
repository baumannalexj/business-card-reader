import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../../login/auth.service";
import {HistoryService} from "../../history/history.service";
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TextReaderService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private historyService: HistoryService) {
  }

  getText(base64Image: string) {
    var postUrl =
      "https://vision.googleapis.com/v1/images:annotate" +
      `?key=${environment.googleCloudConfig.apiKey}`;


    let requestBody = {
      "requests": [
        {
          "image": {
            "content": base64Image
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    };


    let options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    //TODO firebase is locked due to too much data
    this.historyService.addSearchHistory(base64Image);

    return this.httpClient.post(postUrl, requestBody, options)
  }
}
