# JS类型判断
```
function type(obj) {
	var class2type = {};
	// 生成class2type映射
	"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item, index) {
   	 class2type["[object " + item + "]"] = item.toLowerCase();
	})
	
    if (obj == null) {　　　//不管是undefined 还是null 都会成立
        return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ?
        class2type[Object.prototype.toString.call(obj)] || "object" :
        typeof obj;
}
```