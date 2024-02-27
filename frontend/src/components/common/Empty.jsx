
const Empty = ({msg}) => {
  return (
    <div className="flex w-full justify-center flex-col items-center p-8">
      <img className="md:w-[60%] lg:w-[40%] xl:w-[25%]" src="/empty.svg" alt="no-data-found" />
      <span className="text-lg my-5">{msg}</span>
    </div>
  )
}

export default Empty