import {
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap';
import { Link } from 'react-router-dom';


function CardHorizontal({ item }) {  
  return (
    <Link className="posts-wrapper" to={`/posts/${item.slug}`} tabIndex="0">
      <Card className="mb-2 card-horizontal h-100">
        <Row className="g-0">
          {item?.image && (
            <Col xs="2">
              <div className="card-img-wrapper">
                <img src={item.image.url} className="card-img" alt={item.image.filename} />
              </div>
            </Col>
          )}
          <Col xs="10">
            <CardBody>
              <div className="card-title">{item?.title}</div>
              <small className="text-muted d-flex align-items-center">
                <span className="me-1">{item?.votes ? item.votes : 0} votes</span>
              </small>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default CardHorizontal
