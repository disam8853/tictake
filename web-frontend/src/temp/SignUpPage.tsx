import React from 'react'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import  { signUp } from '../axios/index'


import { FormCheckType } from "react-bootstrap/esm/FormCheck"


import { history } from '../index'

export default function SignUpPage(


): JSX.Element {

    const handleSubmit = async (e:any) => {
        const form = e.currentTarget
        e.preventDefault()
        const user = {
            "first_name": form.first_name.value,
            "last_name": form.last_name.value,
            "email" : form.email.value,
            "password" : form.password.value,
        }

        await signUp(user)
    }    
    return (
    <div>
        <Container className="p-3" fluid={true}>
            <Row>
                <Col></Col>
                <Col></Col>
                <Col className="my-1 mb-3">
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="first_name">
                        <Form.Label>User First Name</Form.Label>
                        <Form.Control required size="sm" type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="last_name">
                        <Form.Label>User Last Name</Form.Label>
                        <Form.Control required size="sm" type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="email">
                        <Form.Label>User Email</Form.Label>
                        <Form.Control required size="sm" type="text" placeholder="" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                        <Form.Label>User Password</Form.Label>
                        <Form.Control required size="sm" type="password"  placeholder="" />
                        </Form.Group>

                        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                            <Button variant="primary" type="submit">sigin up</Button>
                     
                          
                        </div>
                        <div > <a href='/login'  style={{ }} >返回登入</a></div>
                       
                    </Form>
                    
                </Col>
                
                <Col></Col>
                <Col></Col>
            </Row>
        </Container>
    </div>
    )
}
    