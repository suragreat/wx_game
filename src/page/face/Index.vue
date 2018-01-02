<template>
    <div>
        <x-header :left-options="{showBack: false, preventGoBack: true}" :style="'background-color:'+color.LimeGreen">
            <router-link slot="left" :to="{name:'Index'}"><span class="grid-icon">&#xe634</span></router-link>人脸融合
        </x-header>
        <group :title="'效果 ' + selected.value">
        <!-- <selector placeholder="请选择" v-model="template" :options="templates" @on-change="onChange"></selector>
        <div><x-img v-if="src!==''" :src="src" :webp-src="`${src}?type=webp`" ></x-img></div> -->
        <!--swiper loop :list="swiperlist" :index="swiperindex" ></swiper-->
        
        <!--lightbox :images="images" ref="lightbox" :showCaption="true" :startAt="index" @closeLightBox="console.log('close')"></lightbox-->
        <!-- <scroller scrollbar-x> -->
          
            <div class="box">
            <div class="box-item">
                    <a @click="select(t)" v-for="t in templates" class="box-item">
                        <x-img style="width:80px" :src="t.url" :webp-src="`${t.url}?type=webp`" ></x-img>
                    </a>
            </div>
            </div>
        <!-- </scroller> -->
        <img width="100%" v-if="result!==''" :src="result" ></img>
        <x-button text="自拍" @click.native="sysphoto" type="primary"></x-button>
      </group>
    </div>
</template>

<script>
import {
  XDialog,
  XHeader,
  Selector,
  XButton,
  XImg,
  Cell,
  XTable,
  Swiper,
  Scroller,
  TransferDom,
  Group,
  Toast
} from "vux";
import { getTemplats, faceMerge } from "@/api/face/index";
import { jsConfig } from "@/api/js-sdk/index";
import Lightbox from "vue-image-lightbox";
require("vue-image-lightbox/dist/vue-image-lightbox.min.css");

export default {
  components: {
    XDialog,
    XHeader,
    Selector,
    XButton,
    XImg,
    Cell,
    XTable,
    Swiper,
    Scroller,
    TransferDom,
    Group,
    Toast,
    Lightbox
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      color: this.GLOBAL.Color,
      //   src: "",
      //   template: "",
      templates: [],
      //   images: [
      //     {
      //       thumb: "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/1.png",
      //       src: "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/1.png",
      //       caption: "aa"
      //     },
      //     {
      //       thumb: "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/3.png",
      //       src: "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/2.png",
      //       caption: "bb"
      //     },
      //     {
      //       thumb: "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/5.png",
      //       src: "https://yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/3.png",
      //       caption: "cc"
      //     }
      //   ],
      //   index: 0,
      src: "",
      serverId: "",
      selected: { value: "" },
      result: "",
      error: false,
      showToast: false,
      toastMsg: ""
    };
  },
  mounted: function() {
    this.$options.methods.loadData.bind(this)();
  },
  methods: {
    loadData() {
      let that = this;
      let wx = this.$wechat;
      jsConfig()
        .then(function(response) {
          wx.config({
            debug: false,
            appId: response.data.data.appId,
            timestamp: response.data.data.timestamp,
            nonceStr: response.data.data.nonceStr,
            signature: response.data.data.signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "hideMenuItems",
              "showMenuItems",
              "translateVoice",
              "startRecord",
              "stopRecord",
              "onRecordEnd",
              "playVoice",
              "pauseVoice",
              "stopVoice",
              "uploadVoice",
              "downloadVoice",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "downloadImage",
              "getNetworkType",
              "openLocation",
              "getLocation",
              "hideOptionMenu",
              "showOptionMenu",
              "closeWindow",
              "scanQRCode",
              "chooseWXPay",
              "openProductSpecificView",
              "addCard",
              "chooseCard",
              "openCard"
            ]
          });
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
      wx.ready(() => {
        console.log("wx.ready");
      });
      wx.error(() => {
        console.log("wx.error");
        this.error = true;
      });
      getTemplats()
        .then(function(response) {
          that.templates = response.data.data;
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    onChange(val) {
      let that = this;
      let result = that.templates.filter(function(p) {
        return val === p.key;
      });
      if (result.length > 0) {
        that.src = result[0].url;
      } else {
        that.src = "";
      }
    },
    select(val) {
      let that = this;
      that.selected = val;
      if (that.serverId !== "") {
        that.$options.methods.display.bind(that)(
          that.selected.key,
          that.serverId
        );
      }
    },
    sysphoto() {
      let that = this;
      let wx = this.$wechat;
      if (typeof that.selected.key == "undefined") {
        that.$vux.toast.show({
          text: "请选择效果",
          type: "cancel"
        });
        return;
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
              var serverId = res.serverId; // 返回图片的服务器端ID
              that.serverId = serverId;
              that.$options.methods.display.bind(that)(
                that.selected.key,
                serverId
              );
            }
          });
        }
      });
    },
    display(tid, sid) {
      let that = this;
      faceMerge(tid, sid)
        .then(function(response) {
          that.result = "data:image/jpeg;base64," + response.data.data;
          console.log(that.result);
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    }
  }
};
</script>

<style>
a:hover {
  cursor: pointer;
}

.box {
  position: relative;
}
.box-item {
  float: left;
  background-size: cover;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, 0.2);
  cursor: pointer;
  display: inline-block;

  margin: 2px;
}
.ximg-demo {
  width: 33%;
  height: auto;
}
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: "加载失败";
  color: red;
}
.ximg-list {
  width: 120px;
  height: 200px;
}
</style>