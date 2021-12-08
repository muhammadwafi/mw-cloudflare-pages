import {
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { ChevronLeft, ChevronRight } from 'lucide-react';


function PaginatePosts({
  items,
  page,
  setPage,
  ...props
}) {

  return (
    <Pagination listClassName="justify-content-center" {...props}>
      <PaginationItem
        disabled={items?.data?.prevPage ? false : true}
      >
        <PaginationLink
          onClick={() => setPage(page-1 || 1)}
        >
          <ChevronLeft/>
        </PaginationLink>
      </PaginationItem>
      {[...Array(items?.data?.totalPages)].map((_, i) =>
        <PaginationItem
          key={i+1}
          active={i+1 === page ? true : false}
        >
          <PaginationLink
            onClick={() => setPage(i+1)}
          >
            {i+1}
          </PaginationLink>
        </PaginationItem>
      )}
      <PaginationItem
        disabled={items?.data?.nextPage ? false : true}
      >
        <PaginationLink
          onClick={() => setPage(page+1)}
        >
          <ChevronRight/>
        </PaginationLink>
      </PaginationItem>
    </Pagination>
  )
}

export default PaginatePosts;
