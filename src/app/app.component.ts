import { Component, OnInit } from '@angular/core';
import {
  of,
  AsyncSubject,
  BehaviorSubject,
  interval,
  ReplaySubject,
  Subject,
  Observable,
  map,
  catchError,
  throwError,
  take,
  retry,
  delay,
  tap,
  retryWhen,
  combineLatest,
  concat,
  forkJoin,
  merge
} from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular';
 /*****combineLatest***combines multiple observables and creates an observable with last element of each observable, if any of observable throws error then, combineLatest also throws error **/
ngOnInit(){
  /*here the out will be printed for after 5 sec as the obs2 is not released till 5s combileLatest will hold obs1 and then relaese them both together*/
   let obs1= new Observable((observer)=>{
     setTimeout(()=>{
     observer.next('a');
     observer.next(1);
     },1000)
   })

   let obs2=new Observable((observer)=>{
     setTimeout(()=>{
       observer.next(2);
     },4000);
   })

   combineLatest([obs1,obs2]).subscribe(
     (data)=>{console.log(data);},
     (error)=>{console.log(error);}
   )
   /******concat*****concats multiple observable together when first observable completes concts its all values to another observable and so on.At any given moment one obseravle emmits value while others wait, if some observable never completes then , the other  observable waiting will never be called, throws error if any has error*/
   let obs3=new Observable((observer)=>{
     observer.next(1);
     observer.next(2);
     setTimeout(()=>{
       observer.complete();
     },4000)
   })
   /* here till obs3 is complete till 4s nothing will reun then after completing of both obs3/4 the subscription occurs*/
  let obs4=of(5,6,7,8);
  
concat(obs3,obs4).subscribe(
  (data)=>{console.log(data);},
  (error)=>{console.log(error)}
)

/****fork join only emmits once as a array or object at the completion of all the input observables, in case of error in any observable fork join will aslo throw error, complete is necessary ****/

let obs5=new Observable((observer)=>{
  observer.next(1);
  setTimeout(()=>{
    observer.complete();
  },4000)
})  /***will wait till compelete**/
let obs8= of('a','b');

forkJoin(obs5,obs8).subscribe(
  (data)=>{console.log(data);}  //array form
)
forkJoin({a:obs5,b:obs8}).subscribe(
  (data)=>{console.log(data);},
  (error)=>{console.log(error);}  //object form
)

/*****merge****concurrently emmits values from all observables, flattens multiple observables together, if any of the observable emmits error the others also stop emmitng values**/
let obs11=interval(1000);
let obs12=of('a','b');
let ob= new Observable((observer)=>{
  observer.next(1);
  setTimeout(()=>{
    observer.error();/*error after sometime here*/
  },4000);
 
})
merge(obs11,obs12,ob).subscribe(
  (data)=>{console.log(data);}
)
}
}

