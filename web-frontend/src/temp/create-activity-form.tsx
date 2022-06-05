import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
// import Button from 'react-bootstrap/Button'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import axios from 'axios'
import  { createActivity } from '../axios/index'

import { FormCheckType } from "react-bootstrap/esm/FormCheck"
import { history } from '../index'


export default function createActivityModal(


): JSX.Element {
    const handleSubmit = async (e:any) => {
        const form = e.currentTarget
        e.preventDefault()
        const activity = {
            "activityName" : form.activityName.value,
            "activityInfo" : form.activityInfo.value,
            "activityStartDate" : form.activityStartDate.value,
            "activityStartTime" : form.activityStartTime.value,
            "activityEndDate" : form.activityEndDate.value,
            "activityEndTime" : form.activityEndTime.value,
            "totalInventory" : form.totalInventory.value
         }        
        console.log(activity)
        await createActivity(activity)
    }    

    return (
   




        <Card 
        
        // style={{"width": "800px"}}
        >
        <Container className="p-3" fluid={true}>
             
        <Row>
            <Col></Col>
            <Col></Col>
            <Col className="my-1 mb-3">
                <Form onSubmit={handleSubmit} >
                    <Form.Group className="mb-3" controlId="activityName">
                        <Form.Label>活動名稱</Form.Label>
                        <Form.Control required size="sm" type="text" placeholder="" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="activityInfo">
                        <Form.Label>活動資訊</Form.Label>
                        <Form.Control required as="textarea" rows={8}  placeholder=""/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="activityStartDate">
                        <Form.Label>購票開始日期</Form.Label>
                        <Form.Control  required type="date"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="activityStartTime">
                        <Form.Label>購票開始時間</Form.Label>
                        <Form.Control  required type="time"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="activityEndDate">
                        <Form.Label>購票結束日期</Form.Label>
                        <Form.Control  required type="date"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="activityEndTime">
                        <Form.Label>購票結束時間</Form.Label>
                        <Form.Control  type="time"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="totalInventory">
                        <Form.Label>活動人數</Form.Label>
                        <Form.Control  type="number"/>
                    </Form.Group>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <Button  type="submit" >Create</Button>
                    </div>
                    
                </Form>
                
            </Col>
            
            <Col></Col>
            <Col></Col>
        </Row>
    </Container>
    </Card>
    )
}
    