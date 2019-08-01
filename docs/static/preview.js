(function(){
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}
	
	var Preview = function Preview(src) {
		var _this = this;
	
		_classCallCheck(this, Preview);
	
		this.show = function() {
			_this.buffMove = 3; //缓冲系数
			_this.buffScale = 2; //放大系数
			_this.finger = false; //触摸手指的状态 false：单手指 true：多手指
			
			//创建元素
			var zoomMask = document.createElement("div");
			zoomMask.setAttribute("class", "doc-preview");
			zoomMask.innerHTML = "<div class=\"preview-wrap\"><img src=\"\" class=\"preview-img\"/></div>";
			document.body.appendChild(zoomMask);
	
			var zoomImg = document.querySelector(".preview-img")
			var zoomImgWrap = document.querySelector(".preview-wrap")
	
			_this._destroy();
			_this.zoomMask = zoomMask;
			zoomMask.addEventListener("click", _this.close, false);
			window.addEventListener("keydown",_this.close)
			
			zoomImg.setAttribute("src",_this.src)
			zoomImg.onload = function(e) {
				var imgHeight = zoomImg.naturalHeight,imgWidth = zoomImg.naturalWidth;
				var proportion = imgHeight / imgWidth;
				if(imgWidth > window.innerWidth){
					imgWidth = window.innerWidth;
					imgHeight = imgWidth * proportion;
				}
				if(imgHeight > window.innerHeight){
					imgHeight = window.innerHeight;
					imgWidth = imgHeight / proportion;
				}
				
				zoomMask.style.cssText = "display:block";
				zoomImg.style.cssText = "visibility:inherit;"
				zoomImgWrap.style.cssText = "display:block;width:" + imgWidth + "px;height:" + imgHeight + "px;top:50%;left:50%;transform:translate(-50%,-50%);";
				// 禁止页面滚动
				zoomMask.addEventListener("touchmove", function(e){
					e.stopPropagation();
					e.preventDefault();
				}, false);
	
				_this.imgBaseWidth = imgWidth;
				_this.imgBaseHeight = imgHeight;
				
				_this.addEventStart({
					wrapX: imgWidth,
					wrapY: imgHeight,
					mapX: imgWidth,
					mapY: imgHeight
				});
			};
		};
		this.close = function(e){
			if(e && e.type === "keydown"){
				if(e.keyCode && e.keyCode === 27){
					document.body.removeChild(_this.zoomMask);
					_this._destroy();
					window.removeEventListener("keydown",_this.close)
				}
			}else{
				document.body.removeChild(_this.zoomMask);
				_this._destroy();
				window.removeEventListener("keydown",_this.close)
			}
		}
		this.addEventStart = function(param) {
			var params = param || {};
	
			_this.element = document.querySelector(".preview-img");
	
			//config set
			_this.wrapX = params.wrapX || 0; //可视区域宽度
			_this.wrapY = params.wrapY || 0; //可视区域高度
			_this.mapX = params.mapX || 0; //地图宽度
			_this.mapY = params.mapY || 0; //地图高度
	
			_this.outDistY = (_this.mapY - _this.wrapY) / 2; //图片超过一屏的时候有用
	
			_this.width = _this.mapX - _this.wrapX; //地图的宽度减去可视区域的宽度
			_this.height = _this.mapY - _this.wrapY; //地图的高度减去可视区域的高度
	
			_this.element.addEventListener("touchstart", function(e) {
				_this._touchstart(e);
			}, true);
			_this.element.addEventListener("touchmove", function(e) {
				_this._touchmove(e);
			}, true);
			_this.element.addEventListener("touchend", function(e) {
				_this._touchend(e);
			}, true);
		};
	
		this._destroy = function() {
			_this.scale = 1;
			_this.distX = 0;
			_this.distY = 0;
			_this.newX = 0;
			_this.newY = 0;
		};
	
		this._changeData = function() {
			_this.mapX = _this.element.offsetWidth; //地图宽度
			_this.mapY = _this.element.offsetHeight; //地图高度
			// this.outDistY = (this.mapY - this.wrapY)/2; //当图片高度超过屏幕的高度时候。图片是垂直居中的，这时移动有个高度做为缓冲带
			_this.width = _this.mapX - _this.wrapX; //地图的宽度减去可视区域的宽度
			_this.height = _this.mapY - _this.wrapY; //地图的高度减去可视区域的高度
		};
	
		this._touchstart = function(e) {
			_this.tap = {
				type:true,
				time:new Date().getTime()
			}
			e.preventDefault();
			e.stopPropagation();
	
			var touchTarget = e.targetTouches.length; //获得触控点数
	
			_this._changeData(); //重新初始化图片、可视区域数据，由于放大会产生新的计算
	
			if (touchTarget == 1) {
				// 获取开始坐标
				_this.basePageX = _this._getPage(e, "pageX");
				_this.basePageY = _this._getPage(e, "pageY");
	
				_this.finger = false;
			} else {
				_this.finger = true;
	
				_this.startFingerDist = _this.getTouchDist(e).dist;
				_this.startFingerX = _this.getTouchDist(e).x;
				_this.startFingerY = _this.getTouchDist(e).y;
				console.log(_this.startFingerY)
			}
		};
	
		this._touchmove = function(e) {
			
			e.preventDefault();
			e.stopPropagation();
			var touchTarget = e.targetTouches.length; //获得触控点数
	
			if (touchTarget == 1 && !_this.finger) {
				_this._move(e);
				var moveX = _this._getPage(e, "pageX"),moveY = _this._getPage(e, "pageY");
				if(Math.abs(moveX - _this.basePageX) > 4 || Math.abs(moveY - _this.basePageY) > 4){
					_this.tap.type = false;
				}
			}
	
			if (touchTarget >= 2) {
				_this._zoom(e);
			}
		};
	
		this._touchend = function(e) {
			if(_this.tap.type){
				if(new Date().getTime() - _this.tap.time < 200){
					_this.close()
					return;
				}
			}
			_this._changeData(); //重新计算数据
			if (_this.finger) {
				_this.distX = -_this.imgNewX;
				_this.distY = -_this.imgNewY;
			}
	
			if (_this.distX > 0) {
				_this.newX = 0;
			} else if (_this.distX <= 0 && _this.distX >= -_this.width) {
				_this.newX = _this.distX;
				_this.newY = _this.distY;
			} else if (_this.distX < -_this.width) {
				_this.newX = -_this.width;
			}
			_this.reset();
		};
	
		this._move = function(e) {
			//获取移动坐标
			var pageX = this._getPage(e, "pageX"),pageY = this._getPage(e, "pageY");
	
			// 获得移动距离
			_this.distX = (pageX - _this.basePageX + _this.newX);
			_this.distY = (pageY - _this.basePageY + _this.newY);
			
			if (_this.distX > 0) {
				_this.moveX = Math.round(_this.distX / _this.buffMove);
			} else if (_this.distX <= 0 && _this.distX >= -_this.width) {
				_this.moveX = _this.distX;
			} else if (_this.distX < -_this.width) {
				_this.moveX = -_this.width + Math.round((_this.distX + _this.width) / _this.buffMove);
			}
			_this.movePos();
			_this.finger = false;
		};
	
		this._zoom = function(e) {
			var nowFingerDist = _this.getTouchDist(e).dist,
				//获得当前长度
				ratio = nowFingerDist / _this.startFingerDist,
				//计算缩放比
				imgWidth = Math.round(_this.mapX * ratio),
				//计算图片宽度
				imgHeight = Math.round(_this.mapY * ratio); //计算图片高度
	
			// 计算图片新的坐标
			_this.imgNewX = Math.round(_this.startFingerX * ratio - _this.startFingerX - _this.newX * ratio);
			_this.imgNewY = Math.round((_this.startFingerY * ratio - _this.startFingerY) / 2 - _this.newY * ratio);
			if (imgWidth >= _this.imgBaseWidth) {
				_this.element.style.width = imgWidth + "px";
				_this.scale = imgWidth/_this.imgBaseWidth;
				_this.refresh(-_this.imgNewX, -_this.imgNewY, "0s", "ease");
				_this.finger = true;
			} else {
				if (imgWidth < _this.imgBaseWidth) {
					_this.scale = 1;
					_this.element.style.width = _this.imgBaseWidth + "px";
					_this.refresh(0, 0, "0s", "ease");
				}
			}
	
			_this.finger = true;
		};
	
		this.movePos = function() {
			if (_this.height < 0) {
				if (_this.element.offsetWidth == _this.imgBaseWidth) {
					_this.moveY = Math.round(_this.distY / _this.buffMove);
				} else {
					var moveTop = Math.round((_this.element.offsetHeight - _this.imgBaseHeight) / 2);
					_this.moveY = -moveTop + Math.round((_this.distY + moveTop) / _this.buffMove);
				}
			} else {
				var a = Math.round((_this.wrapY - _this.imgBaseHeight) / 2),
					b = _this.element.offsetHeight - _this.wrapY + Math.round(_this.wrapY - _this.imgBaseHeight) / 2;
	
				if (_this.distY >= -a) {
					_this.moveY = Math.round((_this.distY + a) / _this.buffMove) - a;
				} else if (_this.distY <= -b) {
					_this.moveY = Math.round((_this.distY + b) / _this.buffMove) - b;
				} else {
					_this.moveY = _this.distY;
				}
			}
			_this.refresh(_this.moveX, _this.moveY, "0s", "ease");
		};
	
		this.reset = function() {
			var hideTime = ".2s";
			if (_this.height < 0) {
				_this.newY = -Math.round(_this.element.offsetHeight - _this.imgBaseHeight) / 2;
			} else {
				var a = Math.round((_this.wrapY - _this.imgBaseHeight) / 2),
					b = _this.element.offsetHeight - _this.wrapY + Math.round(_this.wrapY - _this.imgBaseHeight) / 2;
	
				if (_this.distY >= -a) {
					_this.newY = -a;
				} else if (_this.distY <= -b) {
					_this.newY = -b;
				} else {
					_this.newY = _this.distY;
				}
			}
			_this.refresh(_this.newX, _this.newY, hideTime, "ease-in-out");
		};
	
		this.refresh = function(x, y,timer, type) {
			_this.element.style.webkitTransitionProperty = "-webkit-transform";
			_this.element.style.webkitTransitionDuration = timer;
			_this.element.style.webkitTransitionTimingFunction = type;
			_this.element.style.webkitTransform = _this._getTranslate(x, y);
		};
	
		this.getTouchDist = function(e) {
			var x1 = 0,
				y1 = 0,
				x2 = 0,
				y2 = 0,
				x3 = 0,
				y3 = 0,
				result = {};
	
			x1 = e.touches[0].pageX;
			x2 = e.touches[1].pageX;
			y1 = e.touches[0].clientY;
			y2 = e.touches[1].clientY;

			if (!x1 || !x2) return;
	
			if (x1 <= x2) {
				x3 = (x2 - x1) / 2 + x1;
			} else {
				x3 = (x1 - x2) / 2 + x2;
			}
			if (y1 <= y2) {
				y3 = (y2 - y1) / 2 + y1;
			} else {
				y3 = (y1 - y2) / 2 + y2;
			}
	
			result = {
				dist: Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))),
				x: Math.round(x3),
				y: Math.round(y3)
			};
			return result;
		};
		
		
		this._getTranslate = function(x, y) {
			var distX = x,
				distY = y;
			return _this.support.transform3d ? "translate3d(" + distX + "px, " + distY + "px, 0)" : "translate(" + distX + "px, " +
				distY + "px)";
		}
		
		this._getPage = function(event, page) {
			return _this.support.touch ? event.changedTouches[0][page] : event[page];
		}
		
		this.src = src;
		this.support = {
			transform3d: "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix(),
			touch: "ontouchstart" in window
		};
	}
	
	$docsify.Preview = Preview;
})()