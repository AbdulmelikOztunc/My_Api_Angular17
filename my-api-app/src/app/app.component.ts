import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { PersonelModel, ProfessionType } from './models/personel.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  professionType: ProfessionType[] = ['Software', 'Teacher', 'Cleaner'];
  personels: PersonelModel[] = [];
  personelToUpdate: PersonelModel | null = null;
  constructor() {
    this.getAll();
  }

  getAll() {
    fetch('http://localhost:3000/personels')
      .then((res) => res.json())
      .then((data) => (this.personels = data));
  }

  add(form: NgForm) {
    fetch('http://localhost:3000/personels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })
      .then((res) => res.json())
      .then((_data) => {
        form.reset();
        const el = document.getElementById('addPersonelCloseModel');
        el?.click();
        this.getAll();
      });
  }

  delete(id: number) {
    // if (confirm("Are you sure you want to remove this person?")) {
    //   this.delete(id);
    // }
    fetch(`http://localhost:3000/personels/${id}`, {
      method: 'DELETE',
    }).then(() => this.getAll());
  }

  updateModal(personel: any): void {
    if (personel) {
      // "Update" düğmesine tıklanınca personeli güncelle
      this.personelToUpdate = { ...personel }; // Personelin kopyasını alarak referansını koruyun
    } else {
      console.error('Personel is null or undefined.');
      // Null veya undefined durumunu ele alabilirsiniz.
    }
  }

  update(_form: NgForm): void {
    const id = _form.value.id;

    fetch(`http://localhost:3000/personels/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_form.value),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        const el = document.getElementById('UpdatePersonelCloseModel');
        el?.click();
        this.getAll();
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Hata durumunu kullanıcıya bildirebilir veya başka bir işlem gerçekleştirebilirsiniz.
      });
  }
}
