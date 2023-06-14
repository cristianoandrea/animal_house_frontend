import styled from "styled-components";
import { mobile } from "../../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
border-radius: 50px;
background: #01bf71;
white-space: nowrap;
padding: 10px 22px;
color: #010606;
font-size: 16px;
outline: none;
border:none;
cursor:pointer;
transition: all 0.2s ease-in-out;
text-decoration: none;
&:hover {
    background: #fff;
    transition: all 0.2s ease-in-out;
    color: #010606;
}
`;

const CategoryItem = ({ item }) => {
  return (
    <Container >
      <Image src={item.image} />
      <Info>
        <Title>{item.nome}</Title>
        <Button>Cacc e sord pappòòò</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;