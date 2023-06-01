const crypto = require('crypto');


function getHmac(str, secret) {
	return crypto.createHmac('sha256', secret).update(str).digest('hex');
}

const methods = {
	async getUserInfo(cb) {
		const { token } = await utools.fetchUserServerTemporaryToken();
		
		
		const data = {
			access_token: token,
			plugin_id: 'zohkcpel',
			timestamp: Math.floor(new Date().getTime() / 1000),
		};
		const str = encodeURI(new URLSearchParams(data).toString());
		const secret = 'HDO9FmXZkvfSiRpfJ1Bcp6gnA2iGvBNA';
		data.sign = getHmac(str, secret);
		
		uni.request({
			url: 'https://open.u-tools.cn/baseinfo?' + new URLSearchParams(data).toString(),
			header: {
				Accept: 'application/json',
			},
			success(res) {
				cb(res.data.resource);
			},
			fail() {
				uni.showToast({
					title: '签到失败！请点击右下角联系管理员。',
					icon: 'none',
				})
			}
		})
	}
}


Object.entries(methods).forEach(item => {
	window[item[0]] = item[1];
})


