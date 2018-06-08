$(function(){
	var T = {
		init: function(){
			var self = this;
			self.userName = self.getCookie('username');
			self.status = false;
			self.indentStatusArr = [];
			var localIndentStatus = self.getItem('indentValue');
			if(localIndentStatus){
				self.indentStatusArr = self.indentStatusArr.concat(JSON.parse(localIndentStatus));
			}
			self.loginStatus();
			self.indentStatus();
			self.getUserInfo();
			self.renderPurchasedAsset();
			self.renderPublishedAsset();
			self.indentUser();
			self.logout();
		},
		loginStatus: function(){
			var self = this;
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
		indentStatus: function(){
			var self = this;
			var useremail = self.getCookie('email');
			$.each(self.indentStatusArr,function(index, el) {
				var email = el.email;
				var status = el.status;
				if(useremail == email && status == true){
					self.status = true;
					return false;
				}
			});
		},
		getUserInfo: function(){
			var self = this;
			$.ajax({
				url: window.url + '/api/user',
				type: 'GET',
				dataType: 'json',
				data: {
					email: self.getCookie('email')
				},
				success: function(res){
					// console.log(res)
					if(res.code == 200 && res.data){
						var data = res.data;
						$.each(data, function(k, v) {
							if(k == 'last_seen'){
								var year = new Date(v).getFullYear();
								var month = parseInt(new Date(v).getMonth()) >= 9 ? new Date(v).getMonth() + 1 : '0' + parseInt(new Date(v).getMonth() + 1);
								var day = new Date(v).getDate() >= 10 ? new Date(v).getDate() : '0' + new Date(v).getDate();
								var rtime = year + '-' + month + '-' + day;
								data.rtime = rtime;
							}else if(k == 'member_since'){
								var times = new Date().getTime() - new Date(v).getTime();
								var day = Math.floor(times / 1000 / 3600 / 24);
								var hour = Math.floor((times - day * 24 * 3600 * 1000) / 3600 / 1000);
								var minute = Math.floor((times - day * 24 * 3600 * 1000 - hour * 3600) / 60 / 1000);
								if(day > 0){
									data.ltime = day + '天';
								}else if(hour > 0){
									data.ltime = hour + '小时';
								}else if(minute > 0) {
									data.ltime = minute + '分钟';
								} else {
									data.ltime = '几秒';
								}
							}
						});
						var infoHtml = template($('#userInfoTpl').html(), {
							items: data,
							email: self.getCookie('email'),
							status: self.status
					    });
					    $('.user-info').html(infoHtml);
					}else{
						$('.user-info').html('<h4>获取个人信息错误，请稍后重试～～</h4>')
					}
				},
				error: function(){
					$('.user-info').html('<h4>获取个人信息错误，请稍后重试～～</h4>')
				}
			})

		},
		renderPurchasedAsset: function(pageNum,isReRender){
			var self = this;
			$.ajax({
				url: window.url + '/api/personal_assets',
				type: 'GET',
				dataType: 'json',
				data: {
					"email": self.getCookie('email'),
					"asset_type": 1
				},
				success: function(res){
					// console.log(JSON.parse(res.data))
					if(res.code == 200 && res.data && JSON.parse(res.data).length > 0){
						var assetHtml = template($('#assetPurchasedTpl').html(), {
							username: self.userName,
							items: JSON.parse(res.data)
					    });
					    $('.user-purchased').html(assetHtml);
					    self.watchDesc();
					}else{
						$('.user-purchased').html('<h4>'+ self.userName +'暂时无购买的资产～～</h4>')
					}
				},
				error: function(){
					$('.user-purchased').html('<h4>'+ self.userName +'暂时无购买的资产～～</h4>')
				}
			})

			
		 //    if(!isReRender || isReRender != true){
			// 	self.paginator(data.data.length,1);
			// }
		},
		renderPublishedAsset: function(pageNum,isReRender){
			var self = this;
			$.ajax({
				url: window.url + '/api/get_define_assets',
				type: 'GET',
				dataType: 'json',
				data: {
					email: self.getCookie('email'),
					status: 3
				},
				success: function(res){
					// console.log(JSON.parse(res.data))
					if(res.code == 200 && res.data && JSON.parse(res.data).length > 0){
						var assetHtml = template($('#assetPublishedTpl').html(), {
							username: self.userName,
							items: JSON.parse(res.data)
					    });
					    $('.user-published').html(assetHtml);
					    self.watchDesc();
					}else{
						$('.user-published').html('<h4>'+ self.userName +'暂时已发布的资产～～</h4>')
					}
				},
				error: function(){
					$('.user-published').html('<h4>'+ self.userName +'暂时已发布的资产～～</h4>')
				}
			})
		},
		indentUser: function(){
			var self = this;
			$('body').on('click', '.btn-indent', function(event) {
				event.preventDefault();
				var indentModalHtml = template($('#indentModalTpl').html());
				if($('.indentModal').html() == ''){
					$('.indentModal').html(indentModalHtml);
				    $("#cardface1").fileinput({showCaption: false, dropZoneEnabled: false, showUpload:false, showRemove: false, showPreview: true, maxFileCount: 1, autoReplace: true});
				    $("#cardface2").fileinput({showCaption: false, dropZoneEnabled: false, showUpload:false, showRemove: false, showPreview: true, maxFileCount: 1, autoReplace: true});
				    self.validateForm();
				}
				$('#indentModal').modal();
			});
			$('body').on('click', '.btn-sureIndent', function(event) {
				event.preventDefault();
				var bootstrapValidator = $('#indentForm').data('bootstrapValidator');
				bootstrapValidator.validate();
				if(bootstrapValidator.isValid()){
					$('.btn-indent').button('loading');
					var params = {
						'email': self.getCookie('email'),
						'id_card': $('#cardid').val(),
						'name': $('#name').val(),
						'pic1': $('#cardface1').parents('.file-input').find('.file-preview-image').attr('src'),
						'pic2': $('#cardface2').parents('.file-input').find('.file-preview-image').attr('src'),
					}
					$.ajax({
						url: window.url + '/api/identification',
						type: 'POST',
						dataType: 'json',
						contentType: 'application/json',
						data: JSON.stringify(params),
						success: function(res){
							if(res.code == 200){
								$('.btn-indent').val('实名认证成功').removeClass('disabled').removeAttr('disabled');
								$('#indentModal').modal('hide');
							    $('#indentModal').on('hidden.bs.modal',function() {
							         $('.indentModal').html('');
							    });
							    var value = {
							    	email: self.getCookie('email'),
							    	status: true
							    };
							    self.indentStatusArr.push(value);
							    self.setItem('indentValue', JSON.stringify(self.indentStatusArr));
							}
						},
						error: function(){
							//失败情况处理
						}
					});
				}
			});
		},
		validateForm: function(){
			var self = this;
			$('#indentForm').bootstrapValidator({
        		feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		            name: {
		                validators: {
		                	notEmpty: {
		                        message: '姓名不得为空'
		                    },
		                    regexp: {
					            regexp: "^[\u4e00-\u9fa5]*$",
					            message: "姓名只支持中文"
					        },
		                    stringLength: {
		                        min: 2,
		                        max: 4,
		                        message: '姓名在2-4个字符之间'
		                    }
		                }
		            },
		            cardid: {
		                validators: {
		                	notEmpty: {
		                        message: '身份证号码不得为空'
		                    },
		                    regexp: {
					            regexp: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
					            message: "请输入正确格式的身份证号码"
					        }
		                }
		            },
		            cardface1: {
		                validators: {
		                	notEmpty: {
		                        message: '请上传身份证正面'
		                    }
		                }
		            },
		            cardface2: {
		                validators: {
		                	notEmpty: {
		                        message: '请上传身份证反面'
		                    }
		                }
		            }
		        }
			})
		},
		watchDesc: function(){
			var self = this;
			$('.btn-watchDesc').on('click', function(event) {
				event.preventDefault();
				var desc = $(this).attr('data-desc');
				$('#descModal .modal-body').html(desc);
			});
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