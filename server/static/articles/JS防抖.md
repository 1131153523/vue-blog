# JS防抖


```javascript
function debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function () {
        var context = this;            //保存this，否则在回调函数中访问的将会是window
        var args = arguments;　　//获取事件对象
        if (timeout) clearTimeout(timeout);　　//只要没有停止触发实践，就会不断清除定时器
        if (immediate) {            //判断是否立即执行
            // 如果已经执行过，不再执行
            var callNow = !timeout;　//　false
            timeout = setTimeout(function(){
                timeout = null;        //清除定时器
            }, wait)
            if (callNow) result = func.apply(context, args)    //如果执行过就不会进行这一步
        }　else {
            timeout = setTimeout(function(){
                func.apply(context, args)　　//调用回调函数，并改变this指向，传入事件对象
            }, wait);
        }
        return result;
    };
    debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = null;
    };
    return debounced;
}
```
![深度截图_选择区域_20190105213624.png](http://127.0.0.1:3000/uploads/articleImg/深度截图_选择区域_20190105213624.png)







