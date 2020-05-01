import React, { Component } from "react";
import { getHTMLContent } from "../../api/api";
import Prism from 'prismjs';
import '../../assets/style/prism.css'
import './style.scss'

export default class preface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: "",
    };
  }
  renderHtmlContent = (id) => {
    getHTMLContent({ title: id }).then((res) => {
      this.setState({
        htmlContent: res.data.data,
      });
      setTimeout(() => {
        Prism.highlightAll()
      }, 200);
    });
  };
  componentDidMount() {
    this.renderHtmlContent(this.props.match.params.id);
    
  }
  componentWillReceiveProps(nextProps) {
    this.renderHtmlContent(nextProps.match.params.id);
  }
  render() {
    const { htmlContent } = this.state;
    return <div className="main_content" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
  }
}
