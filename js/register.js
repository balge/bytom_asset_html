$(function(){
	var T = {
		init: function(){
			var self = this;
			self.validateForm();
			self.goLogin();
		},
		validateForm: function(){
			var self = this;
			$('#registerForm').bootstrapValidator({
        		feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
		        	username: {
		                validators: {
		                    notEmpty: {
		                        message: '用户名不得为空'
		                    },
		                    stringLength: {
		                        min: 5,
		                        max: 15,
		                        message: '用户名长度在5-15个字符之间'
		                    },
		                    regexp: {
		                        regexp: /^[a-zA-Z0-9]+$/,
		                        message: '用户名只能由字母、数字组成。'
		                    },
		                    different: {
		                        field: 'password',
		                        message: '用户名不能和密码相同'
		                    }
		                }
		            },
		            email: {
		                validators: {
		                	notEmpty: {
		                        message: '邮箱地址不得为空'
		                    },
		                    emailAddress: {
		                        message: '请输入正确格式的邮箱地址'
		                    }
		                }
		            },
		            password: {
		                validators: {
		                    notEmpty: {
		                        message: '密码不得为空'
		                    },
		                    identical: {
		                        field: 'confirmPassword',
		                        message: '两次输入密码不同'
		                    },
		                    stringLength: {
		                        min: 6,
		                        message: '至少输入6位长度密码'
		                    },
		                    different: {
		                        field: 'username',
		                        message: '密码不能和用户名相同'
		                    }
		                }
		            },
		            confirmPassword: {
		                validators: {
		                    notEmpty: {
		                        message: '密码不得为空'
		                    },
		                    identical: {
		                        field: 'password',
		                        message: '两次输入密码不同'
		                    },
		                    stringLength: {
		                        min: 6,
		                        message: '至少输入6位长度密码'
		                    },
		                    different: {
		                        field: 'username',
		                        message: '密码不能和用户名相同'
		                    }
		                }
		            }
		        }
			}).on('success.form.bv', function(e) {

				e.preventDefault();
				var params = {
					username: $('#username').val(),
					email: $('#email').val(),
					password: $('#password').val(),
					confirmPassword: $('#confirmPassword').val()
				}
				$.ajax({
					url: window.url + '/api/register',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(params),
					// crossDomain: true,
					// xhrFields: {
					// 	withCredentials: true
					// },
					success: function(res){
						if(res.code == 200){
							//注册成功，跳转登录页面
							var redirect_uri = self.getQueryString('redirect_uri');
							if(redirect_uri) {
								window.location.href = 'login.html?redirect_uri=' + redirect_uri;
							}else{
								window.location.href = 'login.html';
							}
							
						}else if(res.code == -1){
							//邮箱已经注册
							self.alertDialog('邮箱已经注册', 'danger');
						}else{
							self.alertDialog('服务器异常', 'danger');
						}
					},
					error: function(){
						//失败情况处理
						self.alertDialog('服务器异常', 'danger');
					}
				});
				
			});
		},
		goLogin: function(){
			var self = this;
			$('.login').on('click', function(event) {
				event.preventDefault();
				var redirect_uri = self.getQueryString('redirect_uri');
				if(redirect_uri) {
					window.location.href = 'login.html?redirect_uri=' + redirect_uri;
				}else{
					window.location.href = 'login.html';
				}
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
		    },3000);
		    setTimeout(function(){
		    	$('.alert.alert-dismissible').alert('close');
		    },3300);
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
		getQueryString: function(name) { 
			var self = this;
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	        var r = window.location.search.substr(1).match(reg); 
	        if (r != null) return unescape(r[2]); 
	        return null; 
	    }
	};
	T.init();
})