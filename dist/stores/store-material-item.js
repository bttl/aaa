'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

var _events = require('events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CHANGE_EVENT = 'change-item';

/**
 * Material item: storage
 * @extends EventEmitter
 */

var StoreMaterialItem = function (_EventEmitter) {
  _inherits(StoreMaterialItem, _EventEmitter);

  /**
   * Creates a new store with a dispatcher
   * @param {object} dspr A dispatcher, usually one per app
   */

  function StoreMaterialItem(dspr) {
    _classCallCheck(this, StoreMaterialItem);

    /**
     * Inner storage
     *   it cannot be directly changed from outside of the module
     *   preserve a distinct input/output interface for the flow of data by making it impossible to update the store without using an action
     */

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StoreMaterialItem).call(this));

    _this._strg = {
      /** Selected item */
      item: {},
      progress: false
    };

    // registration of the store's callback with the dispatcher.
    dspr.register(function (action) {
      return _this.handleAction(action);
    });
    return _this;
  }

  /**
   * Handle an action, update a store (using actions only)
   * @param  {object} action A handled action
   */


  _createClass(StoreMaterialItem, [{
    key: 'handleAction',
    value: function handleAction(action) {
      console.log('handleActionItem', action);

      switch (action.actionType) {
        case _constants2.default.MATERIAL_ITEM_RECEIVE:
          // item = material
          this._strg.item = action.item;
          this._strg.progress = false;
          this.emitChange();
          break;
        case _constants2.default.MATERIAL_ITEM_PROGRESS:
          this._strg.progress = true;
          this.emitChange();
          break;
      }
    }

    /**
     * @returns {string} Returns a text of a selected item or null if no selection
     */

  }, {
    key: 'getCurrentText',
    value: function getCurrentText() {
      var mtrl = this._strg.item;
      if (mtrl && mtrl.content) {
        return mtrl.mname + '\n\n' + mtrl.content + '\n\n' + mtrl.create_date.substring(0, 10);
      }
      return null;
    }
  }, {
    key: 'checkProgress',
    value: function checkProgress() {
      return this._strg.progress;
    }
  }, {
    key: 'emitChange',
    value: function emitChange() {
      this.emit(CHANGE_EVENT);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    }
  }, {
    key: 'removeChangeListerner',
    value: function removeChangeListerner(callback) {
      this.removeListerner(CHANGE_EVENT, callback);
    }
  }]);

  return StoreMaterialItem;
}(_events.EventEmitter);

exports.default = StoreMaterialItem;