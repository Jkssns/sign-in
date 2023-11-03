'use strict';
const FormData = require('form-data');
const imgBase = require('./imgBase.js');
exports.main = async (event, context) => {
	// 获取彩票号码
	const res = await uniCloud.request({
		url: 'https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry?gameNo=85&provinceId=0&pageSize=1&isVerify=1&pageNo=1',
		method: "get",
		dataType: 'json' // 指定返回值为json格式，自动进行parse
	})
	const lotteryNumber = res.data.value.lastPoolDraw.lotteryDrawResult;
	
	const winArr = [
		{ right: '5-2', level: '一等奖-浮动' },
		{ right: '5-1', level: '二等奖-浮动' },
		{ right: '5-0', level: '三等奖-10000' },
		{ right: '4-2', level: '四等奖-3000' },
		{ right: '4-1', level: '五等奖-300' },
		{ right: '3-2', level: '六等奖-200' },
		{ right: '4-0', level: '七等奖-100' },
		{ right: '3-1', level: '八等奖-15' },
		{ right: '2-2', level: '八等奖-15' },
		{ right: '3-0', level: '九等奖-5' },
		{ right: '2-1', level: '九等奖-5' },
		{ right: '1-2', level: '九等奖-5' },
		{ right: '0-2', level: '九等奖-5' },
	]

	const checkLottery = (number, winNumber) => {
		const n1Temp = number.split(' - '), n2Temp = winNumber.split(' - ');
		const n1Left = n1Temp[0].split(' '), n1Right = n1Temp[1].split(' ');
		const n2Left = n2Temp[0].split(' '), n2Right = n2Temp[1].split(' ');
		let left = 0, right = 0;
		
		for (const item of n1Left) {
			if (n2Left.includes(item)) {
				left++;
			}
		}
		for (const item of n1Right) {
			if (n2Right.includes(item)) {
				right++;
			}
		}

		const checkedLottery = `${left}-${right}`;
		const res = winArr.find(item => item.right === checkedLottery);

		if (res) {
			return res.level;
		} else {
			return '未中奖';
		}
	}
	
	let rightNumber = lotteryNumber.split(' ');
	rightNumber.splice(5, 0, '-');
	rightNumber = rightNumber.join(' ');
	
	const db = uniCloud.database(); // 获取云数据库的引用
	const collection = db.collection('lottery');
	const userCollection = await db.collection('lottery_user').get();
	const list = await collection.orderBy('date', 'desc').limit(userCollection.data.length).get();
	
	const getContent = (n1, n2) => {
		return '### 开奖号码：' + n1 + 
			   '\n\n### 我的号码：' + n2 + 
			   `\n\n#### 规则![Image](${imgBase})`; // 中奖规则
	}
	
	/*
		每次通知时候，取所有用户。可能会存在已经设置彩票号码后，添加新用户的操作。
		每次取彩票数据时，又是根据所有用户的数量取，所以可能会有1个新用户未设置彩票被加，
		取彩票列表又根据用户数量多取一条的情况，用alreadySetObj判断。
	*/
	const alreadySetObj = {};
	for (let item of list.data){
		if (!alreadySetObj[item.belong]) {
			alreadySetObj[item.belong] = true;
		} else {
			continue;
		}
		const result = checkLottery(item.number, rightNumber);
		// 更新数据库中奖信息
		await collection.doc(item._id).update({ result, lotteryNumber: rightNumber, dateStr: new Date().toLocaleDateString() });
		// 推送中奖号码，同时告知有没有中奖
		const form = new FormData();
		form.append('title', result);
		form.append('desp', getContent(rightNumber, item.number));
		form.append('channel', 9);

		await uniCloud.httpclient.request(`https://sctapi.ftqq.com/${item.belong}.send`, {
			method: "POST",
			content: form.getBuffer(), // 请求内容
			headers: form.getHeaders(), // 请求头
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		}).catch(err => {
			console.log(err, 'errr')
		})
	}
};
