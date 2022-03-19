import { Container } from "react-bootstrap";

function BasicLayout({ children }) {
  return (
    <div className="basic-layout">
      <Container>{children}</Container>
    </div>
  );
}

export { BasicLayout };
