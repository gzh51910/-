import React, { Component } from 'react';
import { local,fapi } from '../../api'
import { connect } from 'react-redux';
import '../../css/forum.css';
import { Tabs, Radio, Spin } from "antd";
import ForumList from './forumList';
import { StickyContainer, Sticky } from 'react-sticky';
import { log } from 'util';


const { TabPane } = Tabs;
// const { SubMenu } = Menu;


function mapStateToProps({ forumList }) {
    return {
        catid: forumList.catid,
        forumList: forumList.forumList
    };
}
@connect(mapStateToProps)
class forumMenu extends Component {
    state = {
        //菜单
        forumMenu: [
            {
                first: "最新",
                second: []
            },
            {
                first: "数字货币",
                second: [{ text: "比特币", id: "2" }, { text: "区块链", id: "3" }, { text: "竞争币", id: "4" }, { text: "消息爆料", id: "14" }, { text: "O撸社", id: "20" }, { text: "以太坊", id: "26" }, { text: "量子链", id: "27" }, { text: "NEO", id: "28" }, { text: "莱特币", id: "29" }, { text: "LEDU", id: "33" }, { text: "区块链项目评级", id: "36" }]
            },
            {
                first: "区块链讨论区",
                second: [{ text: "区块链综合讨论", id: "15" }, { text: "区块链项目", id: "17" }, { text: "Nuls", id: "18" }, { text: "ASCH", id: "19" }, { text: "瀚德FinTech创新学院", id: "21" }, { text: "DDN数据分发网络", id: "32" }, { text: "区块链文学", id: "39" }]
            },
            {
                first: "交易平台",
                second: [{ text: "出海交易平台", id: "5" }, { text: "国外交易所", id: "16" }, { text: "CoinBene", id: "22" }, { text: "ALLCOIN", id: "31" }]
            },
            {
                first: "综合讨论区",
                second: [{ text: "挖矿区", id: "6" }, { text: "钱包区", id: "7" }, { text: "综合", id: "8" }, { text: "言币于此", id: "34" }, { text: "数字币交易理论", id: "37" }]
            },
            {
                first: "论坛管理",
                second: [{ text: "公告版规", id: "24" }, { text: "活动中心", id: "25" }, { text: "模拟交易", id: "38" }]
            }
        ],
        //菜单默认值
        catid: 0,
        //分类列表
        flist: [],
        //吸顶效果
        menuStyle: {
            position: "static"
        },
        forumListStyle: {},
        loading: false,
        menuwrapStyle:{height:"auto"}
    }
    //转化时间戳
    getTime = (time) => {
        let date = new Date().getTime();
        let offset = date / 1000 - time;
        let d = parseInt(offset / 60 / 60 / 24);
        let h = parseInt(offset / 60 / 60 % 24);
        let f = parseInt(offset / 60 % 60);
        let s = parseInt(offset % 60);
        let res = "";
        if (d != 0) {
            res = d + "天";
        } else {
            if (h != 0) {
                res = h + "小时"
            } else {
                if (f != 0) {
                    res = f + "分钟"
                } else {
                    res = s + "秒"
                }
            }
        }
        res += "前";
        return res;
    }
    getforum = async (catid) => {
        let { forumList } = this.props;
        let curFlist = forumList.filter(item => item.catid == catid)[0];
        if (curFlist) {
            this.setState({
                flist: curFlist.flist
            })
        } else {
            this.setState({
                loading: true
            })
            let { data:{data}  } = await local.get('/home/forumlist/', {
                page: 0,
                catid
            })
            data.map(item => {
                item.created_at = this.getTime(item.created_at);
            })

            let fdata = {};
            fdata.catid = catid;
            fdata.flist = data;
            this.props.dispatch({ type: 'ADD_FORUMLIST', payload: fdata });

            this.setState({
                flist: data,
                loading: false
            })
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll, true);
        // this.getmsg(this.state.fname);
        this.getforum(0);
    }
    componentWillUnmount() {
        this.setState = (this.state, callback => {
            return;
        })
    }
    //一级菜单获取值
    callback = key => {
        if (key == 1) {
            this.setState({
                catid: 0
            })
        } else {

        }
    }
    //二级菜单获取值
    getDatalist = e => {
        this.setState({
            catid: e.target.value
        });
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.catid != this.state.catid) {
            this.getforum(this.state.catid);
            let catid = this.state.catid;
            this.props.dispatch({ type: 'CHANGE_CATID', payload: catid });
        }
    }
    //滚动监听
    handleScroll = () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 230) {
            this.setState({
                menuStyle: { position: "fixed" },
                menuwrapStyle:{height:76}
            })
        } else {
            this.setState({
                menuStyle: { position: "static" },
                menuwrapStyle:{height:'auto'}
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
        let { loading, forumMenu, menuStyle, forumListStyle, flist ,menuwrapStyle} = this.state;
        return (
            <div className="container-forumMenu" >
                <StickyContainer >
                    <Tabs defaultActiveKey="1"
                        onChange={this.callback}
                        renderTabBar={this.renderTabBar}
                        style={menuwrapStyle}
                    >
                        {forumMenu.map((item, i) => {
                            return (
                                <TabPane tab={item.first} key={i + 1} 
                                style={menuStyle}
                                >
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
                                                        <Radio.Button value={val.id} key={val.id}>{val.text}</Radio.Button>
                                                    )
                                                })}

                                            </Radio.Group>
                                    }

                                </TabPane>
                            )
                        })}
                    </Tabs>
                </StickyContainer>
                <div className="forumListWrap" style={forumListStyle}>
                    {
                        loading ?
                            <Spin></Spin>
                            : <ForumList flist={flist} />
                    }
                    {/* <ForumList flist={flist} /> */}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(forumMenu);