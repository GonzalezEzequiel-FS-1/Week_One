import './App.css'
// import Home from "./pages/Home"
import styled from 'styled-components';
import Landing from './pages/Landing';



function App() {

  return (
    <Container>
     <Landing />
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