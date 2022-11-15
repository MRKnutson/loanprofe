import { useState } from "react";
import { Button, Container, Dropdown, Form } from "react-bootstrap";
import api from "../api/api";
import ErrorToast from "../components/ErrorToast";
import { OperationSelector } from "../helpers/Constants";

const Operation = () => {
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [firstOperand, setFirstOperand] = useState(null);
  const [secondOperand, setSeconOperand] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [response, setResponse] = useState(null);
  const [balance, setBalance] = useState(null);

  const handleOperationSelect = (operation) => {
    setSelectedOperation(operation);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      (isNaN(firstOperand) && firstOperand != null) ||
      (isNaN(secondOperand) && secondOperand != null)
    ) {
      setShowToast(true);
    } else {
      createRecord();
    }
  };

  const createRecord = async () => {
    try {
      let token = localStorage.getItem("token");
      let user = localStorage.getItem("user");
      let firstNumber = firstOperand ? parseFloat(firstOperand) : 0;
      let secondNumber = secondOperand ? parseFloat(secondOperand) : 0;
      let response = await api.post(
        `/${user}/${selectedOperation}/records`,
        {
          firstnumber: firstNumber,
          secondnumber: secondNumber,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponse(response.data.operationresponse);
      setBalance(response.data.userbalance);
    } catch (err) {
      console.log(response);
      alert(err.response.data.errors.full_messages);
    }
  };

  return (
    <Container style={{ paddingTop: "2.5rem" }}>
      <ErrorToast showToast={showToast} setShowToast={setShowToast} />
      <Form onSubmit={handleOnSubmit}>
        <Dropdown style={{ paddingBottom: "2.5rem" }}>
          <Dropdown.Toggle variant="info" id="operation-dropdown">
            Operation Type
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleOperationSelect(1)}>
              Addition
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOperationSelect(2)}>
              Subtraction
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOperationSelect(3)}>
              Multiplication
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOperationSelect(4)}>
              Division
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOperationSelect(5)}>
              Square Root
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleOperationSelect(6)}>
              Random String
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {selectedOperation && (
          <div>
            <p>Operation:</p>
            <p
              style={{
                padding: "0.5rem",
                border: "0.5px solid grey",
                borderRadius: "0.2rem",
              }}
            >
              {OperationSelector[selectedOperation]}
            </p>
          </div>
        )}
        <Form.Group className="mb-3" controlId="formFirstNum">
          <Form.Label>First Operand</Form.Label>
          <Form.Control
            type="int"
            placeholder="Enter First Number"
            disabled={!selectedOperation || selectedOperation === 6}
            value={firstOperand}
            onChange={(e) => setFirstOperand(e.target.value)}
          />
          {!selectedOperation && (
            <Form.Text style={{ color: "red" }}>
              Please select an operation first.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSecondNum">
          <Form.Label>Second Operand</Form.Label>
          <Form.Control
            type="int"
            placeholder="Enter Second Number"
            disabled={!selectedOperation || selectedOperation > 4}
            value={secondOperand}
            onChange={(e) => setSeconOperand(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ marginTop: "2.5rem" }}
          disabled={!selectedOperation}
        >
          Submit
        </Button>
      </Form>
      {response && (
        <div>
          <p style={{ marginTop: "2rem" }}>Operation Response:</p>
          <p
            style={{
              padding: "0.5rem",
              border: "0.5px solid grey",
              borderRadius: "0.2rem",
            }}
          >
            {response}
          </p>
        </div>
      )}
      {balance && (
        <div>
          <p>Remaining Balance:</p>
          <p
            style={{
              padding: "0.5rem",
              border: "0.5px solid grey",
              borderRadius: "0.2rem",
            }}
          >
            $ {balance}
          </p>
        </div>
      )}
    </Container>
  );
};

export default Operation;
