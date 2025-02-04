import './App.css'
import Home from "./pages/Home"
import styled from 'styled-components';



function App() {

  return (
    <Container>
     <Home />
    </Container>
  )
}

export default App

const Container = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items: center;
    justify-content: center;
`