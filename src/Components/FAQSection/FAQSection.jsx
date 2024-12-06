import React from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "ANGELINE S.",
      text: "I highly recommend Majesty Coffee to all coffee lovers who want to enhance their coffee experience at home.",
      rating: 4.5,
    },
    {
      name: "JANE BRISH.",
      text: "The purchase of a coffee machine from Majesty Coffee has truly changed the way I enjoy coffee at home. Their products are of high quality, and their customer service is very professional. Highly recommend to all coffee lovers!",
      rating: 5,
    },
    {
      name: "JACOB CRAW",
      text: "Take your home-brewing game to the next level with Breville's Oracle Touch, an impressive and easy-to-use semi-automatic espresso machine.",
      rating: 4.5,
    },
    {
      name: "DINN A.",
      text: "I highly recommend Majesty Coffee for their excellent service and quality coffee machines.",
      rating: 4.7,
    },
  ];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#302218]">WHAT ARE THEY SAY ABOUT US</h2>
        <p className="text-lg mb-12 text-[#302218]">
          Listen directly from our customers about their experiences with our outstanding service. These are real stories from people who have chosen us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-white">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#edebd4] text-[#302218] rounded-lg p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold mb-2">{testimonial.name}</h3>
              <p className="text-sm mb-4">{testimonial.text}</p>
              <div className="flex items-center">
                <div className="flex text-yellow-500">
                  {Array.from({ length: Math.floor(testimonial.rating) }).map(
                    (_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    )
                  )}
                  {testimonial.rating % 1 !== 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      <path
                        fill="gray"
                        d="M12 15.4L16.6 18 15.4 12 18 8.6 12.4 8l-2.4-6-2.4 6-5.6.6L6 12 5 18l6-2.6z"
                      />
                    </svg>
                  )}
                </div>
                <p className="ml-2 text-sm text-gray-400">
                  {testimonial.rating.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
