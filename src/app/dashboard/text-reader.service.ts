import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from "../login/auth.service";
import {HistoryService} from "../history/history.service";
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TextReaderService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private historyService: HistoryService,
              private db: AngularFireDatabase) {
  }

  getText(base64Image: string) {
    var postUrl =
      `${environment.googleCloudConfig.cloudVision.baseUrl}` +
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

    this.historyService.addHistory("User performed text detection.");

    return this.httpClient.post(postUrl, requestBody, options)
  }

  saveBusinessCard(businessCardWithBase64Image) {

    this.historyService.addHistory(`User saved business card with email:${businessCardWithBase64Image.email}`);

    return this.db
      .object(`/users/${this.authService.userUid}/businessCards`)
      .update({[businessCardWithBase64Image.name]: businessCardWithBase64Image});
  }

  getBusinessCardByFullName(name: string) {
    return this.db.list(`/users/${this.authService.userUid}/businessCards`,
      (ref) =>
        ref
          .orderByChild("name")
          .equalTo(name)

      ).valueChanges()

  }
}
