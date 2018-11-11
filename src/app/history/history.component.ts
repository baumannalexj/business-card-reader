import {Component, OnInit} from '@angular/core';
import {HistoryService} from "./history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['../app.component.css', './history.component.css']
})
export class HistoryComponent implements OnInit {

  searchHistory: any[];

  constructor(historyService: HistoryService) {


    historyService
      .getSearchHistory()
      .subscribe(history => {
        console.log(history);

        let historyAsArray = [];

        history.forEach((item) => {

          // let epochTimeMillis = Object.keys(timestampAsKey);
          let dateTime = new Date(item.timestamp*1000);
          // const searchText = Object.values(timestampAsKey);
          let searchTerm = item.searchTerm;
          historyAsArray.push(dateTime + ": " + searchTerm);
        });

        this.searchHistory = historyAsArray;
      });

  }

  ngOnInit() {
  }

}
