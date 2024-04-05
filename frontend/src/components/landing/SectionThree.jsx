
const SectionThree = ({ rtl = false, data }) => {
    return (
        <section className='landing grid grid-cols-12 md:gap-10'>
          <div className={`${rtl ? 'order-2' : ''} grid grid-cols-12 gap-4 col-span-12 md:col-span-6 lg:col-span-5`}>
            <div className={`${rtl ? 'order-2' : ''} h-[380px] lg:h-[450px] col-span-7`}>
              <img className='h-full' src={data.imgUrl1} alt="img" />
            </div>
            <div className="grid grid-flow-row col-span-5 gap-6">
              <img className='h-[80%] w-full mt-auto' src={data.imgUrl2} alt="img" />
              <img className='h-[80%] w-full' src={data.imgUrl3} alt="img" />
            </div>
          </div>
          <div className='col-span-12 md:col-span-6 lg:col-span-7 flex flex-col gap-4 mb-10 md:mb-0 justify-center'>
            <div className="title">{data.span}</div>
            <h2 className='font-semibold text-xl md:text-xl lg:text-2xl'>{data.title}</h2>
            <p className='text-secondary text-base md:text-sm lg:text-lg'>{data.desc}</p>
            
          </div>
        </section>
      );

}
export default SectionThree ;