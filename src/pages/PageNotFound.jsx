import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <img src="/page_not_found.svg" className="h-2/3 mb-3" />
      <h1 className="mb-3">Oops! We could not find this page.</h1>
      <Button
        onClick={()=> navigate('/')}
      >Return Home</Button>
    </div>
  )
}

export default PageNotFound