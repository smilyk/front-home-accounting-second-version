import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, NgForm, Validators} from '@angular/forms';
interface Regul {
  choosing: string;
}

interface Week {
  day: string;
}

@Component({
  selector: 'app-planning-input-card',
  templateUrl: './planning-input-card.component.html',
  styleUrls: ['./planning-input-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlanningInputCardComponent implements OnInit {
  week: Week[] = [
    {day: 'Monday'},
    {day: 'Tuesday'},
    {day: 'Wednesday'},
    {day: 'Thursday'},
    {day: 'Friday'},
    {day: 'Saturday'},
    {day: 'Sunday'},
  ];
  days: Week[] = [{
    day: ''
  }];
  weekControl = new FormControl('', Validators.required);
  regularityControl = new FormControl('', Validators.required);
  regularity: Regul[] = [
    {choosing: 'once'},
    {choosing: 'once a week'},
    {choosing: 'once a month'},
    {choosing: 'once a year'},
    {choosing: 'by days of the week'},
  ];
  once = false;
  onceAWeek = false;
  onceAMonth = false;
  onceAYear = false;
  byDaysOfWeek = false;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  dateMonth = new FormControl(new Date());
  serializedDateMonth = new FormControl((new Date()).toISOString());
  dateOfYear = new FormControl(new Date());
  serializedDateYear = new FormControl((new Date()).toISOString());
  weekDay: any;
  dateOfMonth = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  chooseReg(value: any) {
    if (value.choosing === this.regularity[0].choosing) {
      this.once = true;
      this.onceAWeek = false;
      this.onceAMonth = false;
      this.onceAYear = false;
      this.byDaysOfWeek = false;
    } else if (value.choosing === this.regularity[1].choosing) {
      this.once = false;
      this.onceAWeek = true;
      this.onceAMonth = false;
      this.onceAYear = false;
      this.byDaysOfWeek = false;
    } else if (value.choosing === this.regularity[2].choosing) {
      this.once = false;
      this.onceAWeek = false;
      this.onceAMonth = true;
      this.onceAYear = false;
      this.byDaysOfWeek = false;
    } else if (value.choosing === this.regularity[3].choosing) {
      this.once = false;
      this.onceAWeek = false;
      this.onceAMonth = false;
      this.onceAYear = true;
      this.byDaysOfWeek = false;
    } else if (value.choosing === this.regularity[4].choosing) {
      this.once = false;
      this.onceAWeek = false;
      this.onceAMonth = false;
      this.onceAYear = false;
      this.byDaysOfWeek = true;
    }
  }

  // tslint:disable-next-line:typedef
  savePlan(form: NgForm) {
    console.log(this.date.value);
    console.log(this.dateMonth.value);
    console.log(this.dateOfMonth);
    console.log(this.dateOfYear.value);
  }

  // tslint:disable-next-line:typedef
  chooseDay(value: any) {
    this.weekDay = value.day;
    console.log(this.weekDay);
  }

  // tslint:disable-next-line:typedef
  chooseDaysOfWeek(value: any) {
    this.days = value;
    console.log(value);
    console.log(this.days[0].day + ' iii');
    console.log(this.days[1].day + ' iii');
  }


}
