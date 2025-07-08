import { Search, ShoppingCartOutlined, FavoriteBorder } from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux";

// Styled Components
const Container = styled.div`
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  ${mobile({ height: "60px" })}
`;

const Wrapper = styled.div`
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 15px", flexDirection: "column", gap: "10px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 28px;
  color: #00796b;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    color: #004d40;
  }
  ${mobile({ fontSize: "22px" })}
`;

const Center = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  ${mobile({ width: "100%", justifyContent: "center" })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f1f3f4;
  padding: 8px 16px;
  border-radius: 25px;
  box-shadow: inset 0 0 0 1px #ddd;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 400px;

  &:focus-within {
    box-shadow: 0 0 0 2px #00796b;
    background-color: #ffffff;
  }

  ${mobile({ maxWidth: "90%" })}
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  width: 100%;
  color: #333;

  &::placeholder {
    color: #999;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flexWrap: "wrap", justifyContent: "center", gap: "10px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: #333;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #00796b;
    transform: scale(1.05);
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:root");
    navigate("/");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products/${searchTerm.toLowerCase()}`);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          
        </Left>

        <Center>
          {/* <SearchContainer>
            <Input
              placeholder="Search category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Search
              style={{ color: "#00796b", fontSize: 22, cursor: "pointer" }}
              onClick={handleSearch}
            />
          </SearchContainer> */}
          <StyledLink to="/">
            <Logo>AgroTrade</Logo>
          </StyledLink>
        </Center>

        <Right>
          {!user ? (
            <>
              <StyledLink to="/register">
                <MenuItem>REGISTER</MenuItem>
              </StyledLink>
              <StyledLink to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </StyledLink>
            </>
          ) : (
            <>
              <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
              <StyledLink to="/orders">
                <MenuItem>MY ORDERS</MenuItem>
              </StyledLink>
              <StyledLink to="/wishlist">
                <MenuItem>
                  <FavoriteBorder />
                </MenuItem>
              </StyledLink>
              <StyledLink to="/cart">
                <MenuItem>
                  <ShoppingCartOutlined />
                </MenuItem>
              </StyledLink>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;