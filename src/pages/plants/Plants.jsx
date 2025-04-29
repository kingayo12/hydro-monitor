import React, { useEffect, useState } from "react";
import MasterLayout from "../../Layouts/MasterLayout";
import LoadingAnimation from "../../components/LoadingAnimation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { Search, Filter, ArrowUpDown } from "lucide-react";

import axios from "axios";
import SpeciesList from "../../components/SpeciesList";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const Plants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterBy, setFilterBy] = useState("all");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get("https://hydromonitor.onrender.com/api/plants");
        setPlants(res.data.data || []); // Trefle sends { data: [...] }
      } catch (error) {
        console.error(error);
        setErrMsg("Failed to fetch plant data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []);

  const filteredPlants = plants.filter((item) => {
    const matchesSearch =
      item.common_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scientific_name?.toLowerCase().includes(searchQuery.toLowerCase());

    // Watering filter logic (adapt if you have watering info)
    const matchesFilter =
      filterBy === "all" || item.watering?.toLowerCase() === filterBy.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const sortedPlants = [...filteredPlants].sort((a, b) => {
    let valA = sortBy === "name" ? a.common_name || "" : a.cycle || "";
    let valB = sortBy === "name" ? b.common_name || "" : b.cycle || "";

    if (typeof valA === "string" && typeof valB === "string") {
      return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return 0;
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  return (
    <MasterLayout>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          {/* Hero Banner */}
          <Swiper
            effect='fade'
            centeredSlides={true}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            direction='vertical'
            modules={[Autoplay, EffectFade, Pagination]}
            spaceBetween={30}
            className='mySwiper plants-cont'
          >
            {["Plants", "Crops", "Farm", "Vegetation", "Grops"].map((text, idx) => (
              <SwiperSlide key={idx}>
                <div className='ads flex-1'>
                  <p className='text-8xl font-bold uppercase'>{text}</p>
                  <div className='ads-img'></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Filters */}
          <div className='bg-white rounded-lg shadow-card p-4 my-6 mx-4'>
            <div className='flex flex-col md:flex-row gap-4'>
              {/* Search */}
              <div className='relative flex-grow'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Search size={18} className='text-gray-400' />
                </div>
                <input
                  type='text'
                  placeholder='Search plants...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 py-2 bg-gray-50'
                />
              </div>

              {/* Filter */}
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Filter size={18} className='text-gray-400' />
                </div>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className='pl-10 pr-8 block rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 py-2 bg-gray-50'
                >
                  <option value='all'>All</option>
                  <option value='Frequent'>Frequent</option>
                  <option value='Average'>Average</option>
                  <option value='Minimum'>Minimum</option>
                </select>
              </div>

              {/* Sort */}
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <ArrowUpDown size={18} className='text-gray-400' />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className='pl-10 pr-8 block rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 py-2 bg-gray-50'
                >
                  <option value='name'>Name</option>
                  <option value='cycle'>Cycle</option>
                </select>
              </div>

              <button
                onClick={toggleSortOrder}
                className='p-2 rounded-md border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100'
              >
                {sortOrder === "asc" ? "A-Z" : "Z-A"}
              </button>
            </div>
          </div>

          {/* Results */}
          <p className='text-sm text-gray-600 mb-4 px-4'>
            Showing {sortedPlants.length} of {plants.length} plants
          </p>

          {/* Species List */}
          <SpeciesList plants={sortedPlants} />

          {/* Error Message */}
          {errMsg && <div className='text-red-500 text-center mt-4'>{errMsg}</div>}
        </>
      )}
    </MasterLayout>
  );
};

export default Plants;
