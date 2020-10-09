"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _conf = _interopRequireDefault(require("../../conf"));

var _modal = _interopRequireDefault(require("../../modal/src/modal"));

var _radio = _interopRequireDefault(require("../../radio/src/radio"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'VxeImportPanel',
  props: {
    defaultOptions: Object,
    storeData: Object
  },
  components: {
    VxeModal: _modal.default,
    VxeRadio: _radio.default
  },
  data: function data() {
    return {
      loading: false
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    selectName: function selectName() {
      return "".concat(this.storeData.filename, ".").concat(this.storeData.type);
    },
    hasFile: function hasFile() {
      return this.storeData.file && this.storeData.type;
    },
    parseTypeLabel: function parseTypeLabel() {
      var storeData = this.storeData;
      var type = storeData.type,
          typeList = storeData.typeList;

      if (type) {
        var selectItem = typeList.find(function (item) {
          return type === item.value;
        });
        return selectItem ? _conf.default.i18n(selectItem.label) : '*.*';
      }

      return "*.".concat(typeList.map(function (item) {
        return item.value;
      }).join(', *.'));
    }
  },
  render: function render(h) {
    var hasFile = this.hasFile,
        parseTypeLabel = this.parseTypeLabel,
        defaultOptions = this.defaultOptions,
        storeData = this.storeData,
        selectName = this.selectName;
    return h('vxe-modal', {
      res: 'modal',
      model: {
        value: storeData.visible,
        callback: function callback(value) {
          storeData.visible = value;
        }
      },
      props: {
        title: _conf.default.i18n('vxe.import.impTitle'),
        width: 440,
        mask: true,
        lockView: true,
        showFooter: false,
        escClosable: true,
        maskClosable: true,
        loading: this.loading
      }
    }, [h('div', {
      class: 'vxe-export--panel'
    }, [h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      }
    }, [h('tbody', [[h('tr', [h('td', _conf.default.i18n('vxe.import.impFile')), h('td', [hasFile ? h('div', {
      class: 'vxe-import-selected--file',
      attrs: {
        title: selectName
      }
    }, [h('span', selectName), h('i', {
      class: _conf.default.icon.importRemove,
      on: {
        click: this.clearFileEvent
      }
    })]) : h('span', {
      class: 'vxe-import-select--file',
      on: {
        click: this.selectFileEvent
      }
    }, _conf.default.i18n('vxe.import.impSelect'))])]), h('tr', [h('td', _conf.default.i18n('vxe.import.impType')), h('td', parseTypeLabel)]), h('tr', [h('td', _conf.default.i18n('vxe.import.impOpts')), h('td', [h('vxe-radio-group', {
      model: {
        value: defaultOptions.mode,
        callback: function callback(value) {
          defaultOptions.mode = value;
        }
      }
    }, storeData.modeList.map(function (item) {
      return h('vxe-radio', {
        props: {
          label: item.value
        }
      }, _conf.default.i18n(item.label));
    }))])])]])]), h('div', {
      class: 'vxe-export--panel-btns'
    }, [h('vxe-button', {
      props: {
        status: 'primary',
        disabled: !hasFile
      },
      on: {
        click: this.importEvent
      }
    }, _conf.default.i18n('vxe.import.impConfirm'))])])]);
  },
  methods: {
    clearFileEvent: function clearFileEvent() {
      Object.assign(this.storeData, {
        filename: '',
        sheetName: '',
        type: ''
      });
    },
    selectFileEvent: function selectFileEvent() {
      var _this = this;

      var $xetable = this.$parent;
      $xetable.readFile(this.defaultOptions).then(function (evnt) {
        var file = evnt.target.files[0];
        Object.assign(_this.storeData, _tools.UtilTools.parseFile(file), {
          file: file
        });
      }).catch(function (e) {
        return e;
      });
    },
    importEvent: function importEvent() {
      var _this2 = this;

      var $xetable = this.$parent;
      this.loading = true;
      $xetable.importByFile(this.storeData.file, Object.assign({}, $xetable.importOpts, this.defaultOptions)).then(function () {
        _this2.loading = false;
        _this2.storeData.visible = false;
      });
    }
  }
};
exports.default = _default;