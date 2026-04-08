import error from "../../public/404.jpg"
import Image from "next/image"
const not_found = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
       <Image
       src={error}
       alt="no encontrado"
       width={500}
       height={500}
       />
  </div>
  )
}

export default not_found