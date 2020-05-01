import React, { Component } from "react";
import { Button } from "antd";
import { withRouter } from "react-router-dom";


class NotFound extends Component {
  hanleClick = () => {
    this.props.history.push('/preface')
  }
  render() {
    return (
      <div style={{ padding: "40px" }}>
        <p>对不起，你访问的页面不存在。</p>
        <Button onClick={this.hanleClick} style={{ padding: "0" }} type="link">返回主页面</Button>
      </div>
    );
  }
}

export default withRouter(NotFound)