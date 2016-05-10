'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Material, like Text or Video
 * @extends React.Component
 */

var MaterialItem = function (_React$Component) {
  _inherits(MaterialItem, _React$Component);

  /**
   * Creates a new component
   * @param {object} props Input data from a parent
   */

  function MaterialItem(props) {
    _classCallCheck(this, MaterialItem);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MaterialItem).call(this, props));

    _this.styles = _this.props.sts.create({
      container: {
        padding: 0,
        marginBottom: 4
      },
      button: {
        // mobile restrictions:
        // - no percent width height
        // - minHeight is not valid
        flex: 1,
        padding: 6,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ccc',
        backgroundColor: '#eee'
      }
    });

    _this.cmpBtn = _react2.default.createFactory(_this.props.cmp.Btn);
    _this.cmpView = _react2.default.createFactory(_this.props.cmp.View);

    _this.requestUrl = _this.props.apiHost + '/v1/material/get-text' + '?id=' + _this.props.row.id + '&vk_id=' + _this.props.vkId + '&auth_key=' + _this.props.authKey;
    return _this;
  }

  _createClass(MaterialItem, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var mtrl = this.props.row;

      var btn = this.cmpBtn({
        onClick: function onClick() {
          return _this2.props.selectItem(mtrl);
        },
        style: this.styles.button,
        underlayColor: '#ccc'
      }, mtrl.mname);

      return this.cmpView({
        style: this.styles.container
      }, btn);
    }
  }]);

  return MaterialItem;
}(_react2.default.Component);

MaterialItem.propTypes = {
  selectItem: _react2.default.PropTypes.func.isRequired
};

exports.default = MaterialItem;