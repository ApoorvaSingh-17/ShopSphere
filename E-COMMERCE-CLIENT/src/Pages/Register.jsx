
import styled from "styled-components"
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
width: 100vw;
height: 100vh;
background: linear-gradient(
    rgba(255,255,255,0.5),
    rgba(255,255,255,0.5)
),
url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") center;
background-size: cover;
display: flex;
align-items: center;
justify-content: center;
`;

const Wrapper = styled.div`
 padding: 20px;
 width: 40%;
 background-color: white;
 ${mobile({width: "75%"})}
`;

const Title = styled.h1`
font-size: 24px;
font-weight: 300;
`;

const Form = styled.form`
display: flex;
flex-wrap: wrap;
`;

const Input = styled.input`
flex:1;
min-width: 40%;
margin: 20px 20px 0px 0px;
padding: 10px;
`;



const Agreement = styled.span`
font-size: 12px;
margin: 20px 0px;
`;

const Button = styled.button`
width: 40%;
border: none;
padding: 15px 20px;
background-color: teal;
color: white;
cursor: pointer;
`;



const Register = () => {
  const navigate=useNavigate();
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit= async(e)=>{
    e.preventDefault();
    console.log("not register")
    const res = await axios.post("http://localhost:5000/api/auth/register", { name, username, password, email});
    if(res.status === 201){
      setPassword("");
      setUsername("");
      setEmail("");
      setName("");
      navigate("/login");
    }
  }

  return (
    <Container>
    <Wrapper>
    <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
            <Input placeholder="Name" name="name" value={name} onChange={(e) => (setName(e.target.value))}/>
            <Input placeholder="E-mail" name="email" value={email} onChange={(e) => (setEmail(e.target.value))} />
            <Input placeholder="Username" name="username" value={username} onChange={(e) => (setUsername(e.target.value))} />
            <Input placeholder="Password" name="password" type="password" value={password} onChange={(e) => (setPassword(e.target.value))} />
            <Input placeholder="Confirm Password" />
            
            <Agreement>By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button type="submit">CREATE</Button>
            
        </Form>
        <Link to="/">ALREADY A USER?</Link>
    </Wrapper>
      
    </Container>
  )
}

export default Register
