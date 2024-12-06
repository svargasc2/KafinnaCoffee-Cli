import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faInstagram,
  faTiktok,
  faYoutube,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="bg-[#302218] text-white py-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Kafinna Coffee</h3>
          <p className="text-sm mb-4">
            Stay in the loop with our newsletter subscription. Get the latest
            updates, exclusive access to deals, and special promotions.
          </p>
          <form className="flex items-center justify-center md:justify-start">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-2/3 rounded-l-md border-none focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black px-4 py-2 rounded-r-md font-semibold hover:bg-gray-200"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>

        {/* Delivery & Returns Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Delivery & Returns</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Shipping Information
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Returns & Refunds
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Track Your Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Help & FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">The Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                How it Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shop
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm">©2024 KafinnaCoffee. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:opacity-75">
            <FontAwesomeIcon icon={faLinkedin} size="lg" />
          </a>
          <a href="#" className="hover:opacity-75">
            <FontAwesomeIcon icon={faInstagram} size="lg" />
          </a>
          <a href="#" className="hover:opacity-75">
            <FontAwesomeIcon icon={faTiktok} size="lg" />
          </a>
          <a href="#" className="hover:opacity-75">
            <FontAwesomeIcon icon={faYoutube} size="lg" />
          </a>
          <a href="#" className="hover:opacity-75">
            <FontAwesomeIcon icon={faTwitter} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
}
