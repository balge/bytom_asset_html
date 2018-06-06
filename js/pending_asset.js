$(function(){
	var T = {
		init: function(){
			var self = this;
			self.index = 0;
			self.userName = self.getCookie('username');
			self.loginStatus();
			self.renderAsset();
			self.operateAsset();
			self.checkAl();
			self.logout();
		},
		loginStatus: function(){
			var self = this;
			//ajax请求登录返回loginStatus,保存cookie
			self.setCookie('username', 'wuchengba', 1);//模拟登录
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
			var data = {
				"code": 200,
				"msg": '请求成功',
				data: [{
					"name": "btm",
					"owner": "bytom",
					"time": "2018/06/03",
					"desc": "这是资产描述",
					"num": 10,
					"price": 1000,
					"detailUrl": "http://www.baidu.com",//详情地址
					"orderUrl": "http://www.google.com",//购买地址
					"id": 100//产品id
				},{
					"name": "btm2",
					"owner": "bytom",
					"time": "2018/06/03",
					"desc": "这是资产描述",
					"num": 10,
					"price": 1000,
					"detailUrl": "http://www.baidu.com",//详情地址
					"orderUrl": "http://www.google.com",//购买地址
					"id": 100//产品id
				},{
					"name": "btm3",
					"owner": "bytom",
					"time": "2018/06/03",
					"desc": "这是资产描述",
					"num": 10,
					"price": 1000,
					"detailUrl": "http://www.baidu.com",//详情地址
					"orderUrl": "http://www.google.com",//购买地址
					"id": 100//产品id
				},{
					"name": "btm4",
					"owner": "bytom",
					"time": "2018/06/03",
					"desc": "这是资产描述",
					"num": 10,
					"price": 1000,
					"detailUrl": "http://www.baidu.com",//详情地址
					"orderUrl": "http://www.google.com",//购买地址
					"id": 100//产品id
				},{
					"name": "btm5",
					"owner": "bytom",
					"time": "2018/06/03",
					"desc": "这是资产描述",
					"num": 10,
					"price": 1000,
					"detailUrl": "http://www.baidu.com",//详情地址
					"orderUrl": "http://www.google.com",//购买地址
					"id": 100//产品id
				}]
			};

			var assetHtml = template($('#assetTpl').html(), {
				items: data.data
		    });
		    $('.asset-pending .table-box').html(assetHtml);
		},
		operateAsset: function(){
			var self = this;

			//显示确认操作弹窗
			$('.btn-allDel').on('click', function(event) {
				event.preventDefault();
				var modalHtml = template($('#modalTpl').html(), {
			        tips: '确定批量删除选中资产？',
			        type: "delAll"
			    });
			    $('.modal-box').html(modalHtml);
			    $('#myModal').modal();
			});

			$('.btn-allPending').on('click', function(event) {
				event.preventDefault();
				var modalHtml = template($('#modalTpl').html(), {
			        tips: '确定批量审批选中资产？',
			        type: "pendingAll"
			    });
			    $('.modal-box').html(modalHtml);
			    $('#myModal').modal();
			});

			$('body').on('click', '.btn-del', function(event) {
				event.preventDefault();
				self.index = parseInt($(this).parents('.item').attr('data-id'));
				var index = self.index + 1;
				var modalHtml = template($('#modalTpl').html(), {
			        tips: '确定删除第' + index + '条资产？',
			        type: "delOne"
			    });
			    $('.modal-box').html(modalHtml);
			    $('#myModal').modal();
			});

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

			//批量删除
			$('body').on('click', '.btn-delAll', function(event) {
				event.preventDefault();
				var params = [];
				$('.asset-pending tr.item').each(function(index, el) {
					if($(this).find('.checkSingle').is(':checked')){
						params.push({
							name: $(this).find('.name').text(),
					    	num: $(this).find('.num').text(),
					    	desc: $(this).find('.desc').text()
						})
					}
					
				});
				console.log(JSON.stringify(params))
				if(params.legth > 0){//有数据选中后提交
					// $.ajax({
				 //      type: "POST",
				 //      url: "/url.do",
				 //      data: params,
				 //      dataType : "json",
				 //      success: function(res){
				 			// self.renderAsset();
				 //      }
					// });
				}
			});

			//批量审批
			$('body').on('click', '.btn-pendingAll', function(event) {
				event.preventDefault();
				var params = [];
				$('.asset-pending tr.item').each(function(index, el) {
					if($(this).find('.checkSingle').is(':checked')){
						params.push({
							name: $(this).find('.name').text(),
					    	num: $(this).find('.num').text(),
					    	desc: $(this).find('.desc').text()
						})
					}
					
				});
				console.log(JSON.stringify(params))
				if(params.legth > 0){//有数据选中后提交
					// $.ajax({
				 //      type: "POST",
				 //      url: "/url.do",
				 //      data: params,
				 //      dataType : "json",
				 //      success: function(res){
				 			// self.renderAsset();
				 //      }
					// });
				}
			});


			//单个删除
			$('body').on('click', '.btn-delOne', function(event) {
				event.preventDefault();
				var params = [];
				params.push({
					name: $('.item').eq(self.index).find('.name').text(),
			    	num: $('.item').eq(self.index).find('.num').text(),
			    	desc: $('.item').eq(self.index).find('.desc').text()
				});
				console.log(JSON.stringify(params))
				// $.ajax({
				 //      type: "POST",
				 //      url: "/url.do",
				 //      data: params,
				 //      dataType : "json",
				 //      success: function(res){
				 			// self.renderAsset();
				 //      }
					// });
			});

			//单个删除
			$('body').on('click', '.btn-pendingOne', function(event) {
				event.preventDefault();
				var params = [];
				params.push({
					name: $('.item').eq(self.index).find('.name').text(),
			    	num: $('.item').eq(self.index).find('.num').text(),
			    	desc: $('.item').eq(self.index).find('.desc').text()
				});
				console.log(JSON.stringify(params))
				// $.ajax({
				 //      type: "POST",
				 //      url: "/url.do",
				 //      data: params,
				 //      dataType : "json",
				 //      success: function(res){
				 			// self.renderAsset();
				 //      }
					// });
			});


		},
		logout: function(){
			var self = this;
			$('.logout').on('click', function(event) {
				event.preventDefault();
				self.setCookie('username', '', -1);
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
		}
	};
	T.init();
})