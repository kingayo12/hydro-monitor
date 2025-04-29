import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MasterLayout from "../../Layouts/MasterLayout";
import LoadingAnimation from "../../components/LoadingAnimation";
import { ArrowLeft, Thermometer, Droplets, Clock, AlertTriangle, Leaf, Waves } from "lucide-react";

import axios from "axios";

// const speciesApi = "http://localhost:5000/api/plants/${id}";

const PlantDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  //   const [plants, setPlants] = useState([]);
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/plants/${id}`);
        setPlant(res.data);
        setIsLoading(false);
      } catch (error) {
        setErrMsg("Failed to fetch plant data");
        setError("Failed to load plant details.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchPlantDetails(); // Prevent fetching on undefined
  }, [id]);

  if (error) {
    return (
      <MasterLayout>
        <div className='text-center py-12'>
          <h2 className='text-xl font-semibold text-red-700'>{error}</h2>
          <button
            onClick={() => navigate("/plants")}
            className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700'
          >
            <ArrowLeft size={16} className='mr-2' />
            Back to Catalog
          </button>
        </div>
      </MasterLayout>
    );
  }

  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <div className='animate-fade-in p-8'>
            <div className='flex items-center mb-6'>
              <button
                onClick={() => navigate("/plants")}
                className='mr-4 p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100'
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className='text-2xl font-bold text-gray-900'>
                {plant.common_name || plant.scientific_name}
              </h1>
            </div>

            <div className='bg-white rounded-lg shadow-card overflow-hidden mb-6'>
              <div className='md:flex'>
                <div className='md:w-1/3'>
                  <div className='h-64 md:h-full w-full'>
                    {plant.images && plant.images.length > 0 ? (
                      <img
                        src={plant.images[0]?.url} // Assuming the first image is the main one
                        alt={plant.common_name || plant.scientific_name}
                        className='w-full h-full object-cover'
                      />
                    ) : plant.image_url ? (
                      <img
                        src={plant.image_url}
                        alt={plant.common_name || plant.scientific_name}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm'>
                        No image available
                      </div>
                    )}
                  </div>
                </div>

                <div className='md:w-2/3 p-6'>
                  <div className='flex justify-between items-start mb-4'>
                    <div>
                      <h2 className='text-xl font-semibold text-gray-900'>
                        {plant.common_name || plant.scientific_name}
                      </h2>
                      <p className='text-gray-600 italic'>{plant.scientific_name}</p>
                    </div>
                    {plant.difficulty && (
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          plant.difficulty === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : plant.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {plant.difficulty || "  "}
                      </span>
                    )}
                  </div>

                  <p className='text-gray-700 mb-6'>
                    {plant.description || "No description available."}
                  </p>

                  <div className='grid grid-cols-2 gap-4 mb-6'>
                    {plant.growth_habit && (
                      <div className='flex items-center'>
                        <Clock size={18} className='text-gray-500 mr-2' />
                        <div>
                          <p className='text-sm text-gray-600'>Growth Habit</p>
                          <p className='font-medium'>{plant.growth_habit}</p>
                        </div>
                      </div>
                    )}
                    {/* Add other relevant details from the API response here */}
                  </div>

                  {plant.tags && plant.tags.length > 0 && (
                    <div className='flex flex-wrap gap-1 mb-6'>
                      {plant.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center px-2.5 py-0.5 rounded text-sm font-medium bg-gray-100 text-gray-800'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className='flex space-x-4'>
                    <button className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'>
                      Add to Farm
                    </button>
                    <button className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors'>
                      Run Simulation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {plant.growth && (
              <div className='bg-white rounded-lg shadow-card p-6 mb-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                  Ideal Growing Conditions
                </h3>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {plant.growth.minimum_ph && plant.growth.maximum_ph && (
                    <div className='bg-blue-50 rounded-lg p-4'>
                      <div className='flex items-center mb-2'>
                        <Droplets size={20} className='text-blue-500 mr-2' />
                        <h4 className='font-medium text-blue-700'>pH Level</h4>
                      </div>
                      <p className='text-2xl font-semibold text-blue-800'>
                        {plant.growth.minimum_ph} - {plant.growth.maximum_ph}
                      </p>
                      <p className='text-sm text-blue-600 mt-1'>Optimal pH range for growth</p>
                    </div>
                  )}

                  {plant.growth.minimum_relative_humidity &&
                    plant.growth.maximum_relative_humidity && (
                      <div className='bg-teal-50 rounded-lg p-4'>
                        <div className='flex items-center mb-2'>
                          <Waves size={20} className='text-teal-500 mr-2' />
                          <h4 className='font-medium text-teal-700'>Humidity</h4>
                        </div>
                        <p className='text-2xl font-semibold text-teal-800'>
                          {plant.growth.minimum_relative_humidity} -{" "}
                          {plant.growth.maximum_relative_humidity}%
                        </p>
                        <p className='text-sm text-teal-600 mt-1'>Ideal humidity percentage</p>
                      </div>
                    )}

                  {plant.growth.minimum_temperature?.deg_c &&
                    plant.growth.maximum_temperature?.deg_c && (
                      <div className='bg-orange-50 rounded-lg p-4'>
                        <div className='flex items-center mb-2'>
                          <Thermometer size={20} className='text-orange-500 mr-2' />
                          <h4 className='font-medium text-orange-700'>Temperature</h4>
                        </div>
                        <p className='text-2xl font-semibold text-orange-800'>
                          {plant.growth.minimum_temperature.deg_c} -{" "}
                          {plant.growth.maximum_temperature.deg_c}°C
                        </p>
                        <p className='text-sm text-orange-600 mt-1'>Optimal temperature range</p>
                      </div>
                    )}

                  {/* You might need to fetch nutrient information from a different part of the API response */}
                  {/* Example: */}
                  {plant.growth.minimum_nutrient_solution &&
                    plant.growth.maximum_nutrient_solution && (
                      <div className='bg-green-50 rounded-lg p-4'>
                        <div className='flex items-center mb-2'>
                          <Leaf size={20} className='text-green-500 mr-2' />
                          <h4 className='font-medium text-green-700'>Nutrient Level</h4>
                        </div>
                        <p className='text-2xl font-semibold text-green-800'>
                          {plant.growth.minimum_nutrient_solution} -{" "}
                          {plant.growth.maximum_nutrient_solution} ppm
                        </p>
                        <p className='text-sm text-green-600 mt-1'>
                          Optimal nutrient concentration
                        </p>
                      </div>
                    )}

                  {/* Water temperature might also be in a different section */}
                  {/* Example: */}
                  {plant.growth.minimum_water_temperature?.deg_c &&
                    plant.growth.maximum_water_temperature?.deg_c && (
                      <div className='bg-red-50 rounded-lg p-4'>
                        <div className='flex items-center mb-2'>
                          <Thermometer size={20} className='text-red-500 mr-2' />
                          <h4 className='font-medium text-red-700'>Water Temperature</h4>
                        </div>
                        <p className='text-2xl font-semibold text-red-800'>
                          {plant.growth.minimum_water_temperature.deg_c} -{" "}
                          {plant.growth.maximum_water_temperature.deg_c}°C
                        </p>
                        <p className='text-sm text-red-600 mt-1'>Ideal water temperature range</p>
                      </div>
                    )}

                  {/* Air temperature might be the same as the general temperature */}
                </div>
              </div>
            )}

            {/* Growing Tips - Adapt based on API data if available */}
            {/* Example: */}
            {plant.growing_tips && plant.growing_tips.length > 0 && (
              <div className='bg-white rounded-lg shadow-card p-6'>
                <h3 className='text-lg font-semibold text-gray-800 mb-4'>Growing Tips</h3>
                <ul className='space-y-3 text-gray-700'>
                  {plant.growing_tips.map((tip, index) => (
                    <li key={index} className='flex items-start'>
                      <div className='flex-shrink-0 h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center mr-2 mt-0.5'>
                        <span className='text-primary-600 text-xs font-bold'>{index + 1}</span>
                      </div>
                      <p>{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Error Message */}
          {errMsg && <div className='text-red-500 text-center mt-4'>{errMsg}</div>}
        </>
      )}
    </MasterLayout>
  );
};

export default PlantDetail;
