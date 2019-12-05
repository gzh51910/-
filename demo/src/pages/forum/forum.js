import React, { Component } from 'react';
import { fapi,biyuan } from '../../api'
import { connect } from 'react-redux';
import '../../css/forum.css';
import { Icon, Tabs, Radio, Spin } from "antd";
import { Carousel } from 'antd-mobile';
import ForumList from './forumList';
import { StickyContainer, Sticky } from 'react-sticky';
const { TabPane } = Tabs;
// const { SubMenu } = Menu;
function mapStateToProps(state) {
    return {

    };
}

class forum extends Component {
    state = {
        forumBanner: [
            "https://statics.coingogo.com/uploads/setting/banner/20190522105947_5ce4bb2351604.jpg",
            "https://statics.coingogo.com/uploads/setting/banner/20190522105947_5ce4bb2351604.jpg",
            "https://statics.coingogo.com/uploads/setting/banner/20190522105947_5ce4bb2351604.jpg"
        ],
        //菜单
        forumMenu: [
            {
                first: "最新",
                second: []
            },
            {
                first: "数字货币",
                second: [{text:"比特币",id:"2"} ,{text:"区块链",id:"3"} ,{text:"竞争币",id:"4"} ,{text:"消息爆料",id:"14"} ,{text:"O撸社",id:"20"} ,{text:"以太坊",id:"26"} ,{text:"量子链",id:"27"} ,{text:"NEO",id:"28"} ,{text:"莱特币",id:"29"} ,{text:"LEDU",id:"33"} ,{text:"区块链项目评级",id:"36"}]
            },
            {
                first: "区块链讨论区",
                second: [{text:"区块链综合讨论",id:"15"} ,{text:"区块链项目",id:"17"} ,{text:"Nuls",id:"18"} ,{text:"ASCH",id:"19"} ,{text:"瀚德FinTech创新学院",id:"21"} ,{text:"DDN数据分发网络",id:"32"} ,{text:"区块链文学",id:"39"}]
            },
            {
                first: "交易平台",
                second: [{text:"出海交易平台",id:"5"} ,{text:"国外交易所",id:"16"} ,{text:"CoinBene",id:"22"} ,{text:"ALLCOIN",id:"31"}]
            },
            {
                first: "综合讨论区",
                second: [{text:"挖矿区",id:"6"} ,{text:"钱包区",id:"7"} ,{text:"综合",id:"8"} ,{text:"言币于此",id:"34"} ,{text:"数字币交易理论",id:"37"}]
            },
            {
                first: "论坛管理",
                second: [{text:"公告版规",id:"24" },{text:"活动中心",id:"25"} ,{text:"模拟交易",id:"38"}]
            }
        ],
        //菜单默认值
        fname: "最新",
        catid:0,
        //分类列表
        flist: [],
        //吸顶效果
        menuStyle: {
            position: "static"
        },
        forumListStyle: {},
        loading: true,
    }
    getmsg = async (fname) => {
        this.setState({
            loading: true
        })
        let { data: [{ flist }] } = await fapi.get({
            fname
        });
        this.setState({
            flist,
            loading: false
        })
    }
    getforum = async (catid)=>{
        let data=await biyuan.get({
            
        })
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        this.getmsg(this.state.fname);
    }
    componentWillUnmount(){
        this.setState=(this.state,callback=>{
            return;
        })
    }
    //一级菜单获取值
    callback = key => {
        document.body.scrollTop = 230;
        if (key == 1) {
            this.setState({
                fname: "最新",
                forumListStyle: { 'marginTop': 0 }
            })
        } else {
            this.setState({
                forumListStyle: { 'marginTop': "33px" }
            })
        }
        // this.getCatid(this.state.fname);
    }
    //二级菜单获取值
    getDatalist = e => {
        document.body.scrollTop = 230;
        this.setState({
            fname: e.target.value,
            forumListStyle: { 'marginTop': "33px" }
        })
        this.getCatid(this.state.fname);
    }
    //获取catid
    getCatid=(fname)=>{
        var catid=this.state.catidList.fname;
        this.setState({
            catid
        })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.fname != this.state.fname) {
            this.getmsg(this.state.fname);
        }
    }
    //滚动监听
    handleScroll = () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 230) {
            this.setState({
                menuStyle: { position: "fixed" },
            })
        } else {
            this.setState({
                menuStyle: { position: "static" },
                forumListStyle: { 'marginTop': "0px" }
            })
        }
    }
    //吸顶组件
    renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={1000}>
            {({ style }) => (
                <DefaultTabBar {...props} style={{ ...style, zIndex: 99, background: '#fff', top: 0 }} />
            )}
        </Sticky>
    )
    render() {
        let { forumBanner, forumMenu, menuStyle, forumListStyle, flist,menuwrapStyle,fname } = this.state;
        return (
            <div className="container-forum">
                <header className="forum-header">
                    <div className="header-home"><img src="http://m.coingogo.com/wap/image/logo.png" /></div>
                    <div className="header-center">泡论坛</div>
                    <Icon type="search" />
                    <Icon type="plus" />
                </header>
                <div className="forum-summary">
                    <div className="forum-summary-yesterday">
                        <Icon type="bar-chart" />
                        <span>昨日：160</span>
                    </div>
                    <div className="forum-summary-today">今日：33</div>
                    <div className="forum-summary-sum">总数：81912</div>
                </div>
                <div className="forum-banner">
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {forumBanner.map(val => (
                            <img
                                src={val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                                key={val}
                            />
                        ))}
                    </Carousel>
                </div>
                <div className="forum-menu" style={menuwrapStyle}>
                    <StickyContainer>
                        <Tabs defaultActiveKey="1" 
                        onChange={this.callback} 
                        renderTabBar={this.renderTabBar}
                        >
                            {forumMenu.map((item, i) => {
                                return (
                                    <TabPane tab={item.first} key={i + 1} style={menuStyle}>
                                        {
                                            i == 0
                                                ?
                                                ""
                                                :
                                                <Radio.Group 
                                                    // defaultValue={0} 
                                                    onChange={this.getDatalist} >
                                                    {item.second.map((val, j) => {
                                                        return (
                                                            <Radio.Button value={val} key={j + 1}>{val}</Radio.Button>
                                                        )
                                                    })}

                                                </Radio.Group>
                                        }

                                    </TabPane>
                                )
                            })}
                        </Tabs>
                    </StickyContainer>
                </div>
                <div className="forumListWrap" style={forumListStyle}>
                    {/* {
                        loading?
                        <Spin></Spin>
                        :<ForumList flist={flist} />
                    } */}
                    <ForumList flist={flist} fname={fname}/>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(forum);