---
title: "React 和直接修改 DOM 的前端框架的兼容性问题"
date: 2019-07-23T22:07:02+08:00
tags: ["踩坑记录", "React"]
---

#### React 和 JQuery UI Sortable

- 产生原因:  
  使用 Sortable 进行拖拽排序时，在放置时 Sortable 会先根据拖拽起始和目标修改一次 DOM。然后如果在拖拽后更新了数据，React 会 render DOM，但是 React 并不知道 Sortable 对 DOM 进行了修改，因此产生的冲突。

- 解决方式:  
  在 stop 回调方法里取消 Sortable 的排序，将排序操作交给 React 管理。

```
stop: function () {
    $schArLiBox.sortable("cancel");
}
```

#### React 和 JQuery tipsy

- 产生原因:  
  React 修改 title 后，如果是置为`""`或删除 title 属性，都不会另 tipsy 重新加载
  original-title 属性，只有修改为其他值是才重加载。因此要删除的话就有问题。

- 解决方式:  
  使用 jQuery 手动删除修改的元素的 original-title 属性
