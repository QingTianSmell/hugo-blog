---
title: "DIV 添加onblur事件"
date: 2019-07-17T22:47:36+08:00
tags: ["踩坑记录","HTML","IE"]
---

### div添加onblur事件
一般情况下，onblur事件只在input等元素中才有，而div却没有，因为div本身就没有focus的状态(因为div没有tabindex属性)，所以要给div加上此属性。

### focus状态样式变化
定义tabindex属性后，元素是默认会加上焦点虚线的，那么在IE中可以通过hidefocus="true"去除！其他浏览器通过outline=0进行去除！  
`<div tabindex="0" hidefocus="true" onfocus='alert("得到焦点");' onblur='alert("失去焦点");' style="border:1px solid  #ccc;width:200px;height:200px;outline=0;"></div>`

### div内包含其他可以focus的元素的情况(如果是内部的元素导致的onblur不进行操作)
获取触发onblur时的焦点元素(点击的元素)，如果是自身或者子元素，就不进行操作。
```
if(relatedTarget != null && ($(relatedTarget).hasClass("select_m_r_box") || $(relatedTarget).parents(".select_m_r_box").size() > 0)){
    return;
}
```

### 获取焦点元素的浏览器兼容问题(IE坑爹)
IE获取触发onblur的相关目标的方式和其他浏览器不同
```
let relatedTarget = event.relatedTarget;
if(relatedTarget === null){ 
    relatedTarget = document.activeElement;
}
```

### 参考
> [div添加onblur事件、focus状态样式变化](https://www.cnblogs.com/klbc/p/5303134.html)  
> [获取焦点元素的浏览器兼容问题](https://stackoverflow.com/questions/41298948/how-to-use-relatedtarget-or-equivalent-in-ie)