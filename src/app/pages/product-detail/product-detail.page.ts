import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgIf, DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, NgIf, DecimalPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailPage implements OnInit {
  product: any = null;

  allProducts = [
    {
      id: 1,
      name: 'อาหารสุนัขพันธุ์ใหญ่ รสเนื้อพรีเมียม',
      category: 'สุนัข',
      price: 650,
      description: 'สูตรบำรุงข้อต่อและกล้ามเนื้อ เสริมสร้างกระดูก ขนาด 3kg ช่วยเสริมสร้างภูมิคุ้มกันที่ดีให้กับสุนัขที่คุณรัก',
      image_url: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500'
    },
    {
      id: 2,
      name: 'อาหารแมวเกรนฟรี รสปลาแซลมอน',
      category: 'แมว',
      price: 420,
      description: 'สูตรป้องกันก้อนขน ควบคุมโซเดียม บำรุงขนเงางาม ขนาด 1.5kg อุดมด้วยโอเมก้า 3 และ 6 ปราศจากธัญพืชที่ทำให้แพ้',
      image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500'
    },
    {
      id: 3,
      name: 'อาหารกระต่าย ผสมหญ้าทิโมธี',
      category: 'สัตว์เล็ก',
      price: 250,
      description: 'ไฟเบอร์สูง ช่วยระบบย่อยอาหารและช่วยลับฟัน ขนาด 1kg หญ้าทิโมธีคุณภาพสูงนำเข้าจากต่างประเทศ',
      image_url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=500'
    },
    {
      id: 4,
      name: 'อาหารนกแก้ว ธัญพืชรวมผลไม้อบแห้ง',
      category: 'นก',
      price: 180,
      description: 'อุดมไปด้วยวิตามิน แร่ธาตุ และโปรตีนจากธรรมชาติ ขนาด 800g ช่วยให้ขนสวย สีสดใส มีพลังงานตลอดวัน',
      image_url: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=500'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.allProducts.find(p => p.id === id) || this.allProducts[0];
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  async buyNow() {
    const toast = await this.toastCtrl.create({
      message: `สั่งซื้อ "${this.product.name}" สำเร็จเรียบร้อย!`,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
}