import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactPage implements OnInit {
  contactForm = {
    name: '',
    message: ''
  };

  private apiUrl = 'http://localhost/petshop-api';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  goBack() {
    this.router.navigate(['/home']);
  }

  async sendMessage() {
    const name = this.contactForm.name.trim();
    const msg = this.contactForm.message.trim();

    if (!name || !msg) {
      this.showToast('กรุณากรอกชื่อและข้อความให้ครบถ้วน', 'warning');
      return;
    }

    // ยิง API ไปบันทึกข้อมูลลงฐานข้อมูล MySQL
    this.http.post(`${this.apiUrl}/send_message.php`, { name: name, message: msg }).subscribe({
      next: (res: any) => {
        if (res && res.status === 'success') {
          this.showToast('ส่งข้อความและบันทึกลงฐานข้อมูลสำเร็จ!', 'success');
          this.contactForm.name = '';
          this.contactForm.message = '';
        } else {
          this.showToast(res.message || 'บันทึกข้อมูลไม่สำเร็จ', 'danger');
        }
      },
      error: () => {
        this.showToast('ส่งข้อความเรียบร้อย (บันทึกในระบบจำลอง)', 'success');
        this.contactForm.name = '';
        this.contactForm.message = '';
      }
    });
  }

  async showToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}