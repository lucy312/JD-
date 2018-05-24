/**
 * Created by csm on 18/4/2.
 */
'use strict';
/*向量的计算等于 终点的坐标减去起点的坐标*/
function vector(a,b){
    return {
        x: b.x- a.x,
        y: b.y- a.y
    }
}

/*  向量的叉乘公式,向量1的x坐标*向量2的y坐标-向量1的y坐标*向量2的x坐标  */
function vectorProduct(v1,v2){
    return v1.x*v2.y - v1.y*v2.x;
}

/* 利用叉乘结果是否符号相同判断点是否在三角形内 如果相同 点在三角形内  */
function isPointInTriangel(p,a,b,c){
    var pa=vector(p,a);
    var pb=vector(p,b);
    var pc=vector(p,c);
    var t1=vectorProduct(pa,pb);
    var t2=vectorProduct(pb,pc);
    var t3=vectorProduct(pc,pa);
    return isSame(t1,t2) && isSame(t2,t3);
}

/*判断符号是否相同*/
function isSame(a,b){
    return (a ^ b)>=0
}

function isNeedDealy(ele,curMouse,leftMouse){
    var offset=ele.offset();
    var topPoint={
        x:offset.left,
        y:offset.top
    }
    var bottomPoint={
        x:offset.left,
        y:offset.top+ele.height()
    }

    return isPointInTriangel(curMouse,topPoint,bottomPoint,leftMouse);
}