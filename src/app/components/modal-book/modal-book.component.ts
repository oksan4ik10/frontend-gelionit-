import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { MaskitoOptions, MaskitoElementPredicate } from '@maskito/core';

@Component({
  selector: 'app-modal-book',
  templateUrl: './modal-book.component.html',
  styleUrls: ['./modal-book.component.scss'],
  standalone: false,
})
export class ModalBookComponent implements OnInit {
  bookForm: FormGroup;
  product: any;
  submissionMessage: string = '';

  @Input() IDproduct: string = "";
  readonly phoneMask: MaskitoOptions = {
    mask: ['+', /\d/, ' ', '(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private httpService: HttpService,
  ) {

    this.bookForm = this.fb.group({
      IDproduct: [this.IDproduct],
      name_user: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      desc: [''],
      optIn: [true]
    });
  }

  ngOnInit() {
    console.log(this.IDproduct);


  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.bookForm.patchValue({ IDproduct: this.IDproduct })
    if (this.bookForm.invalid) {
      console.log(this.bookForm.value);
      console.log(this.bookForm.errors);
      console.error('Form is invalid');
      return;
    }

    const formData = this.bookForm.value;
    if (!formData.optIn) return
    delete formData.optIn
    this.httpService.createResponse(formData).subscribe(
      response => {
        console.log('Form submitted successfully', response);
        this.submissionMessage = "Заявка отправлена успешно! В ближайшее время менеджер свяжется с Вами";

        setTimeout(() => {
          this.submissionMessage = '';
          this.modalCtrl.dismiss('confirm');
        }, 3000);
      },
      error => {
        console.error('Error submitting form', error);
      }
    );
  }


  readonly maskPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();
}
