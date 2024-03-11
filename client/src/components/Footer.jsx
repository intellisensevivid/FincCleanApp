import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-400 py-12 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* About Us */}
        <div className="md:col-span-4">
          <h3 className="font-semibold mb-4">ABOUT US</h3>
          <p className="leading-loose">
            FincCleanApp is a cloud-based platform for Laundry & Dry Cleaning
            stores with best-in-class POS, Driver apps, Inventory & Expense
            management modules covering both single & multi stores.
          </p>
        </div>
        {/* Product */}
        <div className="md:col-span-3">
          <h3 className="font-semibold mb-4">PRODUCT</h3>
          <ul>
            <li className="mb-1">Savings</li>
            <li className="mb-1">Hardware Requirements</li>
            <li className="mb-1">Pricing</li>
            <li className="mb-1">Single Store</li>
            <li className="mb-1">Multi Stores</li>
            <li className="mb-1">New Business</li>
            <li>Contact</li>
          </ul>
        </div>
        {/* Features */}
        <div className="md:col-span-3">
          <h3 className="font-semibold mb-4">FEATURES</h3>
          <ul>
            <li className="mb-1">Pickup and Delivery</li>
            <li className="mb-1">Staff Management</li>
            <li className="mb-1">Attendance Management</li>
            <li className="mb-1">Store Management</li>
            <li className="mb-1">Multi-Stores</li>
            <li className="mb-1">Customer management</li>
            <li>Payments</li>
          </ul>
        </div>
        {/* Contact */}
        <div className="md:col-span-2">
          <div>
            <h3 className="font-semibold mb-4">CONTACT</h3>
            <p>+234 910 233 3333</p>
            <p>sales@finccleanapp.com</p>
            <div className="flex mt-4">
              <a href="#" className="mr-4">
                <FaFacebook className="text-lg" />
              </a>
              <a href="#" className="mr-4">
                <FaXTwitter className="text-lg" />
              </a>
              <a href="#" className="mr-4">
                <FaLinkedinIn className=" text-lg" />
              </a>
            </div>
          </div>
          {/* Address */}
          <div>
            <h3 className="font-semibold mt-8 mb-4">ADDRESS</h3>
            <address>
              387, Sabon Titi, Plot #2810, Gyadi Gyadi, Kano, Kano 700101
            </address>
          </div>
          {/* Policies */}
          <div>
            <h3 className="font-semibold mt-8 mb-4">POLICIES</h3>
            <ul>
              <li className="mb-1">Privacy Policy</li>
              <li className="mb-1">Terms & Conditions</li>
              <li>Refund Policy</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <p>© 2024 FincCleanApp. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
