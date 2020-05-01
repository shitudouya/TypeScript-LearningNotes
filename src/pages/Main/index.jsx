import React, { Component } from "react";
import { getHTMLContent } from "../../api/api";
import Prism from "prismjs";
import $ from "jquery";
import { throttle } from "../../utils/common";
import NotFound from '../NotFound/index'
import "../../assets/style/prism.css";
import "./style.scss";

export default class preface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: "",
    };
  }
  //高亮侧边目录(节流)
  handleHighlightToc = () => {
    let headers = $(".main_content h5");
    let tocs = $(".toc ul li");
    if (headers[0]) {
      $(".ant-layout-content .main_content").scroll(
        throttle(function () {
          for (var i = 0; i < headers.length; i++) {
            if ($(headers[i]).offset().top <= $(window).scrollTop() + 80) {
              $(tocs[i]).addClass("active").siblings().removeClass("active");
            }
          }
        }, 200)
      );
    }
  };

  renderHtmlContent = (id) => {
    getHTMLContent({ title: id }).then((res) => {
      this.setState({
        htmlContent: res.data.data,
      });
      setTimeout(() => {
        Prism.highlightAll();
        this.handleHighlightToc();
      }, 100);
    });
  };
  componentDidMount() {
    this.renderHtmlContent(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      //路由跳转后回到页面顶部
      $(".ant-layout-content .main_content").scrollTop(0);
    }
    this.renderHtmlContent(nextProps.match.params.id);
  }
  render() {
    const { htmlContent } = this.state;
    if(htmlContent!=="null") {
      return <div ref={(node) => (this.node = node)} className="main_content" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
    } 
    return <NotFound/>
  }
}
