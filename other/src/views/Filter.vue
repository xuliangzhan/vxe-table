<template>
  <div class="filter-page">
    <div class="filter-preview">
      <div class="preview-item" v-for="item in filterList" :key="item.code">
        <div class="preview-contnet">
          <div class="preview-title">
            <i class="help-icon" :title="item.features">?</i>
            <span style="font-size: 20px;font-weight: 700;">{{ item.title }}</span><span style="font-size: 12px"> -源码版</span><span class="price-unit">￥{{ item.price }}</span><span style="font-size: 12px">/永久</span>
            <a class="update-log" @click="showLog(item)">更新日志</a>
          </div>
          <img class="preview-img" :src="item.previewUrl">
        </div>
      </div>
    </div>
    <div v-show="logVisible" class="filter-log-popup" @click.self="logVisible = false">
      <div v-if="selectItem" class="filter-log-box">
        <div class="popup-header">
          <span class="popup-title">{{ selectItem.code }}</span>
          <i class="close-btn" @click="logVisible = false">x</i>
        </div>
        <div class="popup-body">
          <div v-for="(item, index) in selectItem.logList" :key="index">
            <div class="log-version">
              <span class="log-name">v{{ item.version }}</span>
              <span class="log-date">{{ item.date }}</span>
            </div>
            <div class="log-desc">
              <ul class="log-list">
                <li class="log-li" v-for="(log, cIndex) in item.logs" :key="`${index}${cIndex}`">{{ log }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logVisible: false,
      selectItem: null,
      filterList: [
        {
          title: '输入筛选',
          price: 50,
          code: 'FilterComplexInput',
          previewUrl: require('../assets/image/plugin/FilterComplexInput.gif'),
          features: [
            '筛选内容：',
            '支持固定列',
            '支持回车筛选',
            '支持关键字模糊匹配',
            '支持关键字精准匹配',
            '支持匹配已关键字开头',
            '支持匹配已关键字结尾',
            '支持匹配空值'
          ].join('\n'),
          logList: [
            {
              version: '1.0.0',
              date: '2019-05-01',
              logs: [
                '支持固定列',
                '支持回车筛选',
                '支持关键字模糊匹配',
                '支持关键字精准匹配',
                '支持匹配已关键字开头',
                '支持匹配已关键字结尾',
                '支持匹配空值'
              ]
            }
          ]
        },
        {
          title: '组合筛选',
          price: 300,
          code: 'FilterCombination',
          previewUrl: require('../assets/image/plugin/FilterCombination.gif'),
          features: [
            '组合筛选：',
            '支持排序',
            '支持固定列',
            '支持搜索内容区域虚拟渲染',
            '支持根据单元格的值进行筛选',
            '支持关键字包含匹配',
            '支持关键字不包含匹配',
            '支持关键字等于匹配',
            '支持关键字不等于匹配',
            '支持关键字开头匹配',
            '支持非关键字开头匹配',
            '支持关键字结尾匹配',
            '支持非关键字结尾匹配',
            '支持数值筛选小于指定值',
            '支持数值筛选小于或等于指定值',
            '支持数值筛选大于指定值',
            '支持数值筛选大于或等于指定值',
            '支持匹配空值',
            '通配符：',
            '?（代表任意单个字符）*（代表任意字符）~（用于匹配通配符）',
            '例如：',
            '输入 "a*" 可查找到 "axxx"',
            '输入 "a?" 可查找到 "ax"',
            '输入 "~?" 可查找到 "?"',
            '输入 "~*" 可查找到 "*"',
            '输入 "~~" 可查找到 "~"'
          ].join('\n'),
          logList: [
            {
              version: '1.0.0',
              date: '2019-05-15',
              logs: [
                '支持排序',
                '支持固定列',
                '支持搜索内容区域虚拟渲染',
                '支持根据单元格的值进行筛选',
                '支持关键字包含匹配',
                '支持关键字不包含匹配',
                '支持关键字等于匹配',
                '支持关键字不等于匹配',
                '支持关键字开头匹配',
                '支持非关键字开头匹配',
                '支持关键字结尾匹配',
                '支持非关键字结尾匹配',
                '支持数值筛选小于指定值',
                '支持数值筛选小于或等于指定值',
                '支持数值筛选大于指定值',
                '支持数值筛选大于或等于指定值',
                '支持匹配空值'
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    showLog (item) {
      this.selectItem = item
      this.logVisible = true
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
.help-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 12px;
  border-radius: 50%;
  margin: 0 5px;
  color: #fff;
  background-color: #000;
  text-align: center;
  cursor: help;
}
.filter-preview {
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
  .preview-item {
    width: 600px;
    height: 420px;
    float: left;
    width: 50%;
    padding: 10px;
  }
  .preview-contnet {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    box-shadow: 1px 2px 10px #eee;
    background-color: #fff;
  }
  .preview-title {
    margin: 0;
    padding-top: 15px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .preview-img {
    width: 100%;
  }
}
.filter-log-popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .filter-log-box {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 15px;
    border-radius: 4px;
    transform: translate(-50%, -50%);
    background-color: #fff;
    .popup-header {
      height: 40px;
      .popup-title {
        font-size: 18px;
        font-weight: 700;
      }
      .close-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        height: 30px;
        width: 30px;
        text-align: center;
        border-radius: 50%;
        color: #000;
        font-size: 20px;
        user-select: none;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
    .popup-body {
      width: 600px;
      height: 400px;
      overflow: auto;
    }
  }
  .log-name {
    font-size: 22px;
    font-weight: 700;
    color: #0d1a26;
  }
  .log-date {
    font-size: 12px;
    margin-left: 15px;
    padding: 2px 5px;
    background: #f2f4f5;
    border: 1px solid #eee;
  }
  .log-list {
    .log-li {
      list-style-type: circle;
    }
  }
}
</style>
