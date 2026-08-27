import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf, NgForOf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, DecimalPipe, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  // ข้อความตรงกับในฐานข้อมูล MySQL 100% เพื่อไม่ให้ข้อความเปลี่ยนเมื่อกดสั่งซื้อ
  products: any[] = [
    {
      id: 1,
      name: 'อาหารสุนัขพันธุ์ใหญ่ รสเนื้อ',
      category: 'สุนัข',
      price: 650,
      description: 'สูตรบำรุงข้อต่อและกล้ามเนื้อ ขนาด 3kg',
      image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500'
    },
    {
      id: 2,
      name: 'อาหารแมวเกรนฟรี รสปลาแซลมอน',
      category: 'แมว',
      price: 420,
      description: 'สูตรป้องกันก้อนขนและควบคุมโซเดียม ขนาด 1.5kg',
      image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500'
    },
    {
      id: 3,
      name: 'อาหารกระต่าย ผสมหญ้าทิโมธี',
      category: 'สัตว์เล็ก',
      price: 250,
      description: 'ไฟเบอร์สูง ช่วยลับฟัน ขนาด 1kg',
      image_url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500'
    },
    {
      id: 4,
      name: 'อาหารนกแก้ว ธัญพืชรวม',
      category: 'นก',
      price: 180,
      description: 'อุดมไปด้วยวิตามินและแร่ธาตุ ขนาด 800g',
      image_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500'
    }
  ];

  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.currentUser = this.authService.getUser() || { username: 'admin' };
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          // ล็อคการเรียงลำดับ ID 1, 2, 3, 4 คงที่เสมอ
          this.products = res.data.sort((a: any, b: any) => Number(a.id) - Number(b.id));
        }
      },
      error: () => {}
    });
  }

  viewDetail(product: any) {
    this.router.navigate(['/product-detail', product.id]);
  }

  goToContact() {
    this.router.navigate(['/contact']);
  }

  async buyProduct(product: any) {
    // ใช้ Toast แสดงผลแถบเขียวด้านบนชัดเจนตามเดิม
    const toast = await this.toastCtrl.create({
      message: `สั่งซื้อ "${product.name}" สำเร็จ`,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  logout() {
    this.authService.logout();
  }
}