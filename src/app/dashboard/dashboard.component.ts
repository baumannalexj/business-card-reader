import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TextReaderService} from "./text-reader.service";
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild("video")
  public video: ElementRef;

  @ViewChild("canvas")
  public canvas: ElementRef;

  public captures: Array<any>;


  public cardText: {};

  public textElementsByArea = [];

  public base64Image: string;

  public textTypeOptions = [
    "phone",
    "name",
    "address",
    "email",
    "title",
    "companyPhone",
    "companyName",
    "companyAddress",
    "companyDescription",
    "companyWebsite",
    "miscellaneous"
  ];

  public constructor(private businessCardService: TextReaderService) {
    this.captures = [];
  }


  public ngOnInit() {
  }

  public ngAfterViewInit() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        this.video.nativeElement.src = window.URL.createObjectURL(stream);
        this.video.nativeElement.play();
      });
    }
  }

  public clear() {
    this.captures = [];
    this.textElementsByArea = [];
  }

  public captureImage() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    console.log(this.captures);


  }

  textDetection(capture: string) {
    this.base64Image = capture.split("base64,")[1];

    // console.log(base64Image);

    this.businessCardService
      .getText(this.base64Image)
      .subscribe((response: any) => {
        let responses = response.responses || [];


        try {
          this.cardText = responses[0];

          let cardTextByArea = responses[0].textAnnotations[0].description.split("\n");


          console.log(cardTextByArea);

          var textElements = [];
          this.textTypeOptions.forEach((fieldName, index) => {

            textElements[fieldName] = "";

            if (cardTextByArea[index]) {
              textElements[fieldName] = cardTextByArea[index];
            }


          });


          this.textElementsByArea = textElements;
          console.log(this.textElementsByArea);


          this.captures = [capture];
        } catch (error) {
          console.error(error);
          alert("Unable to parse text. Try choosing another image with clearer text.")
        }


      });
  }

  saveBusinessCard(userForm: NgForm) {
    
    let businessCard = userForm.value;

    Object.keys(businessCard).forEach(key => {
      businessCard[key] = businessCard[key].toLowerCase();

      if (typeof businessCard[key] == 'undefined'){
        businessCard[key] = "";
      }
    });

    businessCard["base64Image"] = this.base64Image;

    this.businessCardService
      .saveBusinessCard(businessCard)
      .then(result => {
        console.log("card saved. result:" + result);
        alert("card was saved!");
      })
      .catch(error => console.error(error));

    console.log(businessCard);

  }

  getCardFromSearch(name: string) {
    this.clear();
    this.businessCardService.getBusinessCardByFullName(name)
      .subscribe((queryResult: any) => {
        let businessCard = queryResult[0];

        if (!businessCard) {
          alert(`no business card found for \"${name}\"`);
          return;
        }


        console.log(businessCard);
        console.log(this.textElementsByArea);


        let textElements = [];
        this.textTypeOptions.map(fieldName => {
          try {
            textElements[fieldName] = businessCard[fieldName];
          } catch (error) {
            console.error(error);
          }

        });

        this.textElementsByArea = textElements;

        console.log(this.textElementsByArea);
        this.captures.push("data:image/png;base64," + businessCard.base64Image);


      })
  }
}
