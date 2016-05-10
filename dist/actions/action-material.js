'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Middleware with actions
 */

var ActionMaterial = function () {

  /**
   * Creates a new mdw
   * @param {object} dspr A root dispatcher
   */

  function ActionMaterial(dspr) {
    _classCallCheck(this, ActionMaterial);

    this.dspr = dspr;
  }

  /**
   * Load a list of materials for current user. 
   * Send a result to a root dispatcher.
   * @param {string} apiHost
   * @param {string} vkId
   * @param {string} authKey
   */


  _createClass(ActionMaterial, [{
    key: 'receiveListByUser',
    value: function receiveListByUser(apiHost, vkId, authKey) {
      var _this = this;

      var requestUrl = apiHost + '/v1/material/get-list' + '?vk_id=' + vkId + '&auth_key=' + authKey;

      fetch(requestUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        if (json.errkey) {
          alert('Непредвиденная ошибка: ' + json.errkey + ': попробуйте позже');
          return;
        }

        _this.dspr.server(_constants2.default.MATERIAL_LIST_RECEIVE, {
          arr: json
        });
      }).catch(function (ex) {
        console.warn('fetch error', ex);
        alert('Непредвиденная ошибка: fetch error: попробуйте позже');
      });
      //.done();
    }

    /**
     * Load a material content (id + mcontent) and attach it to the material
     *   It is like a retrieve a full record.
     * @param {object} mtrl Material
     */

  }, {
    key: 'receiveMaterialItem',
    value: function receiveMaterialItem(apiHost, vkId, authKey, mtrl) {
      var _this2 = this;

      this.dspr.client(_constants2.default.MATERIAL_ITEM_PROGRESS, {});
      var requestUrl = apiHost + '/v1/material/get-text' + '?id=' + mtrl.id + '&vk_id=' + vkId + '&auth_key=' + authKey;

      fetch(requestUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        mtrl.content = json.mcontent;
        _this2.dspr.server(_constants2.default.MATERIAL_ITEM_RECEIVE, {
          item: mtrl
        });

        // var mtrl = this.props.row;
        // mtrl.content = json.mcontent;
        // this.props.selectItem(mtrl);
      });
    }
  }]);

  return ActionMaterial;
}();

;

exports.default = ActionMaterial;