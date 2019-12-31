---
title: "POI 单元格数据过长问题"
date: 2019-07-17T21:37:24+08:00
tags: ["踩坑记录", "后端"]
---

```
问题     : java.lang.IllegalArgumentException: The maximum column width for an individual cell is 255 characters.
原因     : 导出excel时，excel表中的某个单元格数据过大，然而在创建时，使用了localHSSFSheet.setColumnWidth()控制住了单元格的列宽，所以会显示单元格最大列宽255错误。
```

```
// 解决方式
if(colWidth<255*256){
    sheet.setColumnWidth(i, colWidth < 3000 ? 3000 : colWidth);
}else{
    sheet.setColumnWidth(i, 65000);
}
```
