import { Component, OnInit, ChangeDetectorRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf, NgForOf, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf, DecimalPipe, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  // ใส่ข้อมูลเริ่มต้นไว้เลย ไม่ต้องรอโหลด
  products: any[] = [
    {
      id: 1,
      name: 'อาหารสุนัขพันธุ์ใหญ่ รสเนื้อพรีเมียม',
      category: 'สุนัข',
      price: 650,
      description: 'สูตรบำรุงข้อต่อและกล้ามเนื้อ เสริมสร้างกระดูก ขนาด 3kg',
      image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500'
    },
    {
      id: 2,
      name: 'อาหารแมวเกรนฟรี รสปลาแซลมอน',
      category: 'แมว',
      price: 420,
      description: 'สูตรป้องกันก้อนขน ควบคุมโซเดียม บำรุงขนเงางาม ขนาด 1.5kg',
      image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500'
    },
    {
      id: 3,
      name: 'อาหารกระต่าย ผสมหญ้าทิโมธี',
      category: 'สัตว์เล็ก',
      price: 250,
      description: 'ไฟเบอร์สูง ช่วยระบบย่อยอาหารและช่วยลับฟัน ขนาด 1kg',
      image_url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500'
    },
    {
      id: 4,
      name: 'อาหารนกแก้ว ธัญพืชรวมผลไม้อบแห้ง',
      category: 'นก',
      price: 180,
      description: 'อุดมไปด้วยวิตามิน แร่ธาตุ และโปรตีนจากธรรมชาติ ขนาด 800g',
      image_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500'
    }
  ];

  currentUser: any = null;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private toastCtrl: ToastController,
    private cdr: ChangeDetectorRef
  ) {
    this.currentUser = this.authService.getUser() || { username: 'admin' };
  }

  ngOnInit() {
    this.fetchFromBackend();
  }

  fetchFromBackend() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        if (res && res.status === 'success' && Array.isArray(res.data) && res.data.length > 0) {
          this.products = res.data;
          this.cdr.detectChanges();
        }
      },
      error: () => {
        // หากต่อ API ไม่ได้ ใช้ข้อมูลสินค้า 4 ชิ้นเริ่มต้นตามเดิม
        this.cdr.detectChanges();
      }
    });
  }

  buyProduct(product: any) {
    this.showToast(`สั่งซื้อ "${product.name}" สำเร็จ`, 'success');
  }

  logout() {
    this.authService.logout();
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