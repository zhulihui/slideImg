使用方法：
(一)html结构：
<div class="plug plug-one">   
            <ul class="plugImg">
                 <li><img src="" title=""></li>
                 <li><img src="" title="这是第二张图片哦"></li>
                 <li><img src="" title="这是第三张图片哦"></li>
                 <li><img src="" title="这是第四张图片哦"></li>
                 <li><img src="" title="这是第五张图片哦"></li>
            </ul>
            
</div>
其中：plug是为了控制样式，填写的class名字。  plug-one可以自己定义，实例化的时候可以传入该名字。如果实例化不传名字的话，插件中默认的父级名字是plug，下面所有的查找都是基于这个父级的。  
title是每个图片的描述文字
(二)实例化一个图片轮播的插件.
 var imgPlug1 = new imgPlug({
                autoChageDuring:"4000",  //两张图片自动轮播的间隔时间
                currentIndex: 10,    //默认的选中第几个图片
                parentClass:"plug-one",  //滚动的幻灯的插件
                currentBarClass:"cur",  //当前的slideBar加上的class
                barHasNum:true, //slideBar是否带有数字  false or true
                autoChange:true, //是否自动轮播    false or true
                showDescribe:true,//是否显示图片的描述信息   false or true
                display_next_and_prev:true,   //是否显示左右切换的按钮  false or true
                display_slide_bar:true,    //是否显示slidebar导航条  fasle or true
                display_page:true,  //是否显示页码   false  or  true
                callbackFunction:function(){
                      console.log("此处可以填写实例化1的回调函数")
                }  
            });
  各个参数的解释说明：
   autoChageDuring：两张图片自动轮播的时间间隔。单位是毫秒。
   currentIndex：表示初始的时候选中第几张图片，如果超过图片的个数，则默认最后一个选中；如果<0,则默认为0
   parentClass 表示幻灯的父级元素，插件中的元素的层级查找，依赖于改父级元素
   currentBarClass： 下面的小圆点选中的时候，增加的class名字。默认的的是cur
   barHasNum：  slidebar小圆圈是否显示数字，false  or  true，默认为true
   autoChange: 是否自动轮播，false  or  true，默认为true
   showDescribe： 是否显示图片的描述信息  flase  or true，默认为true
   display_next_and_prev:true,   //是否显示左右切换的按钮  false or true
   display_slide_bar:true,    //是否显示slidebar导航条  fasle or true
   display_page:true,  //是否显示页码   false  or  true
   callbackFunction:function(){
                      console.log("此处可以填写实例化的回调函数"
   } 
  
