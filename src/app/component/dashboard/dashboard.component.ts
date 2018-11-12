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

  public textElementsByArea: Array<any>;

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


  public constructor(private textReaderService: TextReaderService) {
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
  }

  public captureImage() {
    var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 640, 480);
    this.captures.push(this.canvas.nativeElement.toDataURL("image/png"));

    console.log(this.captures);


  }

  textDetection(capture: string) {
    this.base64Image = capture.split("base64,")[1];

    // console.log(base64Image);

    this.textReaderService
      .getText(this.base64Image)
      .subscribe((response: any) => {
        let responses = response.responses || [];


        try {
          this.cardText = responses[0];

          // console.log(this.cardText);
          this.textElementsByArea = responses[0].textAnnotations[0].description.split("\n");
          console.log(this.textElementsByArea);


          this.captures = [capture];
        } catch (error) {
          alert("Unable to parse text. Try choosing another image with clearer text.")
        }



      });
  }

  saveBusinessCard(userForm: NgForm) {

    let businessCard = {};

    [document.querySelectorAll(".form-control.form-control-lg option[selected]")][0]
    // @ts-ignore
      .forEach((e, i) => {
        // @ts-ignore
        businessCard[e.value] = [document.querySelectorAll("input[id*='input']")][0][i].value
      });

    businessCard["base64Image"] = this.base64Image;

    this.textReaderService
      .saveBusinessCard(businessCard)
      .then(result => {
        console.log("card saved. result:" + result);
      })
      .catch(error => console.error(error));

    console.log(businessCard);

  }
}
