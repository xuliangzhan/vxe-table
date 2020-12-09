<template>
  <div class="proauth-page">
    <div class="proauth-form">
      <input class="form-input" v-model="formData.no" type="search" placeholder="请输入编号查询">
      <button class="form-button" type="button" @click="searchEvent">搜索</button>
    </div>
    <div class="proauth-pager">
      <div class="pager-btns">
        <button class="prev-page-btn" :disabled="pageVO.currentPage <= 1" title="上一页" @click="prevEvent">&lt;</button>
        <button class="next-page-btn" :disabled="pageVO.currentPage >= pageVO.pageCount" title="下一页" @click="nextEvent">&gt;</button>
      </div>
    </div>
    <div class="proauth-list">
      <div class="proauth-item" v-for="(item, index) in list" :key="index">
        <div class="proauth-content">
          <h4 class="item-title">
            <span style="margin-right: 0.5em;">{{ item.no }}</span>
            <span>{{ item.name }}</span>
          </h4>
          <div class="item-date">授权时间：{{ item.date }}</div>
        </div>
      </div>
      <div v-if="!list.length" class="no-data">
        <span>可能编号不正确，找不到对应的记录！</span>
      </div>
    </div>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'

export default {
  data () {
    return {
      invalidNOs: [],
      pageVO: {
        currentPage: 1,
        pageSize: 6,
        pageCount: 1
      },
      formData: {
        no: ''
      },
      list: []
    }
  },
  methods: {
    searchEvent () {
      const no = this.formData.no.trim()
      if (no && !this.invalidNOs.includes(no)) {
        XEAjax.get(`https://api.xuliangzhan.com:10443/api/pub/pro/auth/page/list/${this.pageVO.pageSize}/${this.pageVO.currentPage}?no=${no}`).then(data => {
          this.list = data.result
          this.pageVO.pageCount = data.page.pageCount
        }).catch(e => {
          this.invalidNOs.push(no)
        })
      }
    },
    prevEvent () {
      if (this.pageVO.currentPage > 1) {
        this.pageVO.currentPage--
        this.searchEvent()
      }
    },
    nextEvent () {
      if (this.pageVO.currentPage < this.pageVO.pageCount) {
        this.pageVO.currentPage++
        this.searchEvent()
      }
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
.proauth-pager {
  width: 1200px;
  margin: 0 auto;
  text-align: right;
  .pager-btns {
    display: inline-block;
    padding: 0 5px;
  }
  .prev-page-btn,
  .next-page-btn {
    display: inline-block;
    width: 26px;
    height: 26px;
    border: 1px solid #dcdfe6;
    text-align: center;
    vertical-align: middle;
    margin: 0 5px;
    outline: 0;
    &[disabled] {
      cursor: no-drop;
    }
    &:not([disabled]) {
      cursor: pointer;
      &:hover {
        color: #3196ff;
      }
      &:active {
        border-color: #3196ff;
      }
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
