import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {
    medicalform: FormGroup;
  constructor(private fb: FormBuilder) {
    this.medicalform = this.fb.group({
        VitaminC: [
            '',
            [Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(10)]
          ],
          ItchRelief: [
            '',
            [Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(10)]
          ],
          Dewormers: [
            '',
            [Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(10)]
          ],
          Dental: [
            '',
            [Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(10)]
          ]
        });
        this.setupValueChangeHandlers();
    }

  ngOnInit(): void {
  }
  setupValueChangeHandlers() {
    Object.keys(this.medicalform.controls).forEach((controlName) => {
      this.medicalform.get(controlName)?.valueChanges
        .pipe(debounceTime(2000)) // Wait for 500ms of inactivity
        .subscribe((value) => {
          console.log(`${controlName} changed to:`, value);
          // Additional logic if needed
        });
    });
  }

}
