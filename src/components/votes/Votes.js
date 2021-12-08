import clsx from 'clsx';
import { Button } from 'reactstrap';
import { ThumbsUp, ThumbsDown } from 'lucide-react';


function Votes({
  handleOnVotes,
  count,
  isLoading,
  className,
  ...props
}) {

  const handleUpVotes = () => handleOnVotes(1)
  const handleDownVotes = () => handleOnVotes(-1)

  return (
    <div className={clsx("votes", className)} {...props}>
      <Button
        color="link"
        size="sm"
        onClick={handleUpVotes}
        className={clsx(isLoading ? "disabled" : "")}
      >
        <ThumbsUp/>
      </Button>
      <div className="counter">{count}</div>
      <Button
        color="link"
        size="sm"
        onClick={handleDownVotes}
        className={clsx(isLoading ? "disabled" : "")}
      >
        <ThumbsDown/>
      </Button>
    </div>
  )
}

export default Votes

