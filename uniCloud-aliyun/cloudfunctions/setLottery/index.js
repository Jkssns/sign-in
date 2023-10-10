'use strict';
const FormData = require('form-data');
exports.main = async (event, context) => {
	const getNumberArea = (num) => new Array(num).fill(0).map((item, index) => (index + 1 + '').padStart(2, 0));
	const numberLeft = getNumberArea(35), numberRight = getNumberArea(12);
	const getNumber = (arr, count) => {
		const res = [];
		for (let i=0; i<count; i++) {
			const index = Math.floor(Math.random() * arr.length);
			res.push(...arr.splice(index, 1));
		}
		res.sort((a, b) => a - b);
		return res.join(' ');
	}

	const db = uniCloud.database(); // 获取云数据库的引用
	const userCollection = await db.collection('lottery_user').get();
	
	const collection = db.collection('lottery');
	let res = await collection.get();
	let dateDow = Date.now();
	res.data.map(async (item) => {
		if (dateDow - item.date > 86400000 * 30) {
			await collection.doc(item.id).remove();
		}
	});
	
	for (const item of userCollection.data) {
		const lotteryNumber = `${getNumber(numberLeft, 5)} - ${getNumber(numberRight, 2)}`;
		collection.add({
			number: lotteryNumber,
			date: Date.now(),
			belong: item.user,
		});
		
		// 推送随机号码
		const form = new FormData();
		form.append('title', '随机号码为：' + lotteryNumber);
		form.append('desp', '');
		form.append('channel', 9);
		await uniCloud.httpclient.request(`https://sctapi.ftqq.com/${item.user}.send`, {
			method: "POST",
			content: form.getBuffer(), // 请求内容
			headers: form.getHeaders(), // 请求头
			dataType: 'json' // 指定返回值为json格式，自动进行parse
		});
	}
};
