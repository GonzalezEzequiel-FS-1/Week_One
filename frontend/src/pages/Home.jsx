import styled from "styled-components";
import { useState } from "react";

export default function Home() {
    const [number, setNumber] = useState("");
    const [obscuredNumber, setObscuredNumber] = useState("");
    const [error, setError] = useState("");

    const formatInput = (value) => {
        let cleaned = value.replace(/\D/g, "");
        let formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1-");
        return formatted;
    };

    const handleChange = (e) => {
        const formatted = formatInput(e.target.value);
        setNumber(formatted);
    };

    const printNumber = (e) => {
        e.preventDefault();
        const numberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
        const correctFormat = numberPattern.test(number);

        if (correctFormat) {

            let obscured = number
                .slice(0, 15)
                .replace(/\d{4}(?=-)/g, "••••") +
                number.slice(15);
            setObscuredNumber(obscured);
            setError("");
        } else {
            setObscuredNumber("");
            setError("Pattern does not match");
        }
    };

    return (
        <Container>
            <FormContainer onSubmit={printNumber}>
                <Text>Type your Credit Card Number</Text>
                <StyledInput
                    pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                    title="Enter a 16-digit number in this format: xxxx-xxxx-xxxx-xxxx"
                    type="text"
                    inputMode="numeric"
                    maxLength={19}
                    value={number}
                    placeholder="xxxx-xxxx-xxxx-xxxx"
                    onChange={handleChange}
                />
                <StyledButton type="submit">Submit</StyledButton>
            </FormContainer>
           
            {obscuredNumber && <SuccessMessage>Obscured Number: {obscuredNumber}</SuccessMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1e1e1e;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const StyledInput = styled.input`
  text-align: center;
  width: 280px;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background: #333;
  color: #ffffff;
  outline: none;
  transition: border 0.3s ease;

  &:focus {
    border: 2px solid #4caf50;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background: #4caf50;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  color: #4caf50;
  margin-top: 1rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #4caf50;
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: #ff4d4d;
  margin-top: 1rem;
`;
