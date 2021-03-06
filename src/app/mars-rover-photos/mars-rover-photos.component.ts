import { Component, Input, OnInit } from '@angular/core';
import { CuriositySolService } from '../curiosity-sol.service';
import { MarsRoverPhotosService } from '../mars-rover-photos.service';

@Component({
  selector: 'app-mars-rover-photos',
  templateUrl: './mars-rover-photos.component.html',
  styleUrls: ['./mars-rover-photos.component.css']
})
export class MarsRoverPhotosComponent implements OnInit {

  public curiosityData: any;
  public curiosityImageUrl: any;
  public curiositySol: any;
  public curiosityEarthDate: any;

  constructor(private service: MarsRoverPhotosService, private solService: CuriositySolService) { }

  @Input()
  inputCuriositySol: any;

  @Input()
  random!: boolean;

  ngOnInit(): void {
    this.solService.getLatestMissionUpdateData().subscribe(data => {
      let jsonObject = JSON.parse(JSON.stringify(data));
      if (this.random == true) {
        this.curiositySol = Math.floor((Math.random() * jsonObject.rover.max_sol));
      } else {
        if (this.inputCuriositySol) {
          this.curiositySol = this.inputCuriositySol
        }
        else {
          this.curiositySol = jsonObject.rover.max_sol;
        }
      }

      console.log("SOL: " + this.curiositySol);
      this.service.getCuriosityPhotoForSol(this.curiositySol).subscribe(data => {
        this.curiosityData = data;
        let jsonObject = JSON.parse(JSON.stringify(this.curiosityData));
        this.curiosityImageUrl = jsonObject.photos[0].img_src;
        this.curiosityEarthDate = jsonObject.photos[0].earth_date;
      });
      // this.service.getCuriosityPhotoSol1000().subscribe(data => {
      //   this.curiosityData = data;
      //   let jsonObject = JSON.parse(JSON.stringify(this.curiosityData));
      //   this.curiosityImageUrl = jsonObject.photos[1].img_src;
      // })
    });

  }

}
