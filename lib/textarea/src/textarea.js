"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'VxeTextarea',
  props: {
    value: [String, Number],
    name: String,
    readonly: Boolean,
    disabled: Boolean,
    placeholder: String,
    maxlength: [String, Number],
    rows: {
      type: [String, Number],
      default: 2
    },
    form: String,
    size: String
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    defaultEvents: function defaultEvents() {
      var _this = this;

      var evnts = {};

      _xeUtils.default.each(this.$listeners, function (cb, name) {
        evnts[name] = _this.triggerEvent;
      });

      evnts.input = this.inputEvent;
      return evnts;
    }
  },
  render: function render(h) {
    var _ref;

    var defaultEvents = this.defaultEvents,
        value = this.value,
        vSize = this.vSize,
        name = this.name,
        form = this.form,
        placeholder = this.placeholder,
        readonly = this.readonly,
        disabled = this.disabled,
        maxlength = this.maxlength;
    var attrs = {
      name: name,
      form: form,
      placeholder: placeholder,
      maxlength: maxlength,
      readonly: readonly,
      disabled: disabled
    };

    if (placeholder) {
      attrs.placeholder = _tools.UtilTools.getFuncText(placeholder);
    }

    return h('div', {
      class: ['vxe-textarea', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--disabled', disabled), _ref)]
    }, [h('textarea', {
      ref: 'textarea',
      class: 'vxe-textarea--inner',
      domProps: {
        value: value
      },
      attrs: attrs,
      on: defaultEvents
    })]);
  },
  methods: {
    focus: function focus() {
      this.$refs.textarea.focus();
      return this.$nextTick();
    },
    blur: function blur() {
      this.$refs.textarea.blur();
      return this.$nextTick();
    },
    emitUpdate: function emitUpdate(value) {
      this.$emit('input', value);
    },
    inputEvent: function inputEvent(evnt) {
      this.emitUpdate(evnt.target.value);
    }
  }
};
exports.default = _default;