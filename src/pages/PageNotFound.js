import { Card, CardBody, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as NotFoundImage } from "../assets/404.svg";

function PageNotFound() {
  const navigate = useNavigate()

  return (
    <Card className="p-5">
      <CardBody className="text-center">
        <div style={{
          maxWidth: '400px',
          margin: '1rem auto',
          width: '100%',
          display: 'block',
        }}>
          <NotFoundImage style={{ maxWidth: '100%' }}/>
        </div>
        <h2 className="py-3">Page not found</h2>
        <div className="mt-3">
          <Button color="default" onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default PageNotFound;