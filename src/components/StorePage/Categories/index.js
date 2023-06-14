import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../../responsive";
import CategoryItem from "../CategoryItems";


const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}
`;

const Categories = ({data}) => {

  return (
    <Container >
       {data.data.map((item) => (
        <CategoryItem item={item} />
      ))}
    </Container>
  );
};

export default Categories;