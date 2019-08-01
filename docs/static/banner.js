//首页轮播
StartBanner();
function StartBanner() {
	var banner = document.querySelector(".banner"),
		slider = document.querySelector(".slider-group"),
		sliderItems = document.querySelectorAll(".slider-item"),
		sliderLength = sliderItems.length;
	var bannerWidth = null,
		index = 1; //slider下标
	var arrowLeft = document.querySelector(".slider-btn-left"),
		arrowRight = document.querySelector(".slider-btn-right");

	//创建dots
	var sliderDots = document.createElement('div');
	sliderDots.className = 'slider-dots';
	var dots = '<span class="dot active" data-num="0"></span>';
	for (var i = 1; i < sliderLength; i++) {
		dots += '<span class="dot" data-num="' + i + '"></span>'
	}
	sliderDots.innerHTML = dots;
	document.querySelector(".slider").appendChild(sliderDots);

	//在第一个前、最后一个后各加一个item
	var last_item = document.createElement('div'),
		next_item = document.createElement('div');
	last_item.className = 'slider-item';
	last_item.innerHTML = sliderItems[sliderItems.length - 1].innerHTML;
	slider.insertBefore(last_item, sliderItems[0]);
	next_item.className = 'slider-item';
	next_item.innerHTML = sliderItems[0].innerHTML;
	slider.appendChild(next_item);

	sliderItems = document.querySelectorAll(".slider-item");

	function setSlider() {
		bannerWidth = banner.offsetWidth;
		for (var i = 0, length = sliderItems.length; i < length; i++) {
			sliderItems[i].style.width = bannerWidth + "px";
		}
		slider.style.width = sliderItems.length * bannerWidth + "px";
		slider.style.transition = "transform 0ms";
		slider.style.transform = "translate(" + (-index * bannerWidth) + "px, 0px)";
	}
	setSlider();
	window.onresize = setSlider;
	var sliderTime = setInterval(sliderStart, 5000);

	function sliderStart() { //开始轮播
        if(!~location.pathname.indexOf($docsify.banner)){
            clearInterval(sliderTime);
            return;
        }
		index += 1;
		if (index < 0 || index > sliderLength + 1) {
			index = index < 0 ? 0 : sliderLength + 1;
		}
		slider.style.transition = "transform 300ms";
		document.querySelector(".active.dot").classList.remove("active");
		var dotIndex = index > sliderLength ? 0 : (index < 1 ? sliderLength - 1 : index - 1);
		sliderDots.children[dotIndex].classList.add("active");
		slider.style.transform = "translate(" + (-index * bannerWidth) + "px, 0px)";
		setTimeout(function() {
			if (index > sliderLength || index < 1) {
				index = index > sliderLength ? 1 : sliderLength;
				slider.style.transition = "transform 0ms";
				slider.style.transform = "translate(" + (-index * bannerWidth) + "px, 0px)";
			}
		}, 300)
	}
	var mouseClearSlider = false;
	sliderDots.addEventListener("mouseover", function(e) {
		showArrow()
		if (e.target.tagName === "SPAN") {
			mouseClearSlider = true;
			clearInterval(sliderTime);
			if (e.target.className === "dot") {
				slider.style.transition = "transform 300ms";
				document.querySelector(".active.dot").classList.remove("active");
				e.target.classList.add("active");
				index = Number(e.target.dataset.num) + 1;
				slider.style.transform = "translate(" + (-index * bannerWidth) + "px, 0px)";
			}
			return
		}
		if (mouseClearSlider) {
			mouseClearSlider = false;
			clearInterval(sliderTime);
			sliderTime = setInterval(sliderStart, 5000);
		}
	})
	sliderDots.addEventListener("mouseout", function(e) {
		hideArrow()
		if (mouseClearSlider) {
			mouseClearSlider = false;
			clearInterval(sliderTime);
			sliderTime = setInterval(sliderStart, 5000);
		}
	});
	// 处理 banner 的两个箭头
	document.querySelector(".slider").addEventListener("mouseover", showArrow);
	document.querySelector(".slider").addEventListener("mouseout", hideArrow);
	arrowLeft.addEventListener("mouseover", showArrow);
	arrowLeft.addEventListener("mouseout", hideArrow);
	arrowRight.addEventListener("mouseover", showArrow);
	arrowRight.addEventListener("mouseout", hideArrow);

	function showArrow() { //显示箭头
		arrowLeft.style.display = "block";
		arrowRight.style.display = "block";
// 		var scroll_left = document.documentElement.scrollLeft;
// 		arrowLeft.style.left = scroll_left + "px";
// 		arrowRight.style.right = document.documentElement.scrollWidth - document.documentElement.clientWidth - scroll_left +
// 			'px';
	}

	function hideArrow() { //隐藏箭头
		arrowLeft.style.display = "none";
		arrowRight.style.display = "none";
	}
	arrowLeft.addEventListener("click", function() {
		index -= 2;
		clearInterval(sliderTime);
		sliderStart()
		sliderTime = setInterval(sliderStart, 5000);
	})
	arrowRight.addEventListener("click", function() {
		clearInterval(sliderTime);
		sliderStart();
		sliderTime = setInterval(sliderStart, 5000);
	})
}
