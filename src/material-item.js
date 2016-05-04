import React from 'react';

export class MaterialItem extends React.Component{
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
  
  handleClick() {
    fetch(this.requestUrl)
      .then((response) => {
        return response.json();
      }).then((json) => {
        
        var mtrl = this.props.row;
        this.props.setCurrentText(mtrl.mname + '\n\n' + json.mcontent + '\n\n' + mtrl.create_date.substring(0, 10));
      });
  }

  render() {
    var btn = this.cmpBtn({
      onClick: () => this.handleClick(),
      style: this.styles.button,
      underlayColor: '#ccc'
    }, this.props.row.mname);

    return this.cmpView({
      style: this.styles.container
    }, btn);
  }
}
