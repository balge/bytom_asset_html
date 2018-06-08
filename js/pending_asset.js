$(function(){
	var T = {
		init: function(){
			var self = this;
			self.index = 0;
			self.userName = self.getCookie('username');
			self.loginStatus();
			self.renderAsset();
			self.operateAsset();
			// self.checkAl();
			self.logout();
		},
		loginStatus: function(){
			var self = this;
			//ajax请求登录返回loginStatus,保存cookie
			// self.setCookie('username', 'wuchengba', 1);//模拟登录
			if(self.userName){
				var loginStatus = true;
			}else{
				var loginStatus = false;
				window.location.href = 'login.html?redirect_uri=' + encodeURIComponent(window.location.href);
				return false;
			}
			var navBarHtml = template($('#navTpl').html(), {
		        loginStatus: loginStatus//已经登录
		    });
		    $('.navbar-collapse').html(navBarHtml);
		},
		checkAl: function(){
			var self = this;
			$('.asset-block').on('click', '.checkAll', function(event) {
				var status = $(this).is(":checked");
				$('.asset-table .checkSingle').each(function(index, el) {
					$(this).prop('checked', status);
				});
			});
		},
		renderAsset: function(){
			var self = this;
			$.ajax({
				url: window.url + '/api/get_define_assets',
				type: 'GET',
				dataType: 'json',
				data: {
					email: self.getCookie('email'),
				},
				success: function(res){
					console.log(JSON.parse(res.data))
					if(res.code == 200 && res.data && JSON.parse(res.data).length > 0){
						var assetHtml = template($('#assetTpl').html(), {
							items: JSON.parse(res.data).filter(function(a){return a.status !==3 })
					    });
					    $('.asset-table .table-box').html(assetHtml);
					}else{
						$('.asset-table .table-box').html('<h4>暂时无待审核/发布资产～～</h4>')
					}
				},
				error: function(){
					$('.asset-table .table-box').html('<h4>暂时无待审核/发布资产～～</h4>')
				}
			})
		},
		operateAsset: function(){
			var self = this;

			//显示确认操作弹窗
			// $('.btn-allDel').on('click', function(event) {
			// 	event.preventDefault();
			// 	var modalHtml = template($('#modalTpl').html(), {
			//         tips: '确定批量删除选中资产？',
			//         type: "delAll"
			//     });
			//     $('.modal-box').html(modalHtml);
			//     $('#myModal').modal();
			// });

			// $('.btn-allPending').on('click', function(event) {
			// 	event.preventDefault();
			// 	var modalHtml = template($('#modalTpl').html(), {
			//         tips: '确定批量审批选中资产？',
			//         type: "pendingAll"
			//     });
			//     $('.modal-box').html(modalHtml);
			//     $('#myModal').modal();
			// });
			// 
			// 
			// //批量删除
			// $('body').on('click', '.btn-delAll', function(event) {
			// 	event.preventDefault();
			// 	var params = [];
			// 	$('.asset-pending tr.item').each(function(index, el) {
			// 		if($(this).find('.checkSingle').is(':checked')){
			// 			params.push({
			// 				name: $(this).find('.name').text(),
			// 		    	num: $(this).find('.num').text(),
			// 		    	desc: $(this).find('.desc').text()
			// 			})
			// 		}
					
			// 	});
			// 	console.log(JSON.stringify(params))
			// 	if(params.legth > 0){//有数据选中后提交
			// 		// $.ajax({
			// 	 //      type: "POST",
			// 	 //      url: "/url.do",
			// 	 //      data: params,
			// 	 //      dataType : "json",
			// 	 //      success: function(res){
			// 	 			// self.renderAsset();
			// 	 //      }
			// 		// });
			// 	}
			// });

			// //批量审批
			// $('body').on('click', '.btn-pendingAll', function(event) {
			// 	event.preventDefault();
			// 	var params = [];
			// 	$('.asset-pending tr.item').each(function(index, el) {
			// 		if($(this).find('.checkSingle').is(':checked')){
			// 			params.push({
			// 				name: $(this).find('.name').text(),
			// 		    	num: $(this).find('.num').text(),
			// 		    	desc: $(this).find('.desc').text()
			// 			})
			// 		}
					
			// 	});
			// 	console.log(JSON.stringify(params))
			// 	if(params.legth > 0){//有数据选中后提交
			// 		// $.ajax({
			// 	 //      type: "POST",
			// 	 //      url: "/url.do",
			// 	 //      data: params,
			// 	 //      dataType : "json",
			// 	 //      success: function(res){
			// 	 			// self.renderAsset();
			// 	 //      }
			// 		// });
			// 	}
			// });

			// $('body').on('click', '.btn-del', function(event) {
			// 	event.preventDefault();
			// 	self.index = parseInt($(this).parents('.item').attr('data-id'));
			// 	var index = self.index + 1;
			// 	var modalHtml = template($('#modalTpl').html(), {
			//         tips: '确定删除第' + index + '条资产？',
			//         type: "delOne"
			//     });
			//     $('.modal-box').html(modalHtml);
			//     $('#myModal').modal();
			// });



			// //单个删除
			// $('body').on('click', '.btn-delOne', function(event) {
			// 	event.preventDefault();
			// 	var params = [];
			// 	params.push({
			// 		name: $('.item').eq(self.index).find('.name').text(),
			//     	num: $('.item').eq(self.index).find('.num').text(),
			//     	desc: $('.item').eq(self.index).find('.desc').text()
			// 	});
			// 	console.log(JSON.stringify(params))
			// 	// $.ajax({
			// 	 //      type: "POST",
			// 	 //      url: "/url.do",
			// 	 //      data: params,
			// 	 //      dataType : "json",
			// 	 //      success: function(res){
			// 	 			// self.renderAsset();
			// 	 //      }
			// 		// });
			// });

			//单个审批
			
			$('body').on('click', '.btn-pending', function(event) {
				event.preventDefault();
				self.index = parseInt($(this).parents('.item').attr('data-id'));
				var index = self.index + 1;
				var modalHtml = template($('#modalTpl').html(), {
			        tips: '确定审批第' + index + '条资产？',
			        type: "pendingOne"
			    });
			    $('.modal-box').html(modalHtml);
			    $('#myModal').modal();
			});
			$('body').on('click', '.btn-pendingOne', function(event) {
				event.preventDefault();
				var params = {
					"assets_name": $('.item').eq(self.index).find('.name').text(),
					"email": self.getCookie('email')
				};
				console.log(JSON.stringify(params))
				$.ajax({
				    url: window.url + '/api/assets_audit',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(params),
					success: function(res){
						if(res.code == 200){
							$('.item').eq(self.index).find('.btn-pending').button('loading');
							self.alertDialog('提交审核成功', 'success');
						}
						else{
							self.alertDialog('提交审核失败', 'danger');
						}
					},
					error: function(){
						self.alertDialog('提交审核失败', 'danger');
					}
				});
			});

			//单个发布
			$('body').on('click', '.btn-publish', function(event) {
				event.preventDefault();
				self.index = parseInt($(this).parents('.item').attr('data-index'));
				var index = self.index + 1;
				var modalHtml = template($('#modalTpl').html(), {
			        tips: '确定发布第' + index + '条资产？',
			        type: "publishOne"
			    });
			    $('.modal-box').html(modalHtml);
			    $('#myModal').modal();
			});
			$('body').on('click', '.btn-publishOne', function(event) {
				event.preventDefault();
				var params = {
					"assets_name": $('.item').eq(self.index).find('.name').text(),
					"email": self.getCookie('email')
				};
				console.log(JSON.stringify(params))
				$.ajax({
				    url: window.url + '/api/assets_issue',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(params),
					success: function(res){
						if(res.code == 200){
							$('.item').eq(self.index).find('.btn-publish').button('loading');
							self.renderAsset();
							self.alertDialog('发布成功', 'success');
						}
						else{
							self.alertDialog('发布失败', 'danger');
						}
					},
					error: function(){
						self.alertDialog('发布失败', 'danger');
					}
				});
			});


		},

		alertDialog: function(text, type){
			var self = this;
			var alertHtml = template($('#alertTpl').html(), {
		        text: text,
		        type: type
		    });
		    $('.dialog-box').html(alertHtml).addClass('show');
		    $('.alert.alert-dismissible').alert();
		    setTimeout(function(){
		    	$('.dialog-box').removeClass('show');
		    },2000);
		    setTimeout(function(){
		    	$('.alert.alert-dismissible').alert('close');
		    },2300);
		},

		logout: function(){
			var self = this;
			$('.logout').on('click', function(event) {
				event.preventDefault();
				self.setCookie('username', '', -1);
				self.setCookie('email', '', -1);
				self.setItem('items', JSON.stringify(new Array()));
				window.location.href = 'login.html?redirect_uri=' + encodeURIComponent(window.location.href);
			});
		},
		setCookie: function(cname, cvalue, exdays) {
			var self = this;
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));
		    var expires = "expires="+d.toUTCString();
		    document.cookie = cname + "=" + cvalue + "; " + expires;
		},
		getCookie: function(cname) {
			var self = this;
		    var name = cname + "=";
		    var ca = document.cookie.split(';');
		    for(var i=0; i<ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0)==' ') c = c.substring(1);
		        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		    }
		    return "";
		},
		getItem: function (key) {
			var self = this;
			var value = localStorage.getItem(key);
			if (value) {
				return value;
			}else{
				return ""
			}
		},
		setItem: function (key, value) {
			var self = this;
			localStorage.setItem(key, value);
		}
	};
	T.init();
})