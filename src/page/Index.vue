<template>
    <div>
        <!--x-header :left-options="{showBack: false}" :right-options="{showMore: false}">欢乐游戏</x-header-->
        <swiper loop auto :list="swiperlist" :index="swiperindex" @on-index-change="onIndexChange"></swiper>

        <group :gutter="10">
          <grid :cols="3">
              <grid-item v-for="m in modules" :key="m.name" :label="m.name" :link="m.link">
                <span class="grid-icon grid-icon-big" slot="icon" v-html="m.icon"></span>
              </grid-item>
          </grid>
        </group>
    </div>
</template>

<script>
import {
  XHeader,
  Grid,
  GridItem,
  XImg,
  Group,
  Swiper,
  GroupTitle,
  SwiperItem
} from "vux";
import { getSwipers } from "../api/resource/index";

export default {
  name: "Index",
  data() {
    return {
      swiperlist: [],
      swiperindex: 0,
      modules: [
        { name: "记分琅琊榜", icon: "&#xe6de", link: { name: "Game" } },
        { name: "人脸融合", icon: "&#xe6b6", link: { name: "Face" } }
      ]
    };
  },
  created: function() {
    this.$options.methods.loadData.bind(this)();
  },
  methods: {
    loadData() {
      let that = this;
      getSwipers()
        .then(function(response) {
          that.swiperlist = response.data.data;
        })
        .catch(function(error) {
          that.swiperlist = [];
        });
    },
    onSwiperClick() {
      console.log("click: " + this.swiperindex);
    },
    onIndexChange(index) {
      this.swiperindex = index;
    },
    click(key) {
      if (key === "menu1") {
        this.$router.push({ path: "/scoreCreate" });
      } else if (key === "menu2") {
        this.$refs.stable.loadTable();
      }
    }
  },
  components: {
    XHeader,
    Grid,
    GridItem,
    XImg,
    Swiper,
    GroupTitle,
    SwiperItem,
    Group
  }
};
</script>

<style>
span {
  display: block;
  text-align: center;
  color: #32cd32;
  font: 1em "Microsoft YaHei", sans-serif;
}
</style>