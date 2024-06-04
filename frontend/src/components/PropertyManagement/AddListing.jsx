import React, { useState } from 'react';
import { PiHouseLineLight, PiHouseLine, PiBuildingsLight, PiTentLight } from "react-icons/pi";
import { MdCabin, MdOutlineVilla, MdOutlineCabin } from "react-icons/md";
import { TbBuildingCottage } from "react-icons/tb";
import { useDropzone } from 'react-dropzone';

function AddListing() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [price, setPrice] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);



  const PropertyType = [
    {
      icon: <PiHouseLine size={18} />,
      property: "House"
    },
    {
      icon: <MdOutlineVilla size={18} />,
      property: "Villa"
    },
    {
      icon: <MdOutlineCabin size={18} />,
      property: "Cabin"
    },
    {
      icon: <PiBuildingsLight size={18} />,
      property: "Apartment"
    },
    {
      icon: <TbBuildingCottage size={18} />,
      property: "Farm"
    },
    {
      icon: <PiTentLight size={18} />,
      property: "Tent"
    },
  ];

  const selectProperty = (property) => {
    setSelectedProperty(property);
  };

  const toggleNote = () => {
    setIsNoteOpen(true);
    setTimeout(() => {
      setIsNoteOpen(false);
    }, 1800);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handlePropertyNameChange = (event) => {
    setPropertyName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const onDrop = (acceptedFiles) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    }
  });

  const handleCreateAnnoncement = async () => {
    
  }

  return (
    <div className='container my-24'>
      <h1 className="py-2 md:pb-15 font-bold text-xl md:text-start text-center">Add listing</h1>
      
      {/* Selecting Property Type */}
      <div>
        <h1 className='text-secondary dark:text-gray-200 text-base py-4 md:text-start text-center'>Select property type</h1>
        <div className='lg:p-5 grid lg:grid-cols-4 md:grid-cols-3 lg:gap-10 gap-8 py-4'>
          {PropertyType.map((element, index) => (
            <div key={index} className={`border-[1.8px] rounded-lg py-4 px-6 flex gap-4 justify-start items-center font-[500] cursor-pointer ${selectedProperty === element.property ? 'border-primary' : 'border-gray-300 dark:border-gray-600 '}`}
              onClick={() => selectProperty(element.property)}>
              <span className={`border border-gray-300 rounded-full p-3 ${selectedProperty === element.property ? 'border-primary text-primary' : 'border-gray-300'}`}>{element.icon}</span>
              <span className={selectedProperty === element.property ? 'text-primary' : ''}>{element.property}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Details */}
      <div>
        <h1 className='text-secondary dark:text-gray-200 text-base pt-12 pb-5 md:text-start text-center'>Property Details</h1>
        <div className='lg:p-5 py-5 px-0 md:grid lg:grid-cols-[2fr,3fr] md:grid-cols-[2fr,2fr] flex flex-col-reverse lg:gap-20 md:gap-5 gap-12'>
          <div className='flex flex-col gap-4'>
            <div {...getRootProps()} className='border rounded-lg border-dashed border-primary p-6 flex flex-col justify-center items-center gap-6 h-[264px]'>
              <input {...getInputProps()} />
              <span className='text-[15px] text-secondary text-center'>Drag & drop some files here, or click to select files</span>
              <span className='text-[15px] text-secondary text-center'>Please ensure you upload a minimum of five images</span>
              <button className='primary'>Upload</button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {images.map((file, index) => (
                <div key={index} className='border rounded-lg p-1'>
                  <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className='w-20 h-20 object-cover' />
                </div>
              ))}
            </div>
          </div>
          <form className='h-[250px]'>
            <div className="group">
              <input id="propertyname" name="propertyname"  value={propertyName}  onChange={handlePropertyNameChange} type="text" required />
              <label htmlFor="propertyname">Property Name</label>
            </div>
            <div className="group">
              <input id="address" name="address" type="address" value={address} onChange={handleAddressChange} placeholder='(ex: algiers, douira)' required />
              <label htmlFor="address">Address</label>
            </div>
            <div className="group" onClick={toggleNote}>
              <input id="price" name="price" type="text" value={price} onChange={handlePriceChange} required />
              <label htmlFor="price">Price</label>
              <div className={`transition-opacity duration-1000 ${isNoteOpen ? 'opacity-100' : 'opacity-0'} absolute w-[98%] bg-white border border-gray-100 rounded-xl shadow-lg shadow-gray-300 lg:text-base text-[13px] flex flex-col gap-3 dark:border-gray-800 dark:shadow-gray-900 p-3 top-12 md:left-2 left-1 dark:bg-darkmode`}>
                Please note, our platform operates on a 10% commission from the nightly rental price set by lessors. Thank you for your understanding!
              </div>
            </div>
            <div className="flex">
              <button onClick={handleCreateAnnoncement} className='primary'>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddListing;
