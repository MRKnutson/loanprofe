import { Card, Navbar } from "react-bootstrap";
import styled from "styled-components";

export const PrimaryColor = "#2A3950";
export const SecondaryColor = "#3E619B";
export const ActionColor = "#EF4B4C";
export const HighlightColor = "#6C63FF";

export const GraphCard = styled(Card)`
  width: 100%;
  margin: 1rem;
  color: white;
  border-radius: 0.75rem;
  background-color: ${SecondaryColor};
  margin-bottom: 3rem;
`;

export const StatText = styled(Card.Text)`
  padding: 10px;
`;

//used in navbar
export const LoanproNavbar = styled(Navbar)`
  background-color: ${PrimaryColor};
  height: 5rem;
`;

export const LoanproButton = styled.button`
  color: white;
  background-color: ${ActionColor};
  border: none;
  border-radius: 0.2rem;
  padding: 0.5rem;
  font-weight: 700;
  &:hover {
    background-color: ${SecondaryColor};
  }
`;

export const SmallButton = styled.button`
  margin-top: 0.5rem;
  height: 2.5rem;
  color: white;
  background-color: ${ActionColor};
  border: none;
  font-weight: 700;
  border-radius: 0.2rem;
  &:hover {
    background-color: ${SecondaryColor};
  }
`;

export const LoanproHeader = styled.h1`
  color: white;
  font-weight: 700;
`;
