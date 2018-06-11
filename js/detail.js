$(function(){
	var T = {
		init: function(){
			var self = this;
			self.handleLandR();
			self.tabSwitch();
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
		tabSwitch: function(){
			var self = this;
			$('.dpart-tabs li').on('click', function(event) {
				event.preventDefault();
				$(this).addClass('active').siblings('li').removeClass('active');
				$('.tab-pannel').hide();
				$('.tab-pannel').eq($(this).index()).show();
			});
		}
	};
	T.init();
})