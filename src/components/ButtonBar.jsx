import React, { Component } from 'react';
import axios from 'axios';
import { Button, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// The `withStyles()` higher-order component is injecting a `classes`
// prop that is used by the `Button` component.
const styles = () => ({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        margin: 30
    },
    label: {
    textTransform: 'capitalize',
    }
});

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
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Button className={classes.root} variant="contained" color="primary" onClick = {() => this.handleFirstRequest()}>
                        Docusign Email Request
                    </Button>
                </div>
                <Divider/>
                <div>
                    <Button className={classes.root} variant="contained" color="primary" onClick = {() => this.handleSecondRequest()}>
                        Docusign Bulk Signature
                    </Button>
                </div>
                <Divider/>
                <div>
                    <Button className={classes.root} variant="contained" color="primary" onClick = {() => this.handleThirdRequest()}>
                        Docusign Retrieve File
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(ButtonBar);
