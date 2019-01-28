# Vue生命周期函数


![](/images/articleUploadImg/1541319266214-lifecycle.png)
```html
  <div id="app">
    <input type="button" value="按钮" @click="msg = 'no'">
    <h3 class="text">{{ msg }}</h3>
  </div>
```

```javascript
var vm = new Vue({
      el: '#app',
      data: {
        msg: 'ok'
      },
      methods: {
        show() {
          console.log('show方法被执行')
        }
      },
      beforeCreate () {       //创建前
        //第一个生命周期函数
        console.log(this.msg)   //undefined
        //注意：在beforeCreate生命周期函数执行的时候，data和method都还没有初始化
      },
      created () {          //创建后
        //第二个生命周期
        console.log(this.msg)   //ok
        this.show()       //show方法被执行
        // 都被初始化,想要操作数据，最早能在created进行操作
      },
      beforeMount () {    //嵌入前(挂载前)))
        //第三个生命周期
        //在这个周期中，会在内存中渲染模板，但是页面中还没有渲染
        console.log(document.querySelector('.text').innerHTML)  //{{ msg }}  渲染失败
        //在beforeMount执行时，页面中的元素还没有真正的渲染出来，只是在内存中渲染
      },
      mounted () {      //嵌入后（挂载后）
        //第四个生命周期
        //表示内存中的模板已经渲染到页面中
        console.log(document.querySelector('.text').innerHTML)  //ok
        //如果要通过某些插件操作DOM节点，最早要在mounted操作
      },
      beforeUpdate () {  //运行中的vue，界面数据还未更新
      //第五个生命周期
        console.log('界面上的元素'+document.querySelector('.text').innerHTML) //界面上的元素ok
        console.log('data中的msg数据是'+this.msg)               //data中的msg数据是no
        //数据是最新的，但页面上的数据还没有同步
      },
      updated () {
        //第六个生命周期
        console.log('界面上的元素'+document.querySelector('.text').innerHTML)  //界面上的元素no
        console.log('data中的msg数据是'+this.msg)       //data中的msg数据是no
        //数据最新，界面数据最新，保持同步了
      },
      beforeDestroy () {
        //第七个生命周期
        console.log(this.msg) 
        this.show() 
        //能够正常输出，还没有被销毁
      },
      destroyed () {
        //第八个生命周期
        console.log(this.msg) //undefined
        this.show()   //undefined
        //数据被销毁
      }
    })
```

