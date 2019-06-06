import { Component, ChangeDetectorRef, Input, Output, EventEmitter, forwardRef, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CalendarDay, CalendarMonth, CalendarOriginal, PickMode, DayConfig, Cronograma, CalendarComponentOptions } from '../calendar.model'
import { defaults, pickModes } from "../config";
import moment, { Moment } from 'moment';
import { CalendarController } from '../calendar.controller';
import { LoadingProvider } from '../../../providers/loading';
import { FirebaseProvider } from '../../../providers/firebase';
import { Storage } from "@ionic/storage";

export const MONTH_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MonthComponent),
  multi: true
};

@Component({
  selector: 'ion-calendar-month',
  providers: [MONTH_VALUE_ACCESSOR],
  template: `
    <div [class]="color">
      <ng-template [ngIf]="!_isRange" [ngIfElse]="rangeBox">
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month.days" [ngForTrackBy]="trackByTime">
            <div class="days">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.on-selected]="isSelected(day.time)"
                        [class]="'days-btn ' + day.hidratacao"
                        [class]="'days-btn ' + day.nutricao"
                        [class]="'days-btn ' + day.reconstrucao"
                        

                        >
                  <p>{{day.title}}</p>
                  <small *ngIf="day.subTitle">{{day?.subTitle}}</small>
            
                </button>
              </ng-container>
            </div>
          </ng-template>
        </div>
      </ng-template>

      <ng-template #rangeBox>
        <div class="days-box">
          <ng-template ngFor let-day [ngForOf]="month.days" [ngForTrackBy]="trackByTime">
            <div class="days"
                 [class.startSelection]="isStartSelection(day)"
                 [class.endSelection]="isEndSelection(day)"
                 [class.is-first-wrap]="day?.isFirst"
                 [class.is-last-wrap]="day?.isLast"
                 [class.between]="isBetween(day)">
              <ng-container *ngIf="day">
                <button type='button'
                        [class]="'days-btn ' + day.cssClass"
                        [class.today]="day.isToday"
                        (click)="onSelected(day)"
                        [class.marked]="day.marked"
                        [class.last-month-day]="day.isLastMonth"
                        [class.next-month-day]="day.isNextMonth"
                        [class.is-first]="day.isFirst"
                        [class.is-last]="day.isLast"
                        [class.on-selected]="true"
                        >
                  <p>{{day.title}}</p>
                   <b [hidden]="!eventos" [ngStyle]="{'background-color':agenda?.color}"></b>
                  <small *ngIf="day.subTitle">{{day?.subTitle}}</small>
                  <p *ngIf="day.produtos">   <ion-icon name="flask"></ion-icon></p>
                
                </button>
              </ng-container>
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `
})
export class MonthComponent implements ControlValueAccessor, AfterViewInit {
  hidrata = false;
  nutri = true;
  reconstroi= true;
  typeDays = [];
  produtos;
  user;
  @Input() month: CalendarMonth;
  @Input() pickMode: PickMode;
  @Input() isSaveHistory: boolean;
  @Input() id: any;
  @Input() readonly = false;
  @Input() color: string = defaults.COLOR;
  @Input() date: string;
  @Input() dateMonth: Moment;
  @Input() etapas: Cronograma[] = [];

  @Output() onChange: EventEmitter<CalendarDay[]> = new EventEmitter();
  @Output() onSelect: EventEmitter<CalendarDay> = new EventEmitter();
  @Output() onSelectStart: EventEmitter<CalendarDay> = new EventEmitter();
  @Output() onSelectEnd: EventEmitter<CalendarDay> = new EventEmitter();
  @Output() onHidratacao: EventEmitter<CalendarDay> = new EventEmitter();

  _date: Array<CalendarDay | null> = [null, null];
  dias : CalendarDay;
  _isInit = false;
  _onChanged: Function;
  _onTouched: Function;

  get _isRange(): boolean {
    return this.pickMode === pickModes.RANGE
  }

