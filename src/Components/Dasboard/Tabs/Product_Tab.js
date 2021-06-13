import React from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import { FormControl, OutlinedInput, InputAdornment, InputLabel } from '@material-ui/core'
import BuildIcon from '@material-ui/icons/Build';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import ListAltIcon from '@material-ui/icons/ListAlt';

const Product_Tab = ({OnChange}) => {
    return (
        <React.Fragment>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className='m-0 tab-panel'>
                    <Col sm={4} className='p-0'>
                        <Nav variant="tabs" className="flex-column tabs" >
                            <Nav.Item className='tab'>
                                <Nav.Link eventKey="first"><BuildIcon fontSize='small' className='mr-2 text-dark' />General</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='tab'>
                                <Nav.Link eventKey="second"><LoyaltyIcon fontSize='small' className='mr-2 text-dark' />Inventory</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='tab'>
                                <Nav.Link eventKey="third"><LocalMallIcon fontSize='small' className='mr-2 text-dark' />Shopping</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='tab'>
                                <Nav.Link eventKey="fourth"><InsertLinkIcon fontSize='small' className='mr-2 text-dark' />Linked Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='tab'>
                                <Nav.Link eventKey="fifth"><ListAltIcon fontSize='small' className='mr-2 text-dark' />Attribute</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={8} className='d-flex justify-content-center align-items-center'>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <div className='general'>
                                  
                                    <FormControl fullWidth required variant="outlined">
                                        <InputLabel htmlFor="regularPrice">Regular Price</InputLabel>
                                        <OutlinedInput
                                            onChange={OnChange}
                                            id="regularPrice"
                                            name='regularPrice'
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            labelWidth={105}
                                        />
                                    </FormControl>
                                    <FormControl required fullWidth variant="outlined" className='mt-3'>
                                        <InputLabel htmlFor="regularPrice">Sale Price</InputLabel>
                                        <OutlinedInput
                                            onChange={OnChange}
                                            id="salePrice"
                                            name='salePrice'
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            labelWidth={90}
                                        />
                                    </FormControl>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                            </Tab.Pane>
                            <Tab.Pane eventKey="fifth">
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </React.Fragment>
    )
}

export default Product_Tab;