<template>
    <div>
      <group title="人生赢家">
        <selector placeholder="请选择" v-model="winner" :options="players" @on-change="onChange"></selector>
      </group>
      <group title="赢了这么多人" :style="display()">
        <x-input type="number" v-for="(player,i) in losers" v-model="scores[i]" v-bind:title="player" :min="1" :max="3" 
          placeholder="请输入分数" v-bind:ref="player" :is-type="validScore" required >
        </x-input>
      </group>
      <group :gutter="10"/>
      <flexbox :gutter="10">
        <flexbox-item>
          <x-button text="确认" @click.native="confirm" type="primary"></x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button text="返回" @click.native="back"></x-button>
        </flexbox-item>
      </flexbox>
      <toast v-model="showToast" type="cancel" :time="1000" is-show-mask :text="toastMsg" ></toast>
    </div>
</template>

<script>
import {
  XInput,
  Group,
  Flexbox,
  FlexboxItem,
  XButton,
  Selector,
  Toast
} from "vux";
import { score, getPlayers } from "../api/game/index";
import { getQueryObject } from "../utils/index";

export default {
  components: {
    XInput,
    XButton,
    Group,
    Flexbox,
    FlexboxItem,
    Selector,
    Toast
  },
  data() {
    return {
      gameId: getQueryObject().id,
      winner: "",
      players: [],
      scores: [],
      losers: [],
      showToast: false,
      toastMsg: ""
    };
  },
  mounted: function() {
    this.$options.methods.loadData.bind(this)();
  },
  methods: {
    display() {
      var result = this.scores.length > 0 ? "display:block" : "display:none";
      return result;
    },
    loadData() {
      let that = this;
      getPlayers(that.gameId)
        .then(function(response) {
          that.players = response.data.data;
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    createScore(scores) {
      let that = this;
      score(that.gameId, scores)
        .then(function(response) {
          that.$router.push({ name: "Score", query: { id: that.gameId } });
        })
        .catch(function(error) {
          that.toastMsg = error;
          that.showToast = true;
        });
    },
    onChange(val) {
      let that = this;
      that.losers = that.players.filter(function(p) {
        return val !== p;
      });
      // that.scores = [1, 2, 3, 4, 5, 6, 7];
      that.scores = ["", "", "", "", "", "", ""];
    },
    confirm() {
      let result = {};
      let that = this;
      let valid = true;
      let total = 0;
      var re = /^[0-9]{1,3}$/;
      that.losers.forEach(function(item, i) {
        valid = valid && that.$refs[item][0].valid && re.test(that.scores[i]);
        if (valid) {
          let tmp = parseInt(that.scores[i]);
          total += tmp;
          result[item] = -tmp;
        }
      });
      if (valid) {
        result[that.winner] = total;
        that.$options.methods.createScore.bind(that)(result);
      } else {
        that.toastMsg = "分数还没填完呢";
        that.showToast = true;
      }
    },
    back() {
      let that = this;
      that.$router.push({ name: "Score", query: { id: that.gameId } });
    },
    validScore(val) {
      return { valid: val >= 0 && val < 1000, msg: "必须小于1000的正整数哦" };
    }
  }
};
</script>
<style scoped>
group {
  font: bold 1em "Microsoft YaHei", sans-serif;
}

selector {
  font: 1em "Microsoft YaHei", sans-serif;
}

x-input {
  font: 1em "Microsoft YaHei", sans-serif;
}
</style>