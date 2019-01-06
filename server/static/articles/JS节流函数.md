# JS节流函数


```javascript
//时间戳实现
function throttle(func, wait) {
    var context, args;
    var previous = 0;
    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
//定时器实现
function throttle(func, wait) {
    var timeout;
    var previous = 0;
    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }
    }
}
```