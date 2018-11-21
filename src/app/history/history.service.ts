import {Injectable} from '@angular/core';
import {AuthService} from "../login/auth.service";
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private searchHistoryRef: any;
  private CURRENT_SESSION_HISTORY_PATH: string;
  public adminSubscription: any;

  constructor(private authService: AuthService,
              private db: AngularFireDatabase) {

    this.CURRENT_SESSION_HISTORY_PATH = `/currentSession/businesscardreader/${this.authService.userUid}/searches`;

    console.log(this.CURRENT_SESSION_HISTORY_PATH);

    this.searchHistoryRef =
      this.db.list(this.CURRENT_SESSION_HISTORY_PATH);

    this.adminSubscription = this.authService.adminSubscription
  }

  getSearchHistory() {
    return this.searchHistoryRef.valueChanges();
  }

  addHistory(searchTerm) {

    this.db
      .object(this.CURRENT_SESSION_HISTORY_PATH)
      .update({
        [Date.now()]: {
          timestamp: Date.now(),
          searchTerm: searchTerm
        }
      });
  }
}
