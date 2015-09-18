// 修复不能重复循环的问题
function imgPlug(opts){
      var defaults = {
                autoChageDuring:"4000",  //两张图片自动轮播的间隔时间
                currentIndex: 3,    //默认的选中第几个图片
                parentClass:"plug",  //滚动的幻灯的插件
                currentBarClass:"cur",  //当前的slideBar加上的class
                barHasNum:true, //slideBar是否带有数字
                autoChange:true, //是否自动轮播
                showDescribe:true,//是否显示图片的描述信息
                display_next_and_prev:true,   //是否显示左右切换的按钮
                display_slide_bar:true,    //是否显示slidebar导航条
                display_page:true,  //是否显示页码
                slideDuring:"400",  //两张图片切换的时候时间间隔
                callbackFunction:function(){   //回调函数
                      
                }
            }
      this.settings = $.extend({},defaults,opts);  
      this.parentClass =  this.settings.parentClass;  
      this.slideWidth = $("."+this.parentClass).find(".plugImg li").width();
      this.slideNum = $("."+this.parentClass).find(".plugImg li").length;   //需要切换的个数
      if(this.settings.currentIndex > this.slideNum-1){
          this.settings.currentIndex = this.slideNum-1;
      }else if (this.settings.currentIndex < 0){
          this.settings.currentIndex =0
      }
      this.currentIndexFlag = this.settings.currentIndex; //当前的切换索引 
      this.preIndexFlag = this.settings.currentIndex; //上一个的切换索引
      this.init();
}  
imgPlug.prototype = {
      init:function(){
            var _this = this;
            timer = 0;
            this.insertElem();    //插入小slideBar
            if(this.settings.showDescribe){  //是否显示图片的描述信息
                this.showDescribe();
            }
            this.changeImgPlug();   
            this.slideBarClick();  //slideBar点击执行的方法
            this.leftBarClick();  //点击左边的按钮执行的方法
            this.rightBarClick();    //点击右边的按钮执行的方法
            if(this.settings.autoChange){   //是否开启自动轮播
                this.autoChange();  
            }
      },
      slideBarClick:function(){
         var _this = this;
         $("."+_this.parentClass).find(".slideBar li").click(function(){   //点击下面的切换小按钮的时候，执行的方法
                  _this.currentIndexFlag = $(this).index();
                  _this.changeImgPlug();
            });
      },
      leftBarClick:function(){
          var _this = this;
          $("."+_this.parentClass).find(".left-bar").click(function(){   // 点击左边的切换按钮
                  if(_this.preIndexFlag>0){
                        _this.currentIndexFlag = _this.preIndexFlag-1;
                  }else{
                        _this.currentIndexFlag = _this.slideNum-1;
                  }  
                  _this.changeImgPlug();
            });
      },
      rightBarClick:function(){
          var _this  = this;
          $("."+_this.parentClass).find(".right-bar").click(function(){   //点击右边的切换按钮
                  if(_this.preIndexFlag<_this.slideNum-1){
                        _this.currentIndexFlag = _this.preIndexFlag+1;
                  }else{
                        _this.currentIndexFlag = 0;
                  }  
                  _this.changeImgPlug();
            });
      },
      insertElem:function(){
            $("."+this.parentClass).append("<div class='left-bar'><</div><div class='right-bar'>></div></div>")
            if(!this.settings.display_next_and_prev){   //增加左右切换的按钮
                 $("."+this.parentClass).find(".right-bar").hide();
                 $("."+this.parentClass).find(".left-bar").hide(); 
            }
            if(this.settings.display_slide_bar){   //增加slidebar小点点
                 this.insertSlideBar();
            }
            if(this.settings.display_page){   
                  this.insertPageNum();
            }
      },
      insertPageNum:function(){
            $("."+this.parentClass).append("<div class='pageNum'><span class='currentNum'></span>/<span class='totalNum'></span></div>")
      },
      insertSlideBar:function(){
          var _this = this;
          var insertBarHtml ="<div class='slideBar'><ul>"
          for(var i =1; i<=_this.slideNum;i++){
                 if(_this.settings.barHasNum){
                    insertBarHtml +="<li>"+i+"</li>";
                 }else{
                     insertBarHtml +="<li></li>";
                 }   
          }
          insertBarHtml += "</ul></div>";
          $("."+_this.parentClass).append(insertBarHtml);
      },
      autoChange:function(){
           var _this = this;
            timer = setInterval(function(){
                $("."+_this.parentClass).find(".right-bar").trigger('click');
            },_this.settings.autoChageDuring);
      },
      stopAutoChange:function(){
            clearInterval(timer);   
      },
      showDescribe:function(){
          for(var i =0; i< this.slideNum;i++){
               var thisTitle = $("."+this.parentClass).find(".plugImg li").eq(i).find("img").attr("title");
                var $thisEle = $("."+this.parentClass).find(".plugImg li").eq(i);
               if(thisTitle){
                    var insertDesc = '<div class="show-describe"><span class="bg"></span><span class="show-describe-con">'+thisTitle+'<span></div>'
                    $thisEle.append(insertDesc);
               }
          }
      },
      changePageNum:function(){
            $("."+this.parentClass).find(".currentNum").html(this.currentIndexFlag+1);
            $("."+this.parentClass).find(".totalNum").html(this.slideNum);
      },
      changeImgPlug:function(){
         var _this = this;
         clearInterval(timer);  //清除定时器
          if($("."+_this.parentClass).find(".plugImg").is(":animated")){
              return;
          }
          $("."+_this.parentClass).find(".slideBar li").removeClass(_this.settings.currentBarClass).eq(this.currentIndexFlag).addClass(_this.settings.currentBarClass); 
          if(_this.currentIndexFlag ==this.slideNum-1 && _this.preIndexFlag ==0){     //左边的尽头
               var insertHtml = $("."+_this.parentClass).find(".plugImg li:last").clone();
               $("."+_this.parentClass).find(".plugImg").css({"left":-_this.slideWidth})
               insertHtml.insertBefore($("."+_this.parentClass).find(".plugImg li:first"));
               $("."+_this.parentClass).find(".plugImg").animate({left:"0px"},_this.slideDuring,function(){
                    $("."+_this.parentClass).find(".plugImg").css({left:-_this.slideWidth*(_this.slideNum-1)});
                    $("."+_this.parentClass).find(".plugImg").find("li").eq(0).remove();
                    _this.settings.callbackFunction();
               });
           }else if(_this.currentIndexFlag ==0 && _this.preIndexFlag == _this.slideNum-1){   //右边的尽头
               var insertHtml = $("."+_this.parentClass).find(".plugImg li:first").clone();
               insertHtml.insertAfter($("."+_this.parentClass).find(".plugImg li:last"));
               $("."+_this.parentClass).find(".plugImg").animate({left:-(_this.slideWidth*_this.slideNum)},_this.slideDuring,function(){
                    $("."+_this.parentClass).find(".plugImg").css({left:0});
                    $("."+_this.parentClass).find(".plugImg").find("li:last").remove();
                    _this.settings.callbackFunction();
               });
           }else{
                $("."+_this.parentClass).find(".plugImg").animate({left:-this.currentIndexFlag*_this.slideWidth},_this.slideDuring,function(){
                      _this.settings.callbackFunction();
                });
           }
           _this.preIndexFlag = _this.currentIndexFlag;
           if(_this.settings.autoChange){   //是否自动轮播
                _this.autoChange();
            }  
            if(_this.settings.display_page){   //是否显示页码
                  _this.changePageNum();
            }   
      }
};







