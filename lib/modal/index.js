"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = Modal;
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils/methods/xe-utils"));

var _modal = _interopRequireDefault(require("./src/modal"));

var _queue = _interopRequireDefault(require("./src/queue"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

var _tools = require("../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertController = null;
var allActivedModals = [];

function openModal(options) {
  return new Promise(function (resolve) {
    if (options && options.id && _queue.default.some(function (comp) {
      return comp.id === options.id;
    })) {
      resolve('exist');
    } else {
      var events = options.events || {};
      options.events = Object.assign({}, events, {
        hide: function hide(params) {
          if (events.hide) {
            events.hide.call(this, params);
          }
          /* eslint-disable @typescript-eslint/no-use-before-define */


          setTimeout(function () {
            return $modal.$destroy();
          }, $modal.isMsg ? 500 : 100);

          _xeUtils.default.remove(allActivedModals, function (item) {
            return item === $modal;
          });

          resolve(params.type);
        }
      });
      var $modal = new AlertController({
        el: document.createElement('div'),
        propsData: options
      });
      setTimeout(function () {
        return $modal.open();
      });
      allActivedModals.push($modal);
    }
  });
}

function Modal(options) {
  return openModal(options);
}

['alert', 'confirm', 'message'].forEach(function (type, index) {
  var defOpts = index === 2 ? {
    mask: false,
    lockView: false,
    showHeader: false
  } : {
    showFooter: true
  };
  defOpts.type = type;
  defOpts.dblclickZoom = false;

  if (index === 1) {
    defOpts.status = 'question';
  }

  Modal[type] = function (message, title, options) {
    var opts;

    if (_xeUtils.default.isObject(message)) {
      opts = message;
    } else {
      if (title) {
        opts = {
          title: title
        };
      }
    }

    return openModal(Object.assign({
      message: _xeUtils.default.toString(message),
      type: type
    }, defOpts, opts, options));
  };
});
/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */

function closeModal(id) {
  if (arguments.length) {
    var modal = getModal(id);

    if (modal) {
      modal.close('close');
    }
  } else {
    allActivedModals.forEach(function ($modal) {
      return $modal.close('close');
    });
  }
}

function getModal(id) {
  return allActivedModals.find(function ($modal) {
    return $modal.id === id;
  });
}

Modal.closeAll = function () {
  _tools.UtilTools.warn('vxe.error.delFunc', ['closeAll', 'close']);

  closeModal();
};

Modal.get = getModal;
Modal.close = closeModal;
Modal.open = openModal;

Modal.install = function (Vue) {
  _vXETable.default._modal = 1;
  Vue.component('vxe-message', _modal.default);
  Vue.component(_modal.default.name, _modal.default);
  AlertController = Vue.extend(_modal.default);
  Vue.prototype.$XMsg = Modal;
  Vue.prototype.$XModal = Modal;
  _vXETable.default.$modal = Modal;
};

var _default = Modal;
exports.default = _default;