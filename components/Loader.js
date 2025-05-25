import { ClipLoader } from 'react-spinners'

function Loader() {
  return (
    <div className="loader">
        <ClipLoader color="rgb(54, 215, 183)" size={60}/>
        <p className="loaderText"> در حال دریافت اطلاعات ...</p>
    </div>
  )
}

export default Loader

