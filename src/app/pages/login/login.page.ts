import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginPage implements OnInit {
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  onUsernameInput(event: any) {
    this.credentials.username = event.target.value ? String(event.target.value) : '';
  }

  onPasswordInput(event: any) {
    this.credentials.password = event.target.value ? String(event.target.value) : '';
  }

  async onLogin() {
    const user = this.credentials.username.trim();
    const pass = this.credentials.password.trim();

    if (!user || !pass) {
      this.showToast('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'กำลังเข้าสู่ระบบ...',
    });
    await loading.present();

    this.authService.login({ username: user, password: pass }).subscribe({
      next: async (res: any) => {
        await loading.dismiss();
        if (res && res.status === 'success') {
          this.authService.setSession(res.user);
          this.showToast('เข้าสู่ระบบสำเร็จ', 'success');
          this.router.navigate(['/home']);
        } else {
          this.showToast(res.message || 'รหัสผ่านหรือชื่อผู้ใช้ไม่ถูกต้อง', 'danger');
        }
      },
      error: async () => {
        await loading.dismiss();
        // เมื่อปิด XAMPP จะเข้าสู่ block error นี้และไม่อนุญาตให้ Login ทุกกรณี
        this.showToast('ไม่สามารถเชื่อมต่อ Server ได้ (กรุณาเปิด Apache/MySQL ใน XAMPP)', 'danger');
      }
    });
  }

  async showToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2500,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}