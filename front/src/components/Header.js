import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">PLANIUM</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/plans">Planos</Nav.Link>
            <Nav.Link href="/prices">Preços</Nav.Link>
            <Nav.Link href="/beneficiaries">Beneficiários</Nav.Link>
            <Nav.Link href="/addbeneficiaries">Adicionar beneficiários</Nav.Link>
            <Nav.Link href="/proposals">Propostas</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Header;