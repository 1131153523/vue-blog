# BFS求图的最短路径

```javascript
let a = [
    [0,1,1,1,1],
    [0,0,1,1,1],
    [0,0,1,1,1],
    [1,0,0,1,1],
    [1,1,0,0,0]
]
let startX = 0
let startY = 0
let endX = 4
let endY = 4
let d = []
let dx = [1, 0, -1, 0]
let dy = [0, 1, 0, -1]
for (let i = 0;i < a.length;i++){
    d.push([0,0,0,0,0])
}
let queue = []
queue.unshift({x: startX, y: startY})
while (queue.length) {
    let point = queue.pop()
    if (point.x === endX && point.y === endY) {
        console.log(d[point.x][point.y])
        break
    }
    for (let i = 0;i < a.length;i++) {
        let nextPointX = point.x + dx[i]
        let nextPointY = point.y + dy[i]
        if (
            nextPointX >= 0
            && nextPointX < 5
            && nextPointY >= 0
            && nextPointY < 5
            && a[nextPointX][nextPointY] !== 1
            && d[nextPointX][nextPointY] === 0) {
            d[nextPointX][nextPointY] = d[point.x][point.y] + 1
            queue.unshift({x: nextPointX, y: nextPointY})
            a[nextPointX][nextPointY] = 1
        }
    }
}

console.log(d)
```