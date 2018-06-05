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










