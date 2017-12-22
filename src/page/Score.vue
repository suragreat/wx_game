<template>
    <div>
        <x-header :left-options="{showBack: false}" :style="'background-color:'+color.LimeGreen">
          <router-link slot="left" :to="{name:'Game'}"><span class="grid-icon">&#xe6de</span></router-link>记分琅琊榜<a slot="right" @click="showMenus = true"> <span class="grid-icon">&#xe70b</span></a>
        </x-header>
        <STable ref="stable" />
        <div v-transfer-dom name="1">
            <x-dialog name="showAddDialog" v-model="showAddDialog" hide-on-blur>
                <div style="padding:15px;">
                    <x-input name="newPlayer" v-model="newPlayer" title="玩家" ref="newPlayer" placeholder="请输入玩家名称" required autofocus></x-input>
                    <x-button name="add" text="确认" @click.native="addPlayer" type="primary"></x-button>
                </div>
            </x-dialog>
            <x-dialog name="showRemoveDialog" v-model="showRemoveDialog" hide-on-blur>
                <div style="padding:15px;">
                      <checklist title="请选择要踢出的玩家" label-position="right" required :options="players" v-model="removePlayers" ref="removePlayers"></checklist>
                      <x-button name="remove" text="确认" @click.native="removePlayer" type="primary"></x-button>
                </div>
            </x-dialog>
            <x-dialog name="showInviteDialog" v-model="showInviteDialog" hide-on-blur>
                <div style="padding:15px;">
                  <group label-align="center" title="请打开微信扫一扫加入当前游戏">
                  </group>
                  <qrcode :value="inviteUrl" type="img"></qrcode>
                </div>
            </x-dialog>
            <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="click"></actionsheet>
        </div>  
        <div v-transfer-dom>
          <confirm 
          v-model="showConfirmUndo"
          :close-on-confirm="false"
          content="真的要撤销记分吗？"
          @on-confirm="undo">
          </confirm>
        </div>   
        <div v-transfer-dom>
          <confirm 
          v-model="showConfirmClose"
          :close-on-confirm="false"
          content="真的要结束游戏吗？"
          @on-confirm="close">
          </confirm>
        </div>   
        <div v-transfer-dom>
          <confirm 
          v-model="showConfirmQuit"
          :close-on-confirm="false"
          content="真的要退出游戏吗？"
          @on-confirm="quit">
          </confirm>
        </div>    
        <toast name="toastMsg" v-model="showToast" type="cancel" :time="1000" is-show-mask :text="toastMsg" ></toast>
    </div>
</template>

<script>
import {
  XDialog,
  XInput,
  Confirm,
  Checklist,
  Qrcode,
  XButton,
  XHeader,
  Actionsheet,
  TransferDom,
  ButtonTab,
  ButtonTabItem,
  Group,
  Toast
} from "vux";
import STable from "../components/ScoreTable";
import {
  joinGame,
  getPlayers,
  quitGame,
  closeGame,
  undoScore
} from "../api/game/index";
import { getWechatRedirectUrl } from "../api/resource/index";
import { getQueryObject } from "../utils/index";
import { getToken } from "../utils/auth";


export default {
  name: "Score",
  directives: {
    TransferDom
  },
  data() {
    return {
      color: this.GLOBAL.Color,
      gameId: getQueryObject().id,
      menus: {
        score: "记分",
        unscore: "撤销",
        invite: "邀请",
        add: "拉人",
        remove: "踢人",
        quit: "我不玩了",
        over: "游戏结束"
      },
      showMenus: false,
      showAddDialog: false,
      showRemoveDialog: false,
      showInviteDialog: false,
      showToast: false,
      showConfirmClose: false,
      showConfirmQuit: false,
      showConfirmUndo: false,
      toastMsg: "",
      players: [],
      newPlayer: "",
      removePlayers: [],
      inviteUrl: ""
    };
  },
  methods: {
    click(key) {
      if (key === "score") {
        this.$router.push({ name: "ScoreCreate", query: { id: this.gameId } });
      } else if (key === "unscore") {
         this.showConfirmUndo = true;
      } else if (key === "quit") {
        this.showConfirmQuit = true;
      } else if (key === "over") {
        this.showConfirmClose = true;
      } else if (key === "add") {
        this.showAddDialog = true;
        this.$refs.newPlayer.$refs.input.autofocus = true;
      } else if (key === "remove") {
        this.$options.methods.loadPlayerList.bind(this)();
      } else if (key === "invite") {
        this.$options.methods.loadInviteUrl.bind(this)();
      }
    },
    loadInviteUrl() {
      let that = this;
      console.log(that.color)
        let url = process.env.BASE_API+ "/game/" + this.gameId + "/invite";
        if (!url.startsWith("http://") && !url.startsWith("https://")){
          url = process.env.SERVER_URL + url;
        }
      getWechatRedirectUrl(url)
        .then(function(response) {
          that.inviteUrl = response.data.data;
          that.showInviteDialog = true;
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    loadPlayerList() {
      let that = this;
      getPlayers(that.gameId)
        .then(function(response) {
          that.players = response.data.data;
          that.showRemoveDialog = true;
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    undo() {
      let that = this;
      undoScore(that.gameId)
        .then(function(response) {
          that.showConfirmUndo = false;
          that.$refs.stable.loadTable();
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    quit() {
      let that = this;
      quitGame(that.gameId, [getToken()])
        .then(function(response) {
          that.showRemoveDialog = false;
          that.showConfirmQuit = false;
          that.$refs.stable.loadTable();
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    close() {
      let that = this;
      closeGame(that.gameId)
        .then(function(response) {
          that.showConfirmClose = false;
          that.$router.push({ name: "Game" });
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    addPlayer() {
      let that = this;
      if (that.$refs.newPlayer.valid) {
        joinGame(that.gameId, that.newPlayer)
          .then(function(response) {
            that.showAddDialog = false;
            that.$refs.stable.loadTable();
            that.$refs.newPlayer.reset();
          })
          .catch(function(error) {
            that.toastMsg = error;
            that.showToast = true;
          });
      }
    },
    removePlayer() {
      let that = this;
      if (that.$refs.removePlayers.valid) {
        quitGame(that.gameId, that.removePlayers)
          .then(function(response) {
            that.showRemoveDialog = false;
            that.$refs.stable.loadTable();
          })
          .catch(function(error) {
            that.toastMsg = error;
            that.showToast = true;
          });
      }
    }
  },
  components: {
    XDialog,
    XInput,Confirm ,
    Checklist,
    Qrcode,
    XButton,
    XHeader,
    Actionsheet,
    ButtonTab,
    ButtonTabItem,
    STable,
    Group,
    Toast
  }
};
</script>

<<style>
.grid-icon {
  font-family: "iconfont";
  font-size: 20px;
  color: #00FF7F;
}
</style>
