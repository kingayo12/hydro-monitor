import React from "react";
import { Thermometer, Droplets, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const SpeciesList = ({ plants = [] }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6 mb-56'>
      {plants.length > 0 ? (
        plants.map((plant, index) => (
          <Link to={`/plants/${plant.id}`} key={plant.id || index} className='block'>
            <div className='bg-white rounded-lg shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover animate-fade-in'>
              <div className='h-48 w-full overflow-hidden'>
                {plant.image_url ? (
                  <img
                    src={plant.image_url}
                    alt={plant.common_name}
                    className='w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105'
                  />
                ) : (
                  <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm'>
                    No image available
                  </div>
                )}
              </div>

              <div className='p-4'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>
                      {plant.common_name || "Unknown Name"}
                    </h3>
                    <p className='text-sm text-gray-500 italic mb-2'>
                      {plant.scientific_name || "Unknown scientific name"}
                    </p>
                  </div>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
                    {plant.family || "Unknown Family"}
                  </span>
                </div>

                <p className='mt-2 text-sm text-gray-600 line-clamp-2'>
                  {plant.year ? `Discovered in ${plant.year}` : "No year data"}
                </p>

                {/* <div className='mt-4 flex justify-between text-xs text-gray-600'>
                  <div className='flex items-center'>
                    <Thermometer size={14} className='mr-1' />
                    <span>{plant.observations}</span>
                  </div>
                  <div className='flex items-center'>
                    <Droplets size={14} className='mr-1' />
                    <span>-</span>
                  </div>
                  <div className='flex items-center'>
                    <Leaf size={14} className='mr-1' />
                    <span>{plant.soil_nutriments}</span>
                  </div>
                </div> */}

                <div className='mt-4 flex flex-wrap gap-1'>
                  <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800'>
                    {plant.slug}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className='col-span-full text-center text-gray-500 text-sm'>No plants found.</div>
      )}
    </div>
  );
};

export default SpeciesList;
