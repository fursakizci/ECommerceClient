import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { NgxSpinnerService} from 'ngx-spinner';
declare var $:any;
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-CommerceAppCli';
  constructor(){}
  // constructor(private toastr: CustomToastrService,private spinner: NgxSpinnerService){
  //     toastr.message('Hello world!', 'Toastr fun!',ToastrMessageType.Info,{
  //       messageType: ToastrMessageType.Error,
  //       position:ToastrPosition.BottomFullWidth
  //     });
  //     this.spinner.show("s3");

  //     setTimeout(() => {
  //       /** spinner ends after 5 seconds */
  //       this.spinner.hide("s3");
  //     }, 5000);
  
  }

  
  



