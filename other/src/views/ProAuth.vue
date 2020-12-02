<template>
  <div class="proauth-page">
    <div class="proauth-form">
      <input class="form-input" v-model="formData.code" type="search" placeholder="请输入授权码查询">
      <button class="form-button" type="button" @click="searchEvent">搜索</button>
    </div>
    <div class="proauth-list">
      <div class="proauth-item" v-for="(item, index) in list" :key="index">
        <div class="proauth-content">
          <h4 class="item-title">{{ item.name }}</h4>
          <div class="item-date">授权时间：{{ item.date }}</div>
        </div>
      </div>
      <div v-if="!list.length" class="no-data">
        <span>可能授权码不正确，找不到对应的记录！</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        code: ''
      },
      list: []
    }
  },
  methods: {
    searchEvent () {
      fetch('https://api.xuliangzhan.com:10443/api/pub/pro/auth/page/list/10/1?authCode=' + this.formData.code).then(response => response.json()).then(data => {
        this.list = data.result
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.proauth-form {
  padding: 0 0 10px 0;
  text-align: center;
  .form-input {
    height: 38px;
    width: 400px;
    padding: 0 15px;
    border-radius: 4px 0 0 4px;
    border: 1px solid #DCDFE6;
    vertical-align: middle;
    outline: 0;
    &:focus {
      border-color: #3196ff;
    }
  }
  .form-button {
    color: #606266;
    height: 38px;
    padding: 0 20px;
    border-radius: 0 4px 4px 0;
    border: 1px solid #DCDFE6;
    background-color: #F5F7FA;
    vertical-align: middle;
    outline: 0;
    cursor: pointer;
    &:hover {
      color: #3196ff;
    }
    &:active {
      border-color: #3196ff;
    }
  }
}
.proauth-list {
  width: 1200px;
  margin: 0 auto;
  &:after {
    content: "";
    display: block;
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .proauth-item {
    width: 600px;
    float: left;
    width: 50%;
    padding: 10px;
  }
  .proauth-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    box-shadow: 1px 2px 10px #eee;
    background-color: #fff;
  }
  .item-title {
    margin: 0;
    padding: 15px;
    border-bottom: 1px solid #EBEEF5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-date {
    padding: 15px;
  }
  .no-data {
    text-align: center;
    line-height: 2em;
  }
}
</style>
