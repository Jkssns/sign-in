<template>
	<div class="sign_container" :class="{ signed: signed }">
		<section>
			<div class="rotate_line"></div>

			<h1 class="sign_title" :style="styleObj">{{ signed ? '已打卡' : '未打卡' }}</h1>

			<div tabindex="1" class="sign_wrapper" @click="handleSignIn" :style="styleObj">
				<svg v-if="signed" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9098"
					width="44" height="44">
					<path
						d="M371.5904 862.528a47.232 47.232 0 0 1-30.72-9.92L13.1904 531.136a42.368 42.368 0 0 1 0-61.376 42.432 42.432 0 0 1 61.44 0l295.488 292.224 579.264-587.392a42.432 42.432 0 0 1 61.44 0 42.368 42.368 0 0 1 0 61.44l-608.512 613.632a40.576 40.576 0 0 1-30.72 12.864z"
						fill="#fff" p-id="9099"></path>
				</svg>

				<svg v-else class="sign_in" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
					p-id="8133" width="52" height="52">
					<path
						d="M486.4 284.8c-54.4 0-99.2 38.4-102.4 89.6V617.6l-12.8-9.6-3.2-3.2c-44.8-32-105.6-28.8-144 9.6l-3.2 3.2-3.2 3.2c-35.2 41.6-28.8 99.2 9.6 134.4l3.2 3.2 134.4 105.6H832v-243.2c0-32-28.8-60.8-60.8-60.8h-182.4v-179.2c0-54.4-44.8-96-102.4-96z m0 60.8c19.2 0 35.2 12.8 35.2 28.8V620.8h243.2V864h-307.2l-83.2-73.6-99.2-80c-16-12.8-19.2-32-9.6-48l3.2-3.2 3.2-3.2c12.8-12.8 35.2-16 51.2-9.6l3.2 3.2 3.2 3.2 121.6 99.2V380.8c0-19.2 16-35.2 35.2-35.2zM483.2 160c-124.8 0-224 92.8-224 208 0 51.2 22.4 102.4 60.8 140.8l6.4 6.4v-140.8c-3.2-51.2 25.6-102.4 73.6-128s108.8-28.8 160-3.2c48 25.6 76.8 70.4 80 118.4v153.6c41.6-38.4 67.2-92.8 67.2-147.2 0-115.2-99.2-208-224-208z"
						fill="#fff" p-id="8134"></path>
				</svg>
			</div>
		</section>

		<section class="ranking_container" v-if="rankingList.length">
			<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
				p-id="2411" width="32" height="32" @click="openRanking=!openRanking">
				<path
					d="M924 467.1H768.2c-10.8 0-19.5 8.7-19.5 19.5s8.7 19.5 19.5 19.5h136.3v331.1H690.3V175c0-21.5-17.4-38.9-38.9-38.9H378.7c-21.5 0-38.9 17.4-38.9 38.9v662.1H125.6V408.7h136.3c10.8 0 19.5-8.7 19.5-19.5s-8.7-19.5-19.5-19.5H106.1c-10.8 0-19.5 8.7-19.5 19.5v467.4c0 10.8 8.7 19.5 19.5 19.5H924c10.8 0 19.5-8.7 19.5-19.5v-370c0-10.8-8.8-19.5-19.5-19.5z m-272.6 370H378.7V213.9c0-21.5 17.4-38.9 38.9-38.9h194.7c21.5 0 38.9 17.4 38.9 38.9v623.2zM456.6 311.3v19.5H515v97.4h39V252.9h-39l-58.4 58.4z"
					p-id="2412"
				></path>
			</svg>

			<ul class="ranking_wrapper" :class="openRanking ? 'open' : 'close'">
				<li class="ranking_item" v-for="(item, index) in rankingList" :key="item.open_id">
					<image v-if="index === 0" class="ranking_item_img" src="/static/assets/champion.svg" widthFix="25px" />
					<image v-else-if="index === 1" class="ranking_item_img" src="/static/assets/runnerUp.svg" widthFix="25px" />
					<image v-else-if="index === 2" class="ranking_item_img" src="/static/assets/secondRunnerUp.svg" widthFix="25px" />
					<em v-else class="ranking_item_text">{{ index + 1 }}</em>

					<image class="user_avatar" :src="item.avatar" widthFix="30px" />
					<span class="user_name">{{ item.nickname }}</span>
				</li>
			</ul>
		</section>

		<footer class="sign_tip_wrapper" :style="styleObj">
			<p class="sign_text">你已坚持打卡<span class="sign_days">{{ signedDays }}</span>天</p>
			<p class="help_text">路漫漫其修远兮</p>
		</footer>
	</div>
