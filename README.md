## 2017百度技术学院习题练习
## 使用弹性盒子  display : flex
flex: flex-grow flex-shrink flex-basis

## flex-basis
####  指定了 flex 元素在主轴方向上的初始大小。如果不使用 box-sizing 来改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的宽或者高（取决于主轴的方向）的尺寸大小。

## flex-grow
####  属性定义弹性盒子项（flex item）的拉伸因子。

## flex-shrink
####  属性指定了 flex 元素的收缩规则。

## flex-flow
####  属性是 flex-direction 和 flex-wrap 的简写。

## flex-direction
####  属性指定了内部元素是如何在 flex 容器中布局的，定义了主轴的方向(正方向或反方向)。
####  值 row 和 row-reverse 受 flex 容器的方向性的影响。 如果它的 dir 属性是 ltr，row 表示从左到右定向的水平轴，而 #### row-reverse 表示从右到左; 如果 dir 属性是 rtl，row 表示从右到左定向的轴，而 row-reverse 表示从左到右。


## flex-wrap
####  指定 flex 元素单行显示还是多行显示 。如果允许换行，这个属性允许你控制行的堆叠方向。
####  nowrap
####  flex 的元素被摆放到到一行，这可能导致溢出 flex 容器。 cross-start  会根据 flex-direction 的值 相当于 start 或 before。
####  wrap
####  flex 元素 被打断到多个行中。cross-start 会根据 flex-direction 的值 相当于start 或before。cross-end 为 cross-start 的相对值
####  wrap-reverse
####  和 wrap 的表现一样但是 cross-start 和 cross-end 交替排列。


####  justify-content
####  属性定义了浏览器如何分配顺着父容器主轴的弹性元素之间及其周围的空间。
####  flex-start
####  从行首开始排列。每行第一个弹性元素与行首对齐，同时所有后续的弹性元素与前一个对齐。
####  flex-end
####  从行尾开始排列。每行最后一个弹性元素与行尾对齐，其他元素将与后一个对齐。
####  center
####  伸缩元素向每行中点排列。每行第一个元素到行首的距离将与每行最后一个元素到行尾的距离相同。
####  space-between
####  在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素与行首对齐，每行最后一个元素与行尾对齐。
####  space-around
####  在每行上均匀分配弹性元素。相邻元素间距离相同。每行第一个元素到行首的距离和每行最后一个元素到行尾的距离将会是相邻元素之间距离的一半。

## order
#### 属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照 order 属性的值的增序进行布局。拥有相同 order 属性值的元素按照它们在源代码中出现的顺序进行布局。

##align-content
#### 有额外空间如何排布 只针对多行
#### flex-start
#### 所有行从垂直轴起点开始填充。第一行的垂直轴起点边和容器的垂直轴起点边对齐。接下来的每一行紧跟前一行。
#### flex-end
#### 所有行从垂直轴终点开始填充。第一行的垂直轴终点边和容器的垂直轴终点边对齐。接下来的每一行紧跟前一行。
#### center
#### 所有行朝向容器的中心填充。每行互相紧挨，相对于容器居中对齐。容器的垂直轴起点边和第一行的距离相等于容器的垂直轴终点边和最后一#### 行的距离。
#### space-between
#### 所有行在容器中平均分布。相邻两行间距相等。容器的垂直轴起点边和终点边分别与第一行和最后一行的边对齐。
#### space-around
#### 所有行在容器中平均分布，相邻两行间距相等。容器的垂直轴起点边和终点边分别与第一行和最后一行的距离是相邻两行间距的一半。
#### stretch
#### 拉伸所有行来填满剩余空间。剩余空间平均的分配给每一行

##align-items
#### 元素向侧轴起点对齐。
#### 属性以与justify-content相同的方式在侧轴方向上将当前行上的弹性元素对齐。
#### flex-start
#### flex-end
#### 元素向侧轴终点对齐。
#### center
#### 元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同。
#### baseline
#### 所有元素向基线对齐。侧轴起点到元素基线距离最大的元素将会于侧轴起点对齐以确定基线。
#### stretch
#### 弹性元素被在侧轴方向被拉伸到与容器相同的高度或宽度。

##align-self
#### 会对齐当前 flex 行中的 flex 元素，并覆盖 align-items 的值. 如果任何 flex 元素的侧轴方向 margin 值设置为 auto，则会忽略 align-self。
#### auto
#### 设置为父元素的 align-items 值，如果该元素没有父元素的话，就设置为 stretch。
#### flex-start
#### flex 元素会对齐到 cross-axis 的首端。
#### flex-end
#### flex 元素会对齐到 cross-axis 的尾端。
#### center
#### flex 元素会对齐到 cross-axis 的中间，如果该元素的 cross-size 的尺寸大于 flex 容器，将在两个方向均等溢出。
#### baseline
#### 所有的 flex 元素会沿着基线对齐，The item with the largest distance between its cross-start margin edge and its #### baseline is flushed with the cross-start edge of the line。
#### stretch
#### flex 元素将会基于容器的宽和高，按照自身 margin box 的 cross-size 拉伸。
