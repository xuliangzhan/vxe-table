<template>
  <div class="support-page">
    <div class="support-group">
      <div class="qq-img">
        <img v-if="disabledSupport" src="" width="190" height="190">
        <img v-else src="../assets/image/support/qq.png">
      </div>
      <div class="qq-step">
        <ul class="step-wrapper">
          <li>
            左侧扫码 或者 点击
            <template v-if="disabledSupport">
              <a class="is-disabled"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="vxe-table 技术支持群" title="vxe-table 技术支持群"></a>
            </template>
            <template v-else>
              <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=K0y8dWpsIwFtcpKfb4LlVx44bujw1FaL&jump_from=webapi"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="vxe-table 技术支持群" title="vxe-table 技术支持群"></a>
            </template>
          </li>
          <li>下方扫码付款 <span class="price-unit">￥{{ disabledSupport ? '-' : supportPrice }}</span></li>
          <li>付款完成后，点击联系收款方，留言QQ号</li>
        </ul>
        <div class="btn-wrapper">
          <button v-if="disabledSupport" class="pay-btn is-disabled" type="button" title="当前不在支持的时间之内，工作日：9:30 ~ 18:00">确认扫码付款</button>
          <button v-else class="pay-btn" type="button" @click="payEvent">确认扫码付款</button>
        </div>
      </div>
    </div>
    <div class="support-pay" v-if="payVisible">
      <img src="../assets/image/support/pay.jpg">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      supportPrice: 288,
      payVisible: false
    }
  },
  computed: {
    disabledSupport () {
      const currDate = new Date()
      const day = currDate.getDay()
      const hours = currDate.getHours()
      if (day === 0 || !((hours >= 9 && hours <= 11) || (hours >= 14 && hours <= 17) || (hours >= 19 && hours <= 21))) {
        return true
      }
      return false
    }
  },
  methods: {
    payEvent () {
      if (!this.disabledSupport) {
        this.payVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.price-unit {
  font-size: 18px;
  color: #ff6700;
  padding: 0 5px;
  font-weight: 700;
}
.support-group {
  margin: 15px auto;
  width: 500px;
  display: flex;
  flex-direction: row;
  .qq-img {
    flex-shrink: 0;
  }
  .qq-step {
    flex-grow: 1;
  }
  .step-wrapper {
    & > li {
      list-style-type: circle;
      line-height: 32px;
    }
  }
  .btn-wrapper {
    text-align: center;
    .pay-btn {
      color: #606266;
      height: 38px;
      padding: 0 20px;
      border-radius: 0 4px 4px 0;
      border: 1px solid #DCDFE6;
      background-color: #F5F7FA;
      vertical-align: middle;
      outline: 0;
      cursor: pointer;
      &:not(.disabled) {
        &:hover {
          color: #3196ff;
        }
        &:active {
          border-color: #3196ff;
        }
      }
      &.disabled {
        color: #BFBFBF;
      }
    }
  }
}
.is-disabled {
  cursor: no-drop;
}
.support-pay {
  margin-top: 50px;
  text-align: center;
}
</style>
