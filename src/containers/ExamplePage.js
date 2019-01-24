import React from 'react';
import {
  Carousel,
  MenuItem,
  Nav,
  NavDropdown,
  NavItem,
  Navbar,
} from 'react-bootstrap';
import styled from 'styled-components';

const CarouselWrap = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const ExamplePage = () => (
  <React.Fragment>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Example App
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
          <NavItem href="#">
            Example Link
          </NavItem>
          <NavItem href="#">
            Example Link
          </NavItem>
          <NavDropdown title="Example Dropdown" id="example-dropdown">
            <MenuItem>Item #1</MenuItem>
            <MenuItem>Item #2</MenuItem>
            <MenuItem>Item #3</MenuItem>
            <MenuItem>Item #4</MenuItem>
          </NavDropdown>
        </Nav>
    </Navbar>
    <CarouselWrap>
      <Carousel>
        <Carousel.Item>
          <img width={500} height={500} alt="First Kitten" src="https://placekitten.com/500/500" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={500} alt="Second kitten" src="https://placekitten.com/502/501" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={500} height={500} alt="Third kitten" src="https://placekitten.com/500/502" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </CarouselWrap>
  </React.Fragment>
);

export default ExamplePage;
