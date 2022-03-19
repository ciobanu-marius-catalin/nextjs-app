import { Col } from "react-bootstrap";

function CrudItemElement({ item }) {
  const { id, title, body } = item;
  let imgUrl = `https://picsum.photos/286/180?random${id}`;
  return (
    <Col xs={12} md={6} lg={3} className="mb-4">
      <div className="card">
        <img src={imgUrl} alt="crud-item" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{body}</p>
          <a href="/" className="btn btn-primary">
            Read more
          </a>
        </div>
      </div>
    </Col>
  );
}

export { CrudItemElement };
