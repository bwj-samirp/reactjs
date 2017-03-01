// external
import React from "react";

// internal
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class TabApp extends React.Component {

    /**
     * constructor
     * @param {object} props
     */
    constructor(props) {
        super(props);
        /**
         * @type {object}
         * @property {string} child app class
         */
        this.state = {
            contents: [{'name':"samir","address":'jp'}],
            inbox:[{'sender':"samir","subject":'hello sam'}],
            profile:[{'name':"samir","email":'sdfs@sdfsd.sjp'}],
        };
    }

    /**
     *
     * @param index
     * @param last
     */
    handleSelect(index, last) {

        console.log('Selected tab: ' + index + ', Last tab: ' + last);
    }

    render() {
        return (
            <Tabs
                onSelect={this.handleSelect.bind(this)}
                selectedIndex={0}
            >
                <TabList>
                    <Tab>Dashboard</Tab>
                    <Tab>Inbox</Tab>
                    <Tab>Profile</Tab>
                </TabList>
                <TabPanel>
                    <h2>
                        {this.state.contents.map((text, i) => {
                                return(
                                    <div>
                                        <div>{text.name}</div><div>{text.address}</div>
                                    </div>
                                )
                        })
                        }

                    </h2>
                </TabPanel>
                <TabPanel>
                    <h2>  {this.state.inbox.map((text, i) => {
                        return(
                            <div>
                                <div>{text.name}</div><div>{text.subject}</div>
                            </div>
                        )
                    })
                    }</h2>
                </TabPanel>
                <TabPanel>
                    <h2> {this.state.profile.map((text, i) => {
                        return(
                            <div>
                                <div>{text.name}</div><div>{text.email}</div>
                            </div>
                        )
                    })
                    }</h2>
                </TabPanel>
            </Tabs>
        );
    }
}

export default TabApp;