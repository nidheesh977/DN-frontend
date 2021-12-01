import Purchased from './Purchased';
import Liked from './Liked';
import Cart from './Cart';
import All from '../website/All.module.css' 
import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import FreedownloadListing from './FreedownloadListing';

const Tab = styled.div`
  padding: 10px; 
`;

const TabLink = styled.button`
  background-color: white;
  padding: 12px;
  border: 0 none; 
  background: ${(p) => (p.selected ? "#4FFEA3 0% 0% no-repeat padding-box" : "transparent")};
  border: ${(p) => (p.selected ? "1px solid #00000033" : "0px solid #00000033")};
  border-radius: ${(p) => (p.selected ? "5px" : "0px")};    
  &:focus {
    outline: 0 none;
  }
`;

class Tabs extends React.Component {
  state = { selected: 0 };
  select = (i) => this.setState({ selected: i });
  render() {
    const { children } = this.props;
    const tabs = children.map((c, i) => (
      <TabLink
      className={All.DownloadTabs}
        key={i}
        selected={i === this.state.selected}
        onClick={this.select.bind(null, i)}
      >
        {c.props.title}
      </TabLink>
    ));

    return (
      <div>
        <div className={All.DownloadTabsSeaction}>
        {tabs}
        </div>
      
        <div>{children[this.state.selected]}</div>
      </div>
    );
  }
}

export default function Mystore() {
  return (
    <Tabs>
      <Tab title="Purchased"><Purchased /></Tab>
      <Tab title="Liked"> <Liked /></Tab> 
      <Tab title="Free Purchased"> <FreedownloadListing /></Tab> 
    </Tabs>
  );
}
