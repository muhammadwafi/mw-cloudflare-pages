import { Container } from 'reactstrap';

function Footer() {
  return (
    <footer className="mw-footer mt-auto">
      <Container fluid="sm" className="text-center">
        <div>Cloudflare pages - MW &copy; {new Date().getFullYear()}</div>
      </Container>
    </footer>
  )
}

export default Footer;
