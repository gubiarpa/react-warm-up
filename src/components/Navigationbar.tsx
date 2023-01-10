import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navigationbar = () => {
	return (
		<Navbar className="bg-white shadow-sm mb-3">
			<Container>
				<Nav>
					<Nav.Link to="/" as={NavLink}>
						Home
					</Nav.Link>
					<Nav.Link to="/store" as={NavLink}>
						Store
					</Nav.Link>
					<Nav.Link to="/about" as={NavLink}>
						About
					</Nav.Link>
				</Nav>
				<Button></Button>
			</Container>
		</Navbar>
	);
};

export default Navigationbar;
