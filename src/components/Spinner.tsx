import ClipLoader from "react-spinners/ClipLoader";

type SpinnerProps = {
    active: boolean,
    children: React.ReactNode
}

export const Spinner = ({ active, children }: SpinnerProps) => {
  return (
      <>
        {active?
            <div className="container-spinner">
                <ClipLoader color="red" size={100}/>
            </div>
        : children    
        }
      </>
  )
}
