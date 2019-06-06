import {Component, ViewChild,forwardRef,Output,EventEmitter,OnInit,Input} from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  Slides,
  DateTime
} from "ionic-angular";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import moment, { Moment } from 'moment';

@IonicPage()
@Component({
  selector: "page-slideCronograma",
  templateUrl: "slideCronograma.html",
})
export class slideCronogramaPage {
  
}