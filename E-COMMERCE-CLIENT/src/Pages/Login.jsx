import styled from "styled-components"
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
//import Register from "./Pages/Register";
import { Link } from "react-router-dom";

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
),
url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
 padding: 20px;
 width: 25%;
 background-color: white;
 ${mobile({width: "75%"})}
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;

const Form = styled.div`
display: flex;
flex-direction:column;
`;

const Input = styled.input`
flex:1;
min-width: 40%;
margin: 10px  0px;
padding: 10px;
`;

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
margin-bottom: 10px;
&:disabled{
  color : green;
  cursor: not-allowed;
}
`;

// const Link = styled.a`
// margin: 5px 0px;
// font-size: 12px;
// text-decoration: underline;
// cursor: pointer;
// `;

const Error = styled.span`
  color: red;
`;

export default function Login()  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const {isFetching, error} = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    setPassword("")
    setUsername("")
  };


  return (
    <Container>
        <Wrapper>
    <Title>SIGN IN</Title>
        <Form>
            
            <Input
             placeholder="Userame" name="username" value={username}
             onChange={(e) => setUsername(e.target.value)}
             />
            <Input 
             placeholder="Password" name="password"  type = "password" value={password}
             onChange={(e) => setPassword(e.target.value)}
             />
         
            {/* <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button> */}
            <Button onClick={handleClick}>LOGIN</Button>
            {/* {error && <Error>Something went wrong!!!</Error>}
            <Link>FORGOT PASSWORD ?</Link> */}
            <Link to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
    </Wrapper>
    </Container>
  )
}

//export default Login;
