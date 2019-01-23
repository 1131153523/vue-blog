# js实现插入排序
```
var a = [9,8,7,6,5,4,3,2,1]
for (var i = 1;i < a.length;i++) {
	var temp = a[i]    //有序序列后面第一个数
	var j = i-1    //有序序列最后的下标
	while(j >= 0 && a[j] > temp) {   //从有序序列最右向左遍历
		a[j+1] = a[j]    //找到比temp大的数 ，向后移动一位
		j--   //因为向后移动，所以下标减一
	}
	a[j+1] = temp    //把temp放到有序列表对应位置
}
console.log(a)
```