  constructor(
    public ref: ChangeDetectorRef, 
    private calendarCtrl: CalendarController,
    private firebaseProvider: FirebaseProvider,
    private loadingProvider: LoadingProvider,
    private storage: Storage,

    ) {
    this.getCurrentUser();
    this.getProdutos();
   }
  ngAfterViewInit(): void {
    this._isInit = true;
    /*const type = this.activatedRoute.snapshot.params.type;

    if(type == 1) {
      this.typeDays.push(4,5,6,8);
    }
    [class]="ngIf typeDays.include(day.title)

   */
    }
  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this._date = obj;
    }
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  trackByTime(index: number, item: CalendarOriginal): number {
    return item ? item.time : index;
  }

  isEndSelection(day: CalendarDay): boolean {
    if (!day) return false;
    if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[1] === null) {
      return false;
    }

    return this._date[1].time === day.time;
  }

  isBetween(day: CalendarDay): boolean {
    if (!day) return false;

    if (this.pickMode !== pickModes.RANGE || !this._isInit) {
      return false;
    }

    if (this._date[0] === null || this._date[1] === null) {
      return false;
    }

    const start = this._date[0].time;
    const end = this._date[1].time;

    return day.time < end && day.time > start;
  }

  isStartSelection(day: CalendarDay): boolean {
    if (!day) return false;
    if (this.pickMode !== pickModes.RANGE || !this._isInit || this._date[0] === null) {
      return false;
    }

    return this._date[0].time === day.time && this._date[1] !== null;
  }

  isSelected(time: number): boolean {

    if (Array.isArray(this._date)) {

      if (this.pickMode !== pickModes.MULTI) {
        if (this._date[0] !== null) {
          return time === this._date[0].time
        }

        if (this._date[1] !== null) {
          return time === this._date[1].time
        }
      } else {
        return this._date.findIndex(e => e !== null && e.time === time) !== -1;
      }

    } else {
      return false
    }
  }

  onSelected(item: CalendarDay): void {
    if (this.readonly) return;
    item.selected = true;
    this.onSelect.emit(item);
    if (this.pickMode === pickModes.SINGLE) {
      this._date[0] = item;
      this.onChange.emit(this._date);
      return;
    }

    if (this.pickMode === pickModes.RANGE) {
      if (this._date[0] === null) {
        this._date[0] = item;
        this.onSelectStart.emit(item);
      } else if (this._date[1] === null) {
        if (this._date[0].time < item.time) {
          this._date[1] = item;
          this.onSelectEnd.emit(item);
        } else {
          this._date[1] = this._date[0];
          this.onSelectEnd.emit(this._date[0]);
          this._date[0] = item;
          this.onSelectStart.emit(item);
        }
      } else {
        this._date[0] = item;
        this.onSelectStart.emit(item);
        this._date[1] = null;
      }
      this.onChange.emit(this._date);
      return;
    }

    if (this.pickMode === pickModes.MULTI) {

      const index = this._date.findIndex(e => e !== null && e.time === item.time);

      if (index === -1) {
        if (item.title ==
           '3' || item.title == '5' || item.title == '13' || item.title == '16' || item.title == '19'){
          this._date.push(item);
          item.subTitle = 'H'
          item.cssClass = 'hidratacao'
          
        }
        else if (item.title == '6' || item.title == '8' || item.title == '18' || item.title == '22' || item.title == '25'){
          this._date.push(item);
          item.subTitle = 'N'
          item.cssClass = 'nutricao'

        }
        else if (item.title == '14' || item.title == '28'){
          this._date.push(item);
          item.subTitle = 'R'
          item.cssClass = 'reconstrucao'
          item.produtos = true;

        }
          
      } else {
        this._date.splice(index, 1);
      }
      this.onChange.emit(this._date.filter(e => e !== null));
    }
  }
  getCurrentUser = () => {
    this.storage.get("user_cabelomeu").then(user => {
      this.user = user;
    });
  };

  //Listar produtos
  getProdutos = () => {
    this.firebaseProvider.getProdutos().subscribe(res => {
      this.loadingProvider.dismiss();
      this.produtos = res;
    });
  }
}
