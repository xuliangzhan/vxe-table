<template>
  <div class="filter-page">
    <div class="filter-preview">
      <div class="preview-item" v-for="item in filterList" :key="item.code">
        <div class="preview-contnet">
          <div class="preview-title">
            <i class="help-icon" :title="item.features">?</i>
            <span style="font-size: 20px;font-weight: 700;">{{ item.title }}</span><span style="font-size: 12px"> -源码版</span><span class="price-unit">￥{{ item.price }}</span><span style="font-size: 12px">/永久</span>
          </div>
          <img class="preview-img" :src="item.previewUrl">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
          ].join('\n')
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
          ].join('\n')
        }
      ]
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
</style>
