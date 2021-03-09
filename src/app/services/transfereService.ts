import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class TransfereService {

  constructor(
    private router: Router ) { }

  private data = '';

  // tslint:disable-next-line:typedef
  ngOninit(){
    this.data = '';
  }
  // tslint:disable-next-line:typedef
  setData(data){
    this.data = data;
  }

  // tslint:disable-next-line:typedef
  getData(){
    const temp = this.data;
    this.clearData();
    return temp;
  }

  // tslint:disable-next-line:typedef
  clearData(){
    this.data = '';
  }

}
