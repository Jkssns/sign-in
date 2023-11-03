<template>
	<header class="pw_header">
		<button type="default" @click="showAdd">新增</button>
	</header>

	
	<!-- <uni-indexed-list :options="passwordList" :showSelect="false" @click="bindClick"></uni-indexed-list> -->
	
	<uni-popup ref="popup" type="bottom">
		<input type="text" v-model="account" placeholder="账号">
		<input type="text" v-model="password" placeholder="密码">
	</uni-popup>
</template>

<script>
	export default {	
		data() {
			return {
				searchValue: '',
				passwordList: [],
				account: '',
				password: '',
			}
		},
		async onLoad() {
			const db = uniCloud.database();
			const collection = db.collection('password_list');
			let res = await collection.get();
			this.passwordList = res.data;
			console.log(this.passwordList, 'passwordList')
			   
		},
		methods: {
			showAdd() {
				console.log('reswerqwe')
			  this.$refs.popup.open('center')
			},
			
			bindClick() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pw_header {
		display: flex;
		justify-content: space-between;
	}
</style>