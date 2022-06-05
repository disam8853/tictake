import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import  { login } from '../axios/index'
import axios from 'axios'


import { FormCheckType } from "react-bootstrap/esm/FormCheck"


import { history } from '../index'

export default function LoginPage(
  
): JSX.Element {
    const handleSubmit = async (e:any) => {
        const form = e.currentTarget
        e.preventDefault()
        const user = {
            "email" : form.email.value,
            "password" : form.password.value,
        }
        console.log(user)
        await login(user)
      }    
    return (
    <div>
        <Container className="p-3" fluid={true}>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col className="my-1 mb-3">
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="email">
                        <Form.Label>User Email</Form.Label>
                        <Form.Control required size="sm" type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                        <Form.Label>User Password</Form.Label>
                        <Form.Control required size="sm" type="password"  placeholder="" />
                        </Form.Group>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                            <Button variant="primary" type="submit" >login</Button>
                        </div>
                        
                    </Form>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <Button variant="primary" type="submit" onClick={()=> {
                            history.push('./sign-up')
                    }}>sigin up</Button>
                    </div>
                </Col>
                
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    </div>
    )
}
    