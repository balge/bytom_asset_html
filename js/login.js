$(function(){
	var T = {
		init: function(){
			var self = this;
			self.loginIn();
		},
		loginIn: function(){
			var self = this;
			$('#loginForm').bootstrapValidator({
        		feedbackIcons: {
		            valid: 'glyphicon glyphicon-ok',
		            invalid: 'glyphicon glyphicon-remove',
		            validating: 'glyphicon glyphicon-refresh'
		        },
		        fields: {
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
		                    
		                }
		            }
		        }
			}).on('success.form.bv', function(e) {

				e.preventDefault();
				var params = {
					email: $('#email').val(),
					password: $('#password').val()
				}
				$.ajax({
					url: window.url + '/api/login',
					type: 'POST',
					dataType: 'json',
					contentType: 'application/json',
					data: JSON.stringify(params),
					// crossDomain: true,
					// xhrFields: {
					// 	withCredentials: true
					// },
					success: function(res){
						// console.log(res)
						if(res.code == 200) {
							if(res.data){
								self.setCookie('username', res.data.username, 5);
								self.setCookie('email', res.data.email, 5);
							}
							//有回调地址
							var redirect_uri = self.getQueryString('redirect_uri');
							if(redirect_uri) {
								window.location.href = decodeURIComponent(redirect_uri);
							}else{
								window.location.href = 'index.html';
							}

						} else if(res.code == -1){
							self.alertDialog('账号或密码错误', 'danger');
						} else if(res.code == -2){
							self.alertDialog('请验证登录邮箱', 'danger');
						}
					},
					error: function(){
						//失败情况处理
						self.alertDialog('服务器异常', 'danger');
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