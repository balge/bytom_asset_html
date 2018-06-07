# 功能完善，切daily/0.0.1版本

## 首页可购买资产列表

- type: GET
- params: pageNum->当前页码，pageSize->默认10
```
{
	"code": 200,
	"msg": '请求成功',
	"pageNum": 1,
	"pageSize": 10,
	data: [{
		"name": "btm",
		"owner": "bytom",
		"time": "2018/06/03",
		"price": 1000,
		"detailUrl": "http://www.baidu.com",//详情地址
		"orderUrl": "http://www.google.com",//购买地址
		"id": 100//产品id
	}, {
		"name": "btm",
		"owner": "bytom",
		"time": "2018/06/03",
		"price": 1000,
		"detailUrl": "http://www.baidu.com",//详情地址
		"orderUrl": "http://www.google.com",//购买地址
		"id": 100//产品id
	}]
};
```

## 个人资产

#### 资产概况

- type: GET
- params：用户信息（username或者userid）

```
{
	"code": 200,
	"msg": '请求成功',
	"data": {
		"release": 100,
		"owner": 88,
		"examine": 20
	}
}
```

#### 资产记录/资产中心（全量数据，同首页可购买资产列表）

- type: GET
- params：用户信息（username或者userid），pageNum->当前页码，pageSize->默认10

```
{
	"code": 200,
	"msg": '请求成功',
	"pageNum": 1,
	"pageSize": 10,
	data: [{
		"name": "btm",
		"owner": "bytom",
		"time": "2018/06/03",
		"price": 1000,
		"detailUrl": "http://www.baidu.com",//详情地址
		"orderUrl": "http://www.google.com",//购买地址
		"id": 100//产品id
	}, {
		"name": "btm",
		"owner": "bytom",
		"time": "2018/06/03",
		"price": 1000,
		"detailUrl": "http://www.baidu.com",//详情地址
		"orderUrl": "http://www.google.com",//购买地址
		"id": 100//产品id
	}]
};
```

#### 已发布/购买资产


- type: GET
- params：用户信息（username或者userid），pageNum->当前页码，pageSize->默认10

```
{
	"code": 200,
	"msg": '请求成功',
	"pageNum": 1,
	"pageSize": 10,
	data: [{
		"name": "btm",
		"owner": "bytom",
		"time": "2018/06/03",
		"price": 1000,
		"detailUrl": "http://www.baidu.com",//详情地址
		"orderUrl": "http://www.google.com",//购买地址
		"id": 100//产品id
	}, {
		"name": "btm",
		"owner": "bytom",
		"time": "2018/06/03",
		"price": 1000,
		"detailUrl": "http://www.baidu.com",//详情地址
		"orderUrl": "http://www.google.com",//购买地址
		"id": 100//产品id
	}]
};
```

#### 创建资产

- type: POST
- params: JSON.stringify(Array)或者Array格式，[{"name":"资产名称","num":"10","desc":"资产描述"}]

```
{
	code: 200,
	msg: "提交成功"

}

{
	code: -1,
	msg: "提交失败，xxxx原因"
}
```

#### 审批资产/批量审批

- type: POST 
- 参数同创建资产


#### 删除资产/批量删除

- type: POST
- 参数同创建资产


## 个人中心


## 登录

- type: POST
- params(form.serialize()格式): email=wucb%408btc.com&password=123456

```
{
	code: 200,
	msg: '登录成功',
	data: {
		email: '1111@1111.com',
		username: 'balge'
	}
}

{
	code: -1或者-2或者-3...,
	msg: '登录失败，邮箱不存在 -1，密码错误 -2 等问题，把这些返回出来'
}
```


## 注册

#### 提交注册表单
- type: POST
- params(form.serialize()格式): email=wucb%408btc.com&username=weqr21&password=123456&confirmPassword=123456

```
{
	code: 200,
	msg: '注册成功',
	data: {
		email: '1111@1111.com',
		username: 'balge',
		password: '123456'
	}
}

{
	code: -1,
	msg: '注册失败的情况，邮箱占用单独处理'
}

```


#### 邮箱是否被占用


- type: POST
- params       email: 33333@333.com

```
	//必须返回这个格式
	{
		"valid":false
	} //表示不合法，验证不通过
	{
		"valid":true
	} //表示合法，验证通过
```













