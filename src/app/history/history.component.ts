import {Component, OnInit} from '@angular/core';
import {HistoryService} from "./history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['../app.component.css', './history.component.css']
})
export class HistoryComponent implements OnInit {

  searchHistory: any[];
  isAdmin: any;

  constructor(historyService: HistoryService) {

    historyService.adminSubscription
      .subscribe((adminResponse) => {
        console.log(`admin response: ${adminResponse}`);

        this.isAdmin = (adminResponse && Object.keys(adminResponse).length > 0);

        if (this.isAdmin) {
          historyService
            .getSearchHistory()
            .subscribe(history => {
              console.log(history);

              let historyAsArray = [];

              history.forEach((item) => {

                // let epochTimeMillis = Object.keys(timestampAsKey);
                let dateTime = new Date(item.timestamp * 1000);
                // const searchText = Object.values(timestampAsKey);
                let searchTerm = item.searchTerm;
                historyAsArray.push(dateTime + ": " + searchTerm);
              });

              this.searchHistory = historyAsArray;
            });
        } else {
          console.log("is not admin");
          alert("This page is restricted to admins");
        }

      });
  }

  ngOnInit() {
  }

}
