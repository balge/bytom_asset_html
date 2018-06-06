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
				var $form = $(e.target);
				console.log($form.serialize())
				$.ajax({
					url: 'url',
					type: 'POST',
					dataType: 'json',
					data: $form.serialize(),
					success: function(res){
						// 成功之后，跳转登录页面
						// 失败，比如密码错误/账号不存在
						
					},
					error: function(){

					}
				});
				
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