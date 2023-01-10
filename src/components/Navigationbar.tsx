import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";

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
				<Button
					style={{ width: "3rem", height: "3rem", position: "relative" }}
					variant="outline-primary"
					className="rounded-circle"
				>
					<BsFillCartFill />
				</Button>
			</Container>
		</Navbar>
	);
};

export default Navigationbar;
