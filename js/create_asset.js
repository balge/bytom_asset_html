$(function(){
	var T = {
		init: function(){
			var self = this;
			self.index = 0;//删除资产序列号
			self.items = [];//增删改的创建列表
			var localItems = self.getItem('items');
			if(localItems){
				self.items = self.items.concat(JSON.parse(localItems));
				self.handleReRender();
			}
			self.userName = self.getCookie('username');
			self.email = self.getCookie('email');
			self.loginStatus();
			self.logout();
			self.dialogToggle();
			self.addList();
			self.delList();
			self.modifyList();
			self.checkAl();
			self.submitList();
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
		validateForm: function(){
			var self = this;
			$('#addForm').bootstrapValidator({
        		feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		            name: {
		                validators: {
		                	notEmpty: {
		                        message: '资产名称不得为空'
		                    },
		                    stringLength: {
		                        min: 1,
		                        max: 15,
		                        message: '资产名称长度在1-15个字符之间'
		                    },
		                }
		            },
		            desc: {
		                validators: {
		                	notEmpty: {
		                        message: '资产描述不得为空'
		                    },
		                    stringLength: {
		                        max: 200,
		                        message: '资产描述最多200字'
		                    },
		                }
		            },
		            num: {
		                validators: {
		                    notEmpty: {
		                        message: '资产数量不得为空'
		                    },
		                    regexp: {
					            regexp: "^[1-9][0-9]*$",
					            message: '资产数量必须为大于0的正整数'
					        }
		                }
		            },
		            price: {
		                validators: {
		                    notEmpty: {
		                        message: '资产数量不得为空'
		                    },
		                    regexp: {
					            regexp: "^[0-9.]*$",
					            message: '资产数量必须为大于0的数字'
					        }
		                }
		            }
		        }
			})
		},
		//增加资产
		addList: function(){
			var self = this;
			$('body').on('click', '#add', function(event) {
				event.preventDefault();
				var bootstrapValidator = $('#addForm').data('bootstrapValidator');
				bootstrapValidator.validate();
				if(bootstrapValidator.isValid()){
					var oName = $('#name').val();
				    var oNum = $('#num').val();
				    var oDesc = $('#desc').val();
				    var oPrice = $('#price').val();
				    self.items.push({
				    	name: oName,
				    	num: oNum,
				    	desc: oDesc,
				    	price: oPrice
				    });
				    $('#myModal').modal('hide');
				    $('#myModal').on('hidden.bs.modal',function() {
				         $('.addModal').html('');
				    })
				    // $('.addModal').html('');
				    self.handleReRender();//渲染列表
				    self.setItem('items', JSON.stringify(self.items));
				}
				
			});
		},
		// 修改资产
		modifyList: function(){
			var self = this;
			var index = 0;
			$('.asset-block').on('click', '.btn-edit', function(event) {
				event.preventDefault();
				var AddModalHtml = template($('#addModalTpl').html());
			    $('.addModal').html(AddModalHtml);
				index = parseInt($(this).parents('tr').attr('data-id'));
				$('#name').val($(this).parents('tr').find('.name').text());
				$('#num').val($(this).parents('tr').find('.num').text());
				$('#desc').val($(this).parents('tr').find('.desc').text());
				$('#price').val($(this).parents('tr').find('.price').text());
				//赋值给显示的表单
			    self.validateForm();
				$('#myModal').modal();
			});
			self.updateList(index);
		},
		//编辑按钮之后，更新资产,参数：某一条产品的序列号
		updateList: function(index){
			var self = this;
			$('body').on('click', '#updata', function(event) {
				event.preventDefault();
				var oName = $('#name').val();
			    var oNum = $('#num').val();
			    var oDesc = $('#desc').val();
			    var oPrice = $('#price').val();
			    //修改items列表
			    if(oName !== '' && oNum !== '' && oDesc !== '' && oPrice !== ''){
				    var items = self.items;
					items.splice(index,1,{
						name: oName,
				    	num: oNum,
				    	desc: oDesc,
				    	price: oPrice
					});//删除返回新元素
					self.items = items;
					$('#myModal').modal('hide');
				    $('#myModal').on('hidden.bs.modal',function() {
				         $('.addModal').html('');
				    })
					self.handleReRender();//渲染列表
				    self.setItem('items', JSON.stringify(self.items));
				}
			});
		},
		// 删除资产
		delList: function(){
			var self = this;
			$('.asset-block').on('click', '.btn-del', function(event) {
				event.preventDefault();
				self.index = parseInt($(this).parents('.item').attr('data-id'));
				var index = self.index + 1;
				$('#delModal').find('.modal-body').html('确定删除第' + index + '条资产？').end().modal();
			});

			$('body').on('click', '.btn-sureDel', function(event) {
				event.preventDefault();
				var items = self.items;
				items.splice(self.index,1);//删除返回新元素
				self.items = items;
				self.handleReRender();//渲染列表
				self.setItem('items', JSON.stringify(self.items));
			});

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
		//每次增删改之后，重新render列表
		handleReRender: function(){
			var self = this;
			var addHtml = template($('#addTpl').html(), {
	        	items: self.items
		    });
		    $('.asset-create .table').html(addHtml);
		},
		dialogToggle: function(){
			var self = this;
			$('.add-asset').on('click', function(event) {
				event.preventDefault();
				var AddModalHtml = template($('#addModalTpl').html());
			    $('.addModal').html(AddModalHtml);
			    self.validateForm();
				$('#myModal').modal();
			});
		},
		submitList: function(){
			var self = this;
			// $('.submit-asset').on('click', function(event) {
			// 	event.preventDefault();
			// 	var params = [];
			// 	$('.asset-create tr.item').each(function(index, el) {
			// 		if($(this).find('.checkSingle').is(':checked')){
			// 			params.push({
			// 				name: $(this).find('.name').text(),
			// 		    	num: $(this).find('.num').text(),
			// 		    	desc: $(this).find('.desc').text()
			// 			})
			// 		}
					
			// 	});
				// console.log(JSON.stringify(params))
			// 	if(params.length > 0){//有数据选中后提交
			// 		$.ajax({
			// 	       	url: window.url + '/api/assets_define',
			// 			type: 'POST',
			// 			dataType: 'json',
			// 			contentType: 'application/json',
			// 			data: JSON.stringify(params),
			// 			// xhrFields: {
			// 			// 	withCredentials: true
			// 			// },
			// 	        success: function(res){
				      		// console.log(res)
			// 	        }
			// 		});
			// 	}
			// });
			$('.asset-block').on('click', '.btn-submit', function(event) {
				event.preventDefault();
				self.index = parseInt($(this).parents('.item').attr('data-id'));
				var index = self.index + 1;
				$('#postModal').find('.modal-body').html('确定提交第' + index + '条资产？').end().modal();
			});
			$('body').on('click', '.btn-surePost', function(event) {
				event.preventDefault();
				var params = {
					name: $('tr.item').eq(self.index).find('.name').text(),
			    	num: $('tr.item').eq(self.index).find('.num').text(),
			    	desc: $('tr.item').eq(self.index).find('.desc').text(),
			    	email: self.getCookie('email')
				};
				$.ajax({
			       	url: window.url + '/api/assets_define',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(params),
					// xhrFields: {
					// 	withCredentials: true
					// },
			        success: function(res){
			      		if(res.code == 200){
			      			self.alertDialog('提交成功', 'success')
			      			var items = self.items;
							items.splice(self.index,1);//删除返回新元素
							self.items = items;
							self.handleReRender();//渲染列表
							self.setItem('items', JSON.stringify(self.items));
			      		}else if(res.code == -1) {
			      			self.alertDialog('请前往个人中心认证身份', 'danger')
			      		}else{
			      			self.alertDialog('提交失败，请重试', 'danger')
			      		}
			        },
			        error: function(){
			        	self.alertDialog('提交失败，请重试', 'danger');
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