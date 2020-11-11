---
title: "Angular 的使用"
date: 2020-04-12T14:28:05+08:00
tags: ["技","程序开发","前端","框架"]
---

<!-- vim-markdown-toc GitLab -->

* [What](#what)
  * [快速上手](#快速上手)
    * [模版语法](#模版语法)
    * [组件](#组件)
    * [输入和输出](#输入和输出)
    * [注册路由](#注册路由)
    * [使用路由信息](#使用路由信息)
    * [使用服务](#使用服务)
    * [在 AppModule 中为应用启用 HttpClient](#在-appmodule-中为应用启用-httpclient)
    * [表单](#表单)

<!-- vim-markdown-toc -->

## What

Angular 是一个应用设计框架与开发平台，用于创建高效、复杂、精致的单页面应用。

### 快速上手

#### 模版语法

Angular 模板语法的五个常用特性：

- \*ngFor
- \*ngIf
- 插值 {{}}
- 属性绑定 []
- 事件绑定 ()

```
<h2>Products</h2>

<div *ngFor="let product of products">

  <h3>
    <a [title]="product.name + ' details'">
      {{ product.name }}
    </a>
  </h3>

  <p *ngIf="product.description">
    Description: {{ product.description }}
  </p>

  <button (click)="share()">
    Share
  </button>

</div>
```

#### 组件

组件在用户界面（也就是 UI）中定义了一些责任区，让你能重用这些 UI 功能集。Angular 应用程序由一棵组件树组成，每个 Angular 组件都有一个明确的用途和责任。

组件包含三部分：

- 一个组件类，它用来处理数据和功能。上一节，我们在组件类中定义了商品数据和 share() 方法，它们分别用来处理数据和功能。
- 一个 HTML 模板，它决定了 UI。在上一节中，商品列表的 HTML 模板用来显示每个商品的名称、描述和 “Share” 按钮。
- 组件专属的样式定义了外观和感觉。商品列表中还没有定义任何样式，那属于组件 CSS 负责。

#### 输入和输出

```
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-product-alerts",
  templateUrl: "./product-alerts.component.html",
  styleUrls: ["./product-alerts.component.css"]
})
export class ProductAlertsComponent implements OnInit {
  // @Input() 装饰器指出其属性值是从该组件的父组件商品列表组件中传入的。
  @Input() product;
  // 在组件类中，用 @Output() 装饰器和一个事件发射器 EventEmitter() 实例定义一个名为 notify 的属性。这可以让组件在 notify 属性发生变化时发出事件。
  @Output() notify = new EventEmitter();

  constructor() {}

  ngOnInit() {}
}

```

```
<p *ngIf="product.price > 700">
  <!-- 点击时触发自定义 notify 事件 -->
  <button (click)="notify.emit()">Notify Me</button>
</p>
```

```
import { Component } from "@angular/core";

import { products } from "../products";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent {
  products = products;

  share() {
    window.alert("The product has been shared!");
  }

  // 定义 onNotify 方法
  onNotify() {
    window.alert("You will be notified when the product goes on sale");
  }
}
```

```
<h2>Products</h2>

<div *ngFor="let product of products">

    <h3>
        <a [title]="product.name + ' details'">
            {{ product.name }}
        </a>
    </h3>

    <p *ngIf="product.description">
        Description: {{ product.description }}
    </p>

    <button (click)="share()">
    Share
    </button>
    <!-- 只要像使用 HTML 元素一样使用它的选择器（ app-product-alert ）就可以了。 -->
    <!-- 通过属性绑定把当前商品作为输入传给组件。 -->
    <!-- 为 notify 事件绑定触发方法 -->
    <app-product-alerts [product]="product" (notify)="onNotify()">
    </app-product-alerts>

</div>
```

#### 注册路由

```
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      // 在 app.module.ts 中，添加一个商品详情路由，该路由的 path 是 products/:productId，component 是 ProductDetailsComponent。
      { path: 'products/:productId', component: ProductDetailsComponent },
    ])
  ],
```

```
<!-- 修改 *ngFor 指令，在遍历列表的过程中把 products 数组中的每个索引赋值给 productId 变量 -->
<div *ngFor="let product of products; index as productId">

  <h3>
    <!-- RouterLink 指令让路由器控制了一个链接元素。在这种情况下，路由或 URL 包含一个固定的区段（ /products ），但其最后一个区段是变量，要插入当前商品的 id 属性。 -->
    <a [title]="product.name + ' details'" [routerLink]="['/products', productId]">
      {{ product.name }}
    </a>
  </h3>
<!-- . . . -->
</div>
```

#### 使用路由信息

```
import { Component, OnInit } from "@angular/core";
// 包含与当前组件相关的路由信息。ActivatedRoute 也可用于遍历路由器的状态树。
import { ActivatedRoute } from "@angular/router";
import { products } from "../products";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.css"]
})
export class ProductDetailsComponent implements OnInit {
  product;

  // 将 ActivatedRoute 作为参数添加到构造函数的括号中，以便在上下文中使用 this.route。
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // 订阅了路由参数，并且根据 productId 获取了该产品，在模版里使用 product 即可
    this.route.paramMap.subscribe(params => {
      this.product = products[+params.get("productId")];
    });
  }
}
```

#### 使用服务

服务是 Angular 应用的重要组成部分。在 Angular 中，服务是一个类的实例，它可以借助 Angular 的依赖注入系统来让应用中的任何一个部件都能使用它。服务可以让你在应用的各个部件之间共享数据。

```
import { Injectable } from '@angular/core';

// 定义购物车服务
export class CartService {
  items = [];

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
```

```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { products } from '../products';
// 引入服务
import { CartService } from '../cart.service';

export class ProductDetailsComponent implements OnInit {
  // 通过构造方法注入服务
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }
}
```

#### 在 AppModule 中为应用启用 HttpClient

在使用 Angular 的 HTTP 客户端之前，你必须先配置你的应用来使用 HttpClientModule。Angular 的 HttpClientModule 中注册了在整个应用中使用 HttpClient 服务的单个实例所需的服务提供商。

1. 打开 app.module.ts。
2. 在该文件的顶部从 @angular/common/http 包中导入 HttpClientModule 以及其它导入项。
3. 把 HttpClientModule 添加到 AppModule @NgModule() 的 imports 数组中，以便全局注册 Angular 的 HttpClient。
4. AppModule 已经导入了 HttpClientModule，接下来就是将 HttpClient 服务注入到你的服务中，以便此应用可以获取数据并与外部 API 和资源进行交互。

```
import { Injectable } from '@angular/core';

// 导入 HttpClient
import { HttpClient } from '@angular/common/http';

export class CartService {
  items = [];

  // 注入 HttpClient
  constructor(
    private http: HttpClient
  ) {}

  getShippingPrices() {
    // 请求资源
    return this.http.get('/assets/shipping.json');
  }

}
```

```
export class ShippingComponent implements OnInit {
  shippingCosts;

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.shippingCosts = this.cartService.getShippingPrices();
  }

}
```

async 管道从数据流中返回最新值，并在所属组件的生命期内持续返回。当 Angular 销毁该组件时，async 管道会自动停止。有关 async 管道的详细信息，请参见 [AsyncPipe API 文档](https://angular.cn/api/common/AsyncPipe)。

```
<h3>Shipping Prices</h3>

<div class="shipping-item" *ngFor="let shipping of shippingCosts | async">
  <span>{{ shipping.type }}</span>
  <span>{{ shipping.price | currency }}</span>
</div>
```

#### 表单

```
import { Component, OnInit } from '@angular/core';
// Angular 的 FormBuilder 服务为生成控件提供了方便的方法。
import { FormBuilder } from '@angular/forms';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  checkoutForm;

  // 注入服务
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
  ) {

    // 把 checkoutForm 属性设置为一个包含 name 和 address 字段的表单模型。使用 FormBuilder 的 group() 方法来创建它，把该语句加入构造函数的花括号 {} 中间。
    this.checkoutForm = this.formBuilder.group({
      name: '',
      address: ''
    });
  }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);

    this.items = this.cartService.clearCart();
    // 清空表单
    this.checkoutForm.reset();
  }
}
```

为 name 和 address 添加输入字段。使用 formControlName 属性绑定来把 checkoutForm 表单控件中的 name 和 address 绑定到它们的输入字段。

```
<h3>Cart</h3>

<p>
  <a routerLink="/shipping">Shipping Prices</a>
</p>

<div class="cart-item" *ngFor="let item of items">
  <span>{{ item.name }} </span>
  <span>{{ item.price | currency }}</span>
</div>

<form [formGroup]="checkoutForm" (ngSubmit)="onSubmit(checkoutForm.value)">

  <div>
    <label for="name">
      Name
    </label>
    <input id="name" type="text" formControlName="name">
  </div>

  <div>
    <label for="address">
      Address
    </label>
    <input id="address" type="text" formControlName="address">
  </div>

  <button class="button" type="submit">Purchase</button>

</form>
```
