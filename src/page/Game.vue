<template>
    <div>
        <x-header :left-options="{showBack: false, preventGoBack: true}" :style="'background-color:'+color.LimeGreen">
            <router-link slot="left" :to="{name:'Index'}"><span class="grid-icon">&#xe634</span></router-link>记分琅琊榜<a slot="right" @click="showMenus = true"> <span class="grid-icon">&#xe70b</span></a>
        </x-header>
        <group :title="title()">
            <cell v-for="(game,i) in games" align-items="right" :title="game.name" :link="{name:'Score',query:{id:game.id}}" >
                <span>{{'创建者：'+game.creator}}</span>
            </cell>
        </group>
        <div v-transfer-dom>
            <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="click"></actionsheet>
        </div>
        <div v-transfer-dom>
            <x-dialog v-model="showDialog" hide-on-blur>
                <div style="padding:15px;">
                    <x-input v-model="newGame" title="游戏名称" ref="newGame" placeholder="请输入游戏名称" required autofocus></x-input>
                    <x-button text="确认" @click.native="startGame" type="primary"></x-button>
                </div>
            </x-dialog>
        </div>
        <toast v-model="showToast" type="cancel" :time="1000" is-show-mask :text="toastMsg" ></toast>
    </div>
</template>

<script>
import {
  XDialog,
  XInput,
  XButton,
  XHeader,
  Cell,
  CellBox,
  CellFormPreview,
  Actionsheet,
  TransferDom,
  Group,
  Toast
} from "vux";
import { createGame, getGames } from "../api/game/index";

export default {
  components: {
    XDialog,
    XInput,
    XButton,
    XHeader,
    Cell,
    CellBox,
    CellFormPreview,
    Actionsheet,
    TransferDom,
    Group,
    Toast
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      color: this.GLOBAL.Color,
      games: [],
      newGame: "",
      menus: {
        menu1: "新开一局"
      },
      showMenus: false,
      showDialog: false,
      showToast: false,
      toastMsg: ""
    };
  },
  mounted: function() {
    this.$options.methods.loadData.bind(this)();
  },
  methods: {
    players(players) {
      var result = "";
      for (var i in players) {
        result = result + players[i] + " ";
      }
      console.log(result);
      return result;
    },
    loadData() {
      let that = this;
      getGames()
        .then(function(response) {
          that.games = response.data.data;
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    startGame() {
      let that = this;
      if (that.$refs.newGame.valid) {
        createGame(that.newGame)
          .then(function(response) {
            that.games = response.data.data;
            that.showDialog = false;
          })
          .catch(function(error) {
            that.toastMsg = error;
            that.showToast = true;
          });
      }
    },
    click(key) {
      if (key === "menu1") {
        this.showDialog = true;
        this.$refs.newGame.$refs.input.autofocus = true;
        this.$refs.newGame.focus();
      } else if (key === "menu2") {
        this.$refs.stable.loadTable();
      }
    },
    title() {
      return this.games.length > 0 ? "进行中的游戏" : "还没有开局呢";
    }
  }
};
</script>
<style scoped>
span {
  display: block;
  text-align: center;
  color: #32cd32;
  font: 0.8em "Microsoft YaHei", sans-serif;
}

group {
  font: bold 1em "Microsoft YaHei", sans-serif;
}

.grid-icon {
  font-family: "iconfont";
  font-size: 20px;
  color: #00FF7F;
}
</style>