import{o as s,c as n,a as i,n as e,t as a,F as t,r as c,b as l,d as g,e as r,f as o,g as d,i as p}from"./index-2d348d15.js";const h=((s,n)=>{const i=s.__vccOpts||s;for(const[e,a]of n)i[e]=a;return i})({data:()=>({signedDays:0,signed:!1,openRanking:!1,rankingList:[],userInfo:{}}),onLoad(){this.getUserInfo()},computed:{styleObj(){return this.signed?{}:{filter:"grayscale(98%) opacity(0.6)"}}},methods:{getUserInfo(){window.getUserInfo((s=>{this.userInfo=s}))},async handleSignIn(){this.signed=!this.signed}}},[["render",function(h,v,_,w,k,f){const m=p;return s(),n("div",{class:l(["sign_container",{signed:k.signed}])},[i("section",null,[i("div",{class:"rotate_line"}),i("h1",{class:"sign_title",style:e(f.styleObj)},a(k.signed?"已打卡":"未打卡"),5),i("div",{tabindex:"1",class:"sign_wrapper",onClick:v[0]||(v[0]=(...s)=>f.handleSignIn&&f.handleSignIn(...s)),style:e(f.styleObj)},[k.signed?(s(),n("svg",{key:0,viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"9098",width:"44",height:"44"},[i("path",{d:"M371.5904 862.528a47.232 47.232 0 0 1-30.72-9.92L13.1904 531.136a42.368 42.368 0 0 1 0-61.376 42.432 42.432 0 0 1 61.44 0l295.488 292.224 579.264-587.392a42.432 42.432 0 0 1 61.44 0 42.368 42.368 0 0 1 0 61.44l-608.512 613.632a40.576 40.576 0 0 1-30.72 12.864z",fill:"#fff","p-id":"9099"})])):(s(),n("svg",{key:1,class:"sign_in",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"8133",width:"52",height:"52"},[i("path",{d:"M486.4 284.8c-54.4 0-99.2 38.4-102.4 89.6V617.6l-12.8-9.6-3.2-3.2c-44.8-32-105.6-28.8-144 9.6l-3.2 3.2-3.2 3.2c-35.2 41.6-28.8 99.2 9.6 134.4l3.2 3.2 134.4 105.6H832v-243.2c0-32-28.8-60.8-60.8-60.8h-182.4v-179.2c0-54.4-44.8-96-102.4-96z m0 60.8c19.2 0 35.2 12.8 35.2 28.8V620.8h243.2V864h-307.2l-83.2-73.6-99.2-80c-16-12.8-19.2-32-9.6-48l3.2-3.2 3.2-3.2c12.8-12.8 35.2-16 51.2-9.6l3.2 3.2 3.2 3.2 121.6 99.2V380.8c0-19.2 16-35.2 35.2-35.2zM483.2 160c-124.8 0-224 92.8-224 208 0 51.2 22.4 102.4 60.8 140.8l6.4 6.4v-140.8c-3.2-51.2 25.6-102.4 73.6-128s108.8-28.8 160-3.2c48 25.6 76.8 70.4 80 118.4v153.6c41.6-38.4 67.2-92.8 67.2-147.2 0-115.2-99.2-208-224-208z",fill:"#fff","p-id":"8134"})]))],4)]),k.rankingList.length?(s(),n("section",{key:0,class:"ranking_container"},[(s(),n("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2411",width:"32",height:"32",onClick:v[1]||(v[1]=s=>k.openRanking=!k.openRanking)},[i("path",{d:"M924 467.1H768.2c-10.8 0-19.5 8.7-19.5 19.5s8.7 19.5 19.5 19.5h136.3v331.1H690.3V175c0-21.5-17.4-38.9-38.9-38.9H378.7c-21.5 0-38.9 17.4-38.9 38.9v662.1H125.6V408.7h136.3c10.8 0 19.5-8.7 19.5-19.5s-8.7-19.5-19.5-19.5H106.1c-10.8 0-19.5 8.7-19.5 19.5v467.4c0 10.8 8.7 19.5 19.5 19.5H924c10.8 0 19.5-8.7 19.5-19.5v-370c0-10.8-8.8-19.5-19.5-19.5z m-272.6 370H378.7V213.9c0-21.5 17.4-38.9 38.9-38.9h194.7c21.5 0 38.9 17.4 38.9 38.9v623.2zM456.6 311.3v19.5H515v97.4h39V252.9h-39l-58.4 58.4z","p-id":"2412"})])),i("ul",{class:l(["ranking_wrapper",k.openRanking?"open":"close"])},[(s(!0),n(t,null,c(k.rankingList,((e,t)=>(s(),n("li",{class:"ranking_item",key:e.open_id},[0===t?(s(),o(m,{key:0,class:"ranking_item_img",src:"/assets/champion-e07c711a.svg",widthFix:"25px"})):1===t?(s(),o(m,{key:1,class:"ranking_item_img",src:"/assets/runnerUp-322923f2.svg",widthFix:"25px"})):2===t?(s(),o(m,{key:2,class:"ranking_item_img",src:"/assets/secondRunnerUp-836beb72.svg",widthFix:"25px"})):(s(),n("em",{key:3,class:"ranking_item_text"},a(t+1),1)),d(m,{class:"user_avatar",src:e.avatar,widthFix:"30px"},null,8,["src"]),i("span",{class:"user_name"},a(e.nickname),1)])))),128))],2)])):g("",!0),i("footer",{class:"sign_tip_wrapper",style:e(f.styleObj)},[i("p",{class:"sign_text"},[r("你已坚持打卡"),i("span",{class:"sign_days"},a(k.signedDays),1),r("天")]),i("p",{class:"help_text"},"路漫漫其修远兮")],4)],2)}],["__scopeId","data-v-75d7eb24"]]);export{h as default};
