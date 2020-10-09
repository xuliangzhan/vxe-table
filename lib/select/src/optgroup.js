"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

var _default = {
  name: 'VxeOptgroup',
  props: {
    label: [String, Number],
    disabled: Boolean,
    size: String
  },
  provide: function provide() {
    return {
      $xeoptgroup: this
    };
  },
  inject: {
    $xeselect: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  mounted: function mounted() {
    this.$xeselect.updateStatus();
  },
  destroyed: function destroyed() {
    this.$xeselect.updateStatus();
  },
  render: function render(h) {
    return h('div', {
      class: 'vxe-optgroup'
    }, [h('div', {
      class: 'vxe-optgroup--title'
    }, _tools.UtilTools.getFuncText(this.label)), h('div', {
      class: 'vxe-optgroup--wrapper'
    }, this.$slots.default)]);
  }
};
exports.default = _default;