import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { students } from './dummy_data';
import Table from 'react-bootstrap/Table';


export default function StundentForm() {
    const [validation, setValidation] = useState(false)
    const regRef = useRef(null);
    const dobRef = useRef(null);
    const [currentStudent, setCurrentStudent] = useState("")
    const [wrongRegNumber, setWrongRegNumber] = useState(false)
    const [wrongDob, setWrongDob] = useState(false)

    function registerinputHandler() {

        console.log(regRef.current.value);
    }
    // function dobInputHandler() {

    //     console.log(dobRef.current.value);
    // }



    function submitHandler(e) {
        e.preventDefault();

        students.forEach(student => {
            if (student.registerNumber == regRef.current.value) {
                if (student.dob == dobRef.current.value) {
                    setValidation(true)
                    setCurrentStudent(student)

                } else {
                    setWrongDob(true)
                }
            } else {
                setWrongRegNumber(true)
            }
        }

        )
    }

    return (
        <>
            {!validation && <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" style={{ width: "20rem" }} controlId="formBasicEmail">
                    <Form.Label>Register Number</Form.Label>
                    <Form.Control type="text" placeholder="Enter Register Number" ref={regRef} onChange={registerinputHandler} />
                    {wrongRegNumber && <Form.Text>Wrong Register Number</Form.Text>}

                </Form.Group>

                <Form.Group className="mb-3" style={{ width: "20rem" }} controlId="formBasicPassword">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="text" placeholder="dd/mm/yy" ref={dobRef} />
                    {wrongDob && <Form.Text>Wrong DOB</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>}

            {validation &&
                <>
                    <h1>Student Name: {currentStudent.name}</h1>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Mark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentStudent.marks.map(mark => (

                                <>
                                    <tr>
                                        <td>Malayalam</td>
                                        <td>{mark.malayalam}</td>
                                    </tr>
                                    <tr>
                                        <td>English</td>
                                        <td>{mark.english}</td>
                                    </tr>
                                    <tr>
                                        <td>Maths</td>
                                        <td>{mark.maths}</td>
                                    </tr>
                                    <tr>
                                        <td>Hindi</td>
                                        <td>{mark.hindi}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Mark</b></td>
                                        <td>{parseInt(mark.malayalam + mark.hindi + mark.english + mark.maths)}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Total Percentage</b></td>
                                        <td>{parseInt(mark.malayalam + mark.hindi + mark.english + mark.maths) * 100 / 400}%</td>
                                    </tr>

                                </>
                            ))}

                        </tbody>
                    </Table>
                    <Button variant="primary" onClick={() => setValidation(false)} > View Another Result  </Button>
                </>}

        </>
    )
}
