<template>
  <div class="support-page">
    <h2 class="support-title">技术支持群<span class="price-unit">￥{{ supportPrice }}</span><span style="font-size: 12px;font-weight: 400;">（快速解决使用过程中遇到的问题）</span></h2>
    <div class="support-group">
      <template v-if="disabledSupport">
        <div title="当前不在支持的时间之内，请在工作日 9:30 ~ 18:00 时间内申请！" style="text-align: center;width: 100%">
          <img src="" style="width: 100px; height: 100px">
        </div>
      </template>
      <template v-else>
        <div class="qq-img">
          <img src="../assets/image/support/qq.png">
        </div>
        <div class="qq-step">
          <ul class="step-wrapper">
            <li>
              左侧扫码申请加入群 或 点击<a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=K0y8dWpsIwFtcpKfb4LlVx44bujw1FaL&jump_from=webapi"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="vxe-table 技术支持群" title="vxe-table 技术支持群"></a>
            </li>
            <li>点击 <router-link class="link pay-link" :to="{name: 'Pay'}">扫码付款</router-link>，付款完成后</li>
            <li>点击“联系收款方”，留言QQ号即可</li>
            <li style="font-size: 12px">如有疑问，联系邮件：<a class="link" href="mailto:xu_liangzhan@163.com" style="color: #0F80C1">xu_liangzhan@163.com</a></li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      supportPrice: 288
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
  }
}
</script>

<style lang="scss" scoped>
.support-title {
  text-align: center;
}
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
  .pay-link {
    color: #22AB38;
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
