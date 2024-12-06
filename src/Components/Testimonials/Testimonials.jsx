import React from 'react';

export default function Testimonials() {
  const testimonials = [
    { name: "Jane Brish", comment: "Excellent quality and service!" },
    { name: "Mark L.", comment: "Love my new coffee machine!" },
  ];

  return (
    <section className="text-center py-16 bg-gray-100">
      <h2 className="text-2xl font-semibold">WHAT ARE THEY SAY ABOUT US</h2>
      <div className="flex justify-center gap-4 mt-8">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white shadow p-4 rounded w-1/3">
            <p>{testimonial.comment}</p>
            <p className="mt-2 font-semibold">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
