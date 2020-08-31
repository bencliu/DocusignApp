import React, { Component } from 'react';
import axios from 'axios';
import { Button, Divider } from '@material-ui/core';

class ButtonBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            versionNumber: 2
        }
    }

    handleFirstRequest = () => {
        axios.get('/first')
            .then(res => {
                let data = res.data;
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSecondRequest = () => {
        axios.get('/second')
            .then(res => {
                let data = res.data;
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleThirdRequest = () => {
        axios.get('/third')
            .then(res => {
                let data = res.data;
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div>
                <div>
                    <Button variant="contained" color="primary" onClick = {() => this.handleFirstRequest()}>
                        Docusign Email Request
                    </Button>
                </div>
                <Divider/>
                <div>
                    <Button variant="contained" color="primary" onClick = {() => this.handleSecondRequest()}>
                        Docusign Bulk Signature
                    </Button>
                </div>
                <Divider/>
                <div>
                    <Button variant="contained" color="primary" onClick = {() => this.handleThirdRequest()}>
                        Docusign Retrieve File
                    </Button>
                </div>
            </div>
        )
    }
}

export default ButtonBar;
