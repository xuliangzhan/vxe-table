"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tools = require("../../tools");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeCheckbox',
  props: {
    value: Boolean,
    label: [String, Number],
    indeterminate: Boolean,
    title: [String, Number],
    content: [String, Number],
    disabled: Boolean,
    size: String
  },
  inject: {
    $xegroup: {
      default: null
    }
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isGroup: function isGroup() {
      return this.$xegroup;
    }
  },
  render: function render(h) {
    var _ref,
        _this = this;

    var $slots = this.$slots,
        $xegroup = this.$xegroup,
        isGroup = this.isGroup,
        disabled = this.disabled,
        title = this.title,
        vSize = this.vSize,
        indeterminate = this.indeterminate,
        value = this.value,
        label = this.label,
        content = this.content;
    var attrs = {};

    if (title) {
      attrs.title = title;
    }

    return h('label', {
      class: ['vxe-checkbox', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--indeterminate', indeterminate), _defineProperty(_ref, 'is--disabled', disabled), _ref)],
      attrs: attrs
    }, [h('input', {
      attrs: {
        type: 'checkbox',
        disabled: disabled
      },
      domProps: {
        checked: isGroup ? $xegroup.value && $xegroup.value.some(function (item) {
          return item === label;
        }) : value
      },
      on: {
        change: function change(evnt) {
          if (!_this.disabled) {
            var checked = evnt.target.checked;
            var params = {
              checked: checked,
              label: label
            };

            if (isGroup) {
              $xegroup.handleChecked(params, evnt);
            } else {
              _this.$emit('input', checked);

              _this.$emit('change', params, evnt);
            }
          }
        }
      }
    }), h('span', {
      class: 'vxe-checkbox--icon'
    }), h('span', {
      class: 'vxe-checkbox--label'
    }, $slots.default || [_tools.UtilTools.getFuncText(content)])]);
  }
};
exports.default = _default;