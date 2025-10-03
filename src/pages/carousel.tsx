// import React, { useState, useEffect } from 'react';

// const Carousel: React.FC = () => {
//   const images = [
//     'https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-slider-1.png',
//     'https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-slider-2.png',
//     'https://kapee.presslayouts.com/wp-content/uploads/2020/07/electronics-banner-2.jpg',
//   ];

//   const [currentIndex, setCurrentIndex] = useState<number>(0);

//   // Automatic slide change
//   useEffect(() => {
//     const interval = setInterval(nextSlide, 3000); // Slide every 3 seconds
//     return () => clearInterval(interval); // Cleanup on component unmount
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
//   };

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
//       {/* Carousel images */}
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <div key={index} className="w-full flex-shrink-0">
//             <img src={image} alt={`Slide ${index + 1}`} className="w-full object-cover rounded-lg" />
//           </div>
//         ))}
//       </div>

//       {/* Previous and Next Buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition"
//       >
//         &#8592;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition"
//       >
//         &#8594;
//       </button>

//       {/* Indicators */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {images.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => goToSlide(index)}
//             className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'} transition-all`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;
