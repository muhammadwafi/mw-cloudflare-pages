import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from 'reactstrap';
import ContentLoader from "react-content-loader"


function PostsLoader({ small, ...props }) {

  if (small) {
    return (
      <Card className="mb-2 card-horizontal">
        <CardBody className="p-2">
          <ContentLoader 
            speed={1}
            width={188}
            height={50}
            viewBox="0 0 188 50"
            backgroundColor="#d5d8e2"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="60" y="11" rx="3" ry="3" width="125" height="10" /> 
            <rect x="4" y="4" rx="9" ry="9" width="44" height="44" /> 
            <rect x="60" y="34" rx="3" ry="3" width="81" height="7" />
          </ContentLoader>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="card-posts">
      <CardHeader>
        <div className="align-items-center d-flex">
          <ContentLoader 
            speed={1}
            width={135}
            height={42}
            viewBox="0 0 135 42"
            backgroundColor="#d5d8e2"
            foregroundColor="#ecebeb"
            {...props}
          >
            <rect x="51" y="25" rx="0" ry="0" width="52" height="6" /> 
            <circle cx="20" cy="20" r="20" /> 
            <rect x="50" y="9" rx="3" ry="3" width="79" height="9" />
          </ContentLoader>
        </div>
      </CardHeader>
      <CardBody>
        <ContentLoader 
          speed={1}
          width={300}
          height={78}
          viewBox="0 0 300 78"
          backgroundColor="#d5d8e2"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="3" y="1" rx="3" ry="3" width="286" height="11" /> 
          <rect x="4" y="31" rx="3" ry="3" width="264" height="11" /> 
          <rect x="3" y="62" rx="3" ry="3" width="124" height="11" />
        </ContentLoader>
      </CardBody>
      <CardFooter>
        <ContentLoader 
          speed={1}
          width={125}
          height={18}
          viewBox="0 0 125 18"
          backgroundColor="#d5d8e2"
          foregroundColor="#ecebeb"
          {...props}
        >
          <rect x="66" y="6" rx="2" ry="2" width="58" height="10" /> 
          <rect x="7" y="6" rx="2" ry="2" width="48" height="10" />
        </ContentLoader>
      </CardFooter>
    </Card>
  )
}

export default PostsLoader
