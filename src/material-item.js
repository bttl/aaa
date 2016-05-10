import React from 'react';

/**
 * Material, like Text or Video
 * @extends React.Component
 */
class MaterialItem extends React.Component{

  /**
   * Creates a new component
   * @param {object} props Input data from a parent
   */
  constructor(props){
    super(props);
    
    this.styles = this.props.sts.create({
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

    this.cmpBtn = React.createFactory(this.props.cmp.Btn);
    this.cmpView = React.createFactory(this.props.cmp.View);

    this.requestUrl = this.props.apiHost + '/v1/material/get-text' +
      '?id=' + this.props.row.id +
      '&vk_id=' + this.props.vkId +
      '&auth_key=' + this.props.authKey;
  }

  render() {
    var mtrl = this.props.row;
    
    var btn = this.cmpBtn({
      onClick: () => this.props.selectItem(mtrl),
      style: this.styles.button,
      underlayColor: '#ccc'
    }, mtrl.mname);

    return this.cmpView({
      style: this.styles.container
    }, btn);
  }
}

MaterialItem.propTypes = {
  selectItem: React.PropTypes.func.isRequired
};

export default MaterialItem;
