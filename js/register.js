$(function(){
	var T = {
		init: function(){
			var self = this;
			self.validateForm();
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
		                    },
		                    remote: {
		                    	url: 'http://www.baoidu.com',
		                    	data: {
	                    			email: function() {
	                            		return $('#email').val()
	                            	}
		                        },
		                    	message: '邮箱已被注册',
		                    	delay: 2000,
		                    	type: 'POST'
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
				var $form = $(e.target);
				console.log($form.serialize())
				$.ajax({
					url: 'http://www.baoidu2.com',
					type: 'POST',
					dataType: 'json',
					data: $form.serialize(),
					crossDomain: true,
					success: function(res){
						
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