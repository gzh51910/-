import React, { Component } from 'react';
import { biyuan } from '../api';
// import pic from '../img/logo.png';
import { connect } from 'react-redux';
import '../css/mian.scss';
import { List, Avatar, Layout } from 'antd';
const { Header, Content } = Layout;


class mine extends Component {


    render() {


        // 列表
        const data = [
            '我的消息',
            '我的资产.',
            '我的论坛',
            '我的问答',
            '我的关注',
            '个人资料',
            '密码管理',
        ];
        return (
            <div className="minea">
                <Layout>
                    <Header style={{ background: '#ffc600', padding: 0 }} className="peoplepic">
                        <div className="peoplepicaa">  <Avatar size={64} icon="user" /></div>


                    </Header>
                    <Content className="listcontent">   <List
                        className="listmine"
                        size="small"
                        header={<div>18877293590</div>}

                        bordered
                        dataSource={data}
                        renderItem={item => <List.Item>{item}</List.Item>}
                    /></Content>

                </Layout>
            </div>


        )
    }

}

export default connect(

)(mine);