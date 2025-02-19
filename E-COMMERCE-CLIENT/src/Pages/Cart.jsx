import styled from "styled-components"
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { Button } from "@mui/material";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest} from "../requestMethods";
import { Link, useNavigate } from 'react-router-dom';
import {  addProd, removeProd, removeProduct } from '../redux/cartRedux';

const KEY = import.meta.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
padding: 20px;
${mobile({padding: "10px"})}
`;

const Title = styled.h1`
font-weight: 300;
text-align: center;
`;

const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 20px;
`;

const TopButton = styled.button`
padding: 10px;
font-weight: 600;
cursor: pointer;
border: ${props=>props.type === "filled" && "none"};
background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
color: ${props=>props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
${mobile({display: "none"})}
`;

const TopText = styled.span`
text-decoration: underline;
cursor: pointer;
margin: 0px 10px;
`;

 const Bottom = styled.div`
 display: flex;
 justify-content: space-between;
 ${mobile({flexDirection: "column"})}
 `;

 const Info = styled.div`
 flex:3;
 `;

 const Product = styled.div`
 display: flex;
 justify-content:space-between ;
 ${mobile({flexDirection: "column"})}
 `;

const ProductDetail = styled.div`
 flex:2;
 display: flex;
`;

const Image = styled.img`
 width: 200px;
 `;

const Details = styled.div`
 padding: 20px;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
`;

const ProductName = styled.div`
 
 `;

const ProductId = styled.span`
 
`;

const ProductColor = styled.div`
 width: 20px;height: 20px;
 border-radius: 50%;
 background-color: ${props=>props.color};
 `;

const ProductSize = styled.span`
 
`;

const PriceDetail = styled.span`
 flex:1;
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 `;

const ProductAmountContainer = styled.div`
 display: flex;
 align-items: center;
 margin-bottom: 20px;
`;

const ProductAmount = styled.div`
 font-size: 24px;
 margin: 5px;
 ${mobile({margin: "5px 15px"})}
`;

const ProductPrice = styled.div`
 font-size: 30px;
 font-weight: 200;
 ${mobile({marginBottom: "20px"})}

`;

const Hr = styled.hr`
background-color: #eee;
border:none;
height: 1px;
`;

 const Summary = styled.div`
 flex: 1;
 border: 0.5px solid lightgray;
 border-radius: 10px;
 padding: 20px;
 height: 50vh;
 `;

 const SummaryTitle = styled.h1`
 font-weight: 200;
 
 `;

const SummaryItem = styled.div`
 margin: 30px 0px;
 display: flex;
 justify-content: space-between;
 font-weight: ${props=>props.type === "total"  && "500"};
 font-size: ${props=>props.type === "total"  && "24px"};

`;

const SummaryItemText = styled.span`
 
 `;

const SummaryItemPrice = styled.span`
 
`;

const CheckoutButton = styled.button`
 width: 100%;
 padding: 10px;
 background-color: black;
 color: white;
 font-weight: 600;
 `;

const DeleteButton = styled.button`
background: red;
color: white;
border: none;
cursor: pointer;
padding: 5px 10px;
border-radius: 5px;
font-size: 14px;
align-self: center;
margin-left: 10px;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [stripeToken, setStripeToken] = useState(null);
  //const history = useHistory();
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total* 100,
          
        });
        navigate("/success",{
          //data:res.data
          stripeData: res.data,
          products: cart,
        });
      } catch {}
    };
    stripeToken && cart.total >=1 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleAddQuantity = (product) => {
    dispatch(addProd({ _id: product._id, price: product.price, size: product.size }));
  };

  const handleRemoveQuantity = (product) => {
    dispatch(removeProd({ _id: product._id, price: product.price, size: product.size }));
  };

  const handleDelete = (product) => {
    dispatch(removeProduct({ _id: product._id, size: product.size }));
  };


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
            <Link to="/"> <TopButton>CONTINUE SHOPPING</TopButton> </Link>
            <TopTexts>
                <TopText>Shopping Bag({cart.products.length})</TopText>
                <TopText>Your Wishlist(0)</TopText>
            </TopTexts>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
         <Bottom>
            <Info>
             {cart.products && cart.products.length > 0 ? (cart.products.map((product) => (
              <Product>
              <ProductDetail>
                <Image src={product.img}/>
                <Details>
                  <ProductName><b>Product:</b> {product.title}</ProductName>
                  <ProductId><b>ID:</b> {product._id}</ProductId>
                  <ProductColor color={product.color}></ProductColor>
                  <ProductSize><b>Size:</b> {product.size}</ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add onClick={()=>handleAddQuantity(product)}/>
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <Remove onClick={()=>handleRemoveQuantity(product)}/>
                </ProductAmountContainer>
                <ProductPrice>₹ {product.price*product.quantity}</ProductPrice>
                <DeleteButton onClick={() => handleDelete(product)}>DELETE</DeleteButton>
              </PriceDetail>
             </Product>
             ))): (<p>Your cart is empty.</p>)}
             <Hr />
             
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>{cart.total}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice>₹ 100</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>₹ -100</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type  = "total">
                <SummaryItemText >Total</SummaryItemText>
                <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
              </SummaryItem>
              <StripeCheckout 
              name = "Fasshion"
              image= "https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is ${cart.total}`}
              amount= {cart.total*100}
              token={onToken}
              stripeKey="pk_test_51P4dmWSHfw5yBVnYdr1H5xzpvyfOVZuAekS9TuG0t7kQU4SGuMaG6AtqXye4HsJjrzWj5rk1uECdMXlTch7SjcwS00gr0SkLT8"

              > 
              <CheckoutButton>CHECKOUT NOW</CheckoutButton>
              </StripeCheckout>
            </Summary>
        </Bottom> 
      </Wrapper>
     <Footer />  
    </Container>
  )
}

export default Cart;
