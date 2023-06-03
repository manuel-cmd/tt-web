import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { COLORS } from '../../../../constants/colors'

const SearchBar = () => {
  const [busqueda, setBusqueda] = useState("")
  return (
    <Container fluid style={{ background: `${COLORS.PRIMARIO}`, height: "200px" }} className='d-flex flex-column justify-content-center align-items-center'>
      <Col className='d-flex justify-content-center align-items-center' style={{ flexGrow: 0 }}>
        <h1 style={{ color: "white" }}>Busqueda</h1>
      </Col>

      <Col className='d-flex justify-content-center align-items-center' style={{ flexGrow: 0 }}>
        <input type="text" value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{ width: "80%", height: "50px", fontSize: 25 }} />
      </Col>

    </Container>
  )
}

export default SearchBar