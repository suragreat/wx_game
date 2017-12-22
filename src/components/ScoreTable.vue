<template>
    <div>
        <scroller use-pulldown @on-pulldown-loading="loadTable" ref="scroller" v-model="scrollStatus" v-bind:lock-x="lock(scoreList)">
            <div>
                <x-table>
                    <thead>
                        <tr>
                            <th v-for="(item,i) in scoreList.name">{{item}}<br/><span :class="getTotal(i) > 0? 'winner':'loser'">{{getTotal(i)}}</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(scores,j) in scoreList.scores"  v-bind:class="j % 2 === 1 ? 'oddrow' : ''">
                            <td v-for="(score,k) in scores">{{score}}</td>
                        </tr>
                    </tbody>
                </x-table>
            </div>
            <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
                <span v-show="scrollStatus.pulldownStatus === 'default'"></span>
                <span class="pulldown-arrow" v-show="scrollStatus.pulldownStatus === 'down' || scrollStatus.pulldownStatus === 'up'" :class="{'rotate': scrollStatus.pulldownStatus === 'up'}">↓</span>
                <span v-show="scrollStatus.pulldownStatus === 'loading'">
                    <spinner type="ios-small"></spinner>
                </span>
            </div>
        </scroller>
    </div>
</template>

<script>
import { Badge, XTable, Scroller, Divider, Spinner } from "vux";
import { getScores } from "../api/game/index";
import { getQueryObject } from "../utils/index";

export default {
  components: {
    Badge,
    XTable,
    Scroller,
    Divider,
    Spinner
  },
  mounted: function() {
    this.$options.methods.loadData.bind(this)();
  },
  data() {
    return {
      color: this.GLOBAL.Color,
      gameId: getQueryObject().id,
      scrollTop: 0,
      scrollLeft: 0,
      onFetching: false,
      bottomCount: 20,
      scoreList: {},
      scrollStatus: {
        pulldownStatus: "default"
      }
    };
  },
  methods: {
    lock(list) {
      var result = true;
      if (list.name) {
        result = list.name.length < 6;
      }
      return result
    },
    loadData() {
      let that = this;
      getScores(that.gameId)
        .then(function(response) {
          that.scoreList = response.data.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadTable() {
      this.$nextTick(() => {
        this.$options.methods.loadData.bind(this)();
        setTimeout(() => {
          this.$refs.scroller.donePulldown();
        }, 100);
      }, 2000);
    },
    getTotal(i) {
      var total = 0;
      var s
      for (s in this.scoreList.scores){
        total = total + this.scoreList.scores[s][i]
      }
      return total;
    }
  }
};
</script>

<style scoped>
thead {
  color: #1874cd;
  background-color: #ededed;
  font: bold 1em "Microsoft YaHei", sans-serif;
}

tbody {
  background-color: #ffffff;
  font: 1em "Microsoft YaHei", sans-serif;
}

.winner {
  color:red;
}

.loser {
  color:#32cd32;
}


.oddrow {
  background-color: #ededed;
}

.pulldown-arrow {
  display: inline-block;
  transition: all linear 0.2s;
  color: #666;
  font-size: 25px;
}
</style>