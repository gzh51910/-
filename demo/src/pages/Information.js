import React, { Component } from "react";
import IfmTabs from "@@/IfmTabs";

import IfmTabsData from "../api/IfmTabsData";

class Information extends Component {
    state = {
        tabs: []
    };

    async componentDidMount() {
        let { data } = IfmTabsData;
        data.map(item => (item.title = item.name));

        let all = { title: "全部", id: 0 };
        this.setState({
            tabs: [all, ...data]
        });
    }

    render() {
        let { tabs } = this.state;
        return (
            <div>
                <IfmTabs tabs={tabs} {...this.props} />
            </div>
        );
    }
}

export default Information;