</template>

<script>
export default {
	data () {
		return {
			signedDays: 0, // 已签到天数
			signed: false, // 签到状态
			openRanking: false, // 排行榜打开状态
			rankingList: [],
			userInfo: {}, // 用户信息
		}
	},

	onLoad () {
		this.getUserInfo();
	},

	computed: {
		styleObj() {
			return this.signed ? {} : {filter: 'grayscale(98%) opacity(0.6)'};
		}
	},

	methods: {
		getUserInfo() {
			window.getUserInfo((userInfo) => {
				this.userInfo = userInfo;
			})
		},

		async handleSignIn () {
			// this.signed = true;
			this.signed = !this.signed;
		}
	}
}
</script>

<style lang="scss" scoped>
$se-color: #4bcc63;

* {
	margin: 0;
	padding: 0;
	font-size: 16px;
}

li {
	list-style: none;
}

html,
body,
page,
#app {
	width: 100%;
	height: 100%;
}

.sign_container {
	width: 100%;
	height: 100%;
}

.sign_title {
	text-align: center;
	font-size: 20px;
	color: $se-color;

	&.signed_color {
		color: $se-color;
	}
}

.rotate_line {
	position: absolute;
	z-index: 2;
	top: calc(20% - 1px);
	left: 50%;
	width: 200px;
	height: 200px;
	border: 1px solid transparent;
	border-radius: 50%;
	border-top-color: #fff;
	animation: 3s linear 0s infinite normal none running circle;
	pointer-events: none;
}

@keyframes circle {
	from {
		transform: translateX(-50%) rotate(0);
	}

	to {
		transform: translateX(-50%) rotate(360deg);
	}
}

.sign_wrapper {
	position: absolute;
	top: 20%;
	left: 50%;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	width: 200px;
	height: 200px;
	background-color: $se-color;
	border-radius: 50%;
	// animation: 3s ease 0s infinite normal none running breathe;
	cursor: pointer;
	outline: none;
	transition: transform .1s;
}

.sign_wrapper:active {
	transform: translateX(-50%) scale(0.97);
}

.sign_tip_wrapper {
	position: fixed;
	bottom: 5vh;
	width: 100%;
	text-align: center;
	line-height: 30px;
	color: $se-color;
	letter-spacing: 1px;

	.help_text {
		position: relative;
		z-index: 999;
		filter: none;
		color: $se-color;
	}
}

.sign_wrapper.signed {
	background-color: $se-color;
	// animation: 3s ease 0s infinite normal none running breatheSigned;
}

.ranking_container {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	box-sizing: border-box;
	svg {
		cursor: pointer;
	}
	.ranking_wrapper {
		flex: 1;
		width: 40vh;
		overflow: hidden auto;
		transition: width .3s;
		&::-webkit-scrollbar {
			display: none;
		}
		.ranking_item {
			display: flex;
			align-items: center;
			width: 40vh;
			.ranking_item_img {
				width: 25px;
				height: 25px;
			}
			.ranking_item_text {
				min-width: 20px;
				height: 20px;
				margin: 0 3px;
				border-radius: 3px;
				padding: 0 2px;
				box-sizing: border-box;
				color: #fff;
				text-align: center;
				line-height: 20px;
				font-size: 16px;
				font-style: normal;
				background-color: #4bcc63;
			}
			.user_avatar {
				width: 30px;
				height: 30px;
				margin: 0 5px;
			}
			.user_name {

			}
		}
		&.close {
			width: 23px;
		}
	}
}


@keyframes breathe {
	0% {
		box-shadow: 0 1px 2px rgba($se-color, 0.65);
	}

	50% {
		box-shadow: 0 1px 30px rgba($se-color, 0.9);
	}

	100% {
		box-shadow: 0 1px 2px rgba($se-color, 0.65);
	}
}

@keyframes breatheSigned {
	0% {
		box-shadow: 0 1px 2px rgba($se-color, 0.65);
	}

	50% {
		box-shadow: 0 1px 30px rgba($se-color, 0.9);
	}

	100% {
		box-shadow: 0 1px 2px rgba($se-color, 0.65);
	}
}</style>
