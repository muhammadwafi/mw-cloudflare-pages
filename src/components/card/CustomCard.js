import { useState } from 'react';
import {
  Card,
  CardBody,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import { MoreVertical } from 'lucide-react';
import DeleteModal from '../modals/DeleteModal';
import { Link } from 'react-router-dom';
import { trimText } from '../../utils/utils';


function CustomCard({ item, ...props }) {

  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleDropdown = () => setOpen(!isOpen);
  const handleOpenModal = () => setModalOpen(!isModalOpen);
  
  return (
    <>
      <Card className="custom-card" {...props}>
        <div className="card-img">
          <img src={item.image ? item.image.url : '/placeholder.png'} alt="Placeholder" />
        </div>
        {user && isAuthenticated && user.username === item.username && (
          <div className="card-action">
            <Dropdown isOpen={isOpen} toggle={handleDropdown}>
              <DropdownToggle color="icon" className="btn-link">
                <MoreVertical />
              </DropdownToggle>
              <DropdownMenu end>
                <div role="button" className="dropdown-item" onClick={handleOpenModal}>
                  Delete
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
        <CardBody>
          <Link className="posts-wrapper" to={`/posts/${item.slug}`}>
            <h4 className="card-title">{trimText(item.title, 80)}</h4>
          </Link>
          <div className="d-flex align-items-center">
            <small className="text-muted">{item?.votes || 0} votes</small>
            <div className="mx-1">&middot;</div>
            <small className="text-muted">
              {new Intl.DateTimeFormat("id", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(item.created_at))}
            </small>
          </div>
        </CardBody>
      </Card>
      <DeleteModal
        isModalOpen={isModalOpen}
        handleOpenModal={handleOpenModal}
        item={item}
      />
    </>
  );
}

export default CustomCard;
