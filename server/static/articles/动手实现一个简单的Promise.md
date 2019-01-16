

# 动手实现一个简单的Promise



```javascript
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(executor) {
  let self = this;

  self.state = PENDING;
  self.value = null;
  self.reason = null;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (self.state === PENDING) {
      self.state = FULFILLED;
      self.value = value;

      self.onFulfilledCallbacks.forEach(function(fulfilledCallback) {
        fulfilledCallback();
      });
    }
  }

  function reject(reason) {
    if (self.state === PENDING) {
      self.state = REJECTED;
      self.reason = reason;

      self.onRejectedCallbacks.forEach(function(rejectedCallback) {
        rejectedCallback();
      });
    }
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}

MyPromise.prototype.then = function(onFuifilled, onRejected) {
  let self = this;

  if (self.state === PENDING) {
    self.onFulfilledCallbacks.push(() => {
        onFuifilled(self.value);
    });
    self.onRejectedCallbacks.push(() => {
        onRejected(self.reason);
    });
  }

  if (self.state === FULFILLED) {
    onFuifilled(self.value);
  }

  if (self.state === REJECTED) {
    onRejected(self.reason);
  }
};

作者：leocoder
链接：https://juejin.im/post/5badd6eb6fb9a05cea7f97d0
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```