import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import * as moment from 'moment';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { LoadingProvider } from '../../providers/loading';
import { AppState } from '../../app/app.service';
import{colors} from '../calendario/colors';
@IonicPage()
@Component({
  selector: 'page-calendario',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'calendario.html',
})
export class calendarioPage implements OnInit {

  products;
  modal = false;

  public date = moment();
  public dateForm: FormGroup;

  public isReserved = null;
  @Input() ngClass: any;
  public daysArr;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private fb: FormBuilder
  ) {
    this.initDateRange();
    this.getProducts();
    this.loadingProvider.present();
    this.modal = this.navParams.get('modal');
    this.date.locale('pt-br');
  }
//formulario
  public initDateRange() {
     this.dateForm = this.fb.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    });
  }
  //calendario a partir da data atual
  
  public ngOnInit() {
    this.daysArr = this.createCalendar(this.date);
  }

public  createCalendar(month) {
    let firstDay = moment(month).startOf('M');
    moment.locale('pt-br')
    let days = Array.apply(null, { length: month.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).locale('pt-br').add(n, 'd');
      });

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  } 
  public todayCheck(day) {
    if (!day) {
      return false;
    }
    return moment().format('L') === day.format('L').locale('pt-br');
  }

  public reserve() {
    if (!this.dateForm.valid) {
      return;
    }
    let dateFromMoment = this.dateForm.value.dateFrom;
    let dateToMoment = this.dateForm.value.dateTo;
    this.isReserved = `Reserved from ${dateFromMoment} to ${dateToMoment}`;
  }

  public isSelected(day) {
    if (!day) {
      return false;
    }
    let dateFromMoment = moment(this.dateForm.value.dateFrom, 'MM/DD/YYYY');
    let dateToMoment = moment(this.dateForm.value.dateTo, 'MM/DD/YYYY');
    if (this.dateForm.valid) {
      return (
        dateFromMoment.isSameOrBefore(day) && dateToMoment.isSameOrAfter(day)
      );
    }
    if (this.dateForm.get('dateFrom').valid) {
      return dateFromMoment.locale('pt-br').isSame(day);
    }
  }

  public selectedDate(day) {
    let dayFormatted = day.format('MM/DD/YYYY');
    if (this.dateForm.valid) {
      this.dateForm.setValue({ dateFrom: null, dateTo: null });
      return;
    }
    if (!this.dateForm.get('dateFrom').value) {
      this.dateForm.get('dateFrom').patchValue(dayFormatted);
    } else {
      this.dateForm.get('dateTo').patchValue(dayFormatted);
    }
  }


  //Refresh page
  refresh(refresher) {
    refresher.complete();
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  //Close modal
  close() {
    this.viewCtrl.dismiss()
  }

  //Open product page
  open(p) {
    let modal = this.modalCtrl.create('ProductPage', { product: p });
    modal.present();
  }

  //Open cart
  openCart() {
    let modal = this.modalCtrl.create('CartPage', { modal: true });
    modal.present();
  }

  //List all produtcs to slides
  getProducts() {
    this.firebaseProvider.getProducts()
      .subscribe((res) => {
        this.loadingProvider.dismiss();
        this.products = res;
      })
  }

}
