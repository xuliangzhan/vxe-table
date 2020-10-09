"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

var optionUniqueId = 0;
var _default = {
  name: 'VxeOption',
  props: {
    value: [String, Number],
    label: [String, Number],
    disabled: Boolean,
    size: String
  },
  inject: {
    $xeselect: {
      default: null
    },
    $xeoptgroup: {
      default: null
    }
  },
  data: function data() {
    return {
      id: "option_".concat(++optionUniqueId)
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isDisabled: function isDisabled() {
      var $xeoptgroup = this.$xeoptgroup,
          disabled = this.disabled;
      return $xeoptgroup && $xeoptgroup.disabled || disabled;
    }
  },
  warch: {
    value: function value() {
      this.updateView();
    }
  },
  mounted: function mounted() {
    this.updateView();
  },
  destroyed: function destroyed() {
    this.updateView();
  },
  render: function render(h) {
    var $xeselect = this.$xeselect,
        id = this.id,
        isDisabled = this.isDisabled,
        value = this.value;
    return h('div', {
      class: ['vxe-select-option', {
        'is--disabled': isDisabled,
        'is--checked': $xeselect.value === value,
        'is--hover': $xeselect.currentValue === value
      }],
      attrs: {
        'data-option-id': id
      },
      on: {
        click: this.optionEvent,
        mouseenter: this.mouseenterEvent
      }
    }, _tools.UtilTools.getFuncText(this.label));
  },
  methods: {
    updateView: function updateView() {
      this.$xeselect.updateStatus();
    },
    optionEvent: function optionEvent(evnt) {
      this.$xeselect.changeOptionEvent(evnt, this.value);
    },
    mouseenterEvent: function mouseenterEvent() {
      this.$xeselect.setCurrentOption(this);
    }
  }
};
exports.default = _default;