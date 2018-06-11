$(function(){
	var T = {
		init: function(){
			var self = this;
			self.bxslider();
			self.parallax();
			self.handleLandR();
		},
		bxslider: function(){
			var self = this;
			$('#marquee').bxSlider({
		        mode:'vertical', //默认的是水平
		        displaySlideQty:1,//显示li的个数
		        moveSlideQty: 1,//移动li的个数
		        auto: true,
		        pause: 3000,
		        autoHover: true,
		        controls: false//隐藏左右按钮
		  });
		},
		handleLandR: function(){
			var self = this;
			$('.login').on('click', function(event) {
				event.preventDefault();
				window.location.href = 'login.html?redirect_uri=' + encodeURIComponent(window.location.href);
			});
			$('.register').on('click', function(event) {
				event.preventDefault();
				window.location.href = 'register.html?redirect_uri=' + encodeURIComponent(window.location.href);
			});
		},
		parallax: function(){
			var self = this;
			$('.scene').parallax();
		}
	};
	T.init();
})