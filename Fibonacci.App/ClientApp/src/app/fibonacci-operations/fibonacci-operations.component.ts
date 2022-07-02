import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { FibonacciService } from '../services/fibonacci.service';

@Component({
  selector: 'app-fibonacci-operations',
  templateUrl: './fibonacci-operations.component.html',
  styleUrls: ['./fibonacci-operations.component.scss'],
})
export class FibonacciOperationsComponent implements OnInit {
  private unsubscriber$: Subject<void> = new Subject<void>();
  readonly MIN_FIBONACCI_CALC_VALUE = 0;

  public fibonacciForm: FormGroup;
  fibonacciResultNumber: number = null;

  public get inputNumberControl(): AbstractControl | null {
    return this.fibonacciForm.get('inputNumber');
  }

  constructor(
    private _fb: FormBuilder,
    private _fibonacciService: FibonacciService
  ) {}

  ngOnInit(): void {
    this.fibonacciForm = this._fb.group(
      {
        inputNumber: [
          this.MIN_FIBONACCI_CALC_VALUE,
          [Validators.required, Validators.min(this.MIN_FIBONACCI_CALC_VALUE)],
        ],
      },
      {
        updateOn: 'change',
      }
    );
  }

  submitForm() {
    if(this.inputNumberControl?.value >= 0){
      this._fibonacciService.calculateFibonacciNumber(this.inputNumberControl.value)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (response) => {
          if(response?.valueOf() > -1){
            this.fibonacciResultNumber = response;
            this._fibonacciService.refreshTable$.next(null);
          }else{
            console.error(`ERROR: Please provide a number equal or greater than ${this.MIN_FIBONACCI_CALC_VALUE}`);
          }
        },
        error: (err) => {
          console.error("ERROR: Input number is required");
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
