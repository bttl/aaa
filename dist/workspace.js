'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialItem = require('./material-item');

var _materialItem2 = _interopRequireDefault(_materialItem);

var _actionMaterial = require('./actions/action-material');

var _actionMaterial2 = _interopRequireDefault(_actionMaterial);

var _storeMaterialList = require('./stores/store-material-list');

var _storeMaterialList2 = _interopRequireDefault(_storeMaterialList);

var _storeMaterialItem = require('./stores/store-material-item');

var _storeMaterialItem2 = _interopRequireDefault(_storeMaterialItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** 
* Workspace for a project
*    contains a list of materials and selected material
*/

var Workspace = function (_React$Component) {
  _inherits(Workspace, _React$Component);

  function Workspace(props) {
    _classCallCheck(this, Workspace);

    // from root (one per application)

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Workspace).call(this, props));

    _this.dspr = props.dspr;

    // view -> action -> dspr
    _this.actionMaterial = new _actionMaterial2.default(_this.dspr);

    // dspr -> store -> view
    _this.storeMaterialList = new _storeMaterialList2.default(_this.dspr);
    _this.storeMaterialItem = new _storeMaterialItem2.default(_this.dspr);

    // get this state from appStore
    _this.state = _this._getStoreState();

    // moved to actionMaterial
    // this.requestUrl =  this.props.apiHost + '/v1/material/get-list' +
    //   '?vk_id=' + this.props.vkId +
    //   '&auth_key=' + this.props.authKey;

    var gHeight = 350;
    //var gWidth = 140;

    _this.styles = _this.props.sts.create({
      textWrap: {
        flex: 3,
        height: gHeight,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        padding: 8
      },
      listWrap: {
        flex: 1,
        height: gHeight
      },
      container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8
      }
    });

    var cmp = _this.props.cmp;

    _this.cmpView = _react2.default.createFactory(cmp.View);
    _this.cmpScroller = _react2.default.createFactory(cmp.Scroller);
    _this.cmpText = _react2.default.createFactory(cmp.Text);
    _this.cmpLister = _react2.default.createFactory(cmp.Lister);
    _this.cmpMaterialItem = _react2.default.createFactory(_materialItem2.default);
    return _this;
  }

  _createClass(Workspace, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // listen changes inside appStore
      // update a state after some changes occurs
      this.storeMaterialList.addChangeListener(function () {
        return _this2._onChange();
      });
      this.storeMaterialItem.addChangeListener(function () {
        return _this2._onChange();
      });

      this.actionMaterial.receiveListByUser(this.props.apiHost, this.props.vkId, this.props.authKey);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _this3 = this;

      this.storeMaterialList.removeChangeListener(function () {
        return _this3._onChange();
      });
      this.storeMaterialItem.removeChangeListener(function () {
        return _this3._onChange();
      });
    }

    /**
     * Event handler for 'change' events coming from the TodoStore
     */

  }, {
    key: '_onChange',
    value: function _onChange() {
      var storeState = this._getStoreState();
      console.log('_onChange', storeState);
      this.setState(storeState);
    }

    /**
     * State contains only required props of objects
     *     no full objects - just props,
     *     like content of a selected material
     */

  }, {
    key: '_getStoreState',
    value: function _getStoreState() {
      return {
        arr: this.storeMaterialList.getList(),
        loaded: this.storeMaterialList.checkLoaded(),
        content: this.storeMaterialItem.getCurrentText(),
        itemProgress: this.storeMaterialItem.checkProgress()
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (!this.state.loaded) {
        return this.cmpView({
          style: this.styles.container
        }, this.cmpText(null, 'загрузка...'));
      }

      var list = this.cmpLister({
        style: this.styles.list,
        arr: this.state.arr,
        renderRow: function renderRow(row) {
          return _this4.cmpMaterialItem({
            row: row,
            vkId: _this4.props.vkId,
            apiHost: _this4.props.apiHost,
            authKey: _this4.props.authKey,
            cmp: _this4.props.cmp,
            sts: _this4.props.sts,
            selectItem: function selectItem(item) {
              return _this4.actionMaterial.receiveMaterialItem(_this4.props.apiHost, _this4.props.vkId, _this4.props.authKey, item);
            }
          });
        }
      });

      var listWrap = this.cmpScroller({
        style: this.styles.listWrap
      }, list);

      var text = this.cmpText(null, this.state.itemProgress ? '...' : this.state.content);

      var textWrap = this.cmpScroller({
        style: this.styles.textWrap
      }, text);

      return this.cmpView({
        style: this.styles.container
      }, textWrap, listWrap);
    }
  }]);

  return Workspace;
}(_react2.default.Component);

Workspace.propTypes = {
  vkId: _react2.default.PropTypes.string.isRequired,
  authKey: _react2.default.PropTypes.string.isRequired,
  apiHost: _react2.default.PropTypes.string.isRequired,
  cmp: _react2.default.PropTypes.object.isRequired,
  sts: _react2.default.PropTypes.object.isRequired,
  dspr: _react2.default.PropTypes.object.isRequired
};

exports.default = Workspace;