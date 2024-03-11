import { LazyMotion, domAnimation, m } from "framer-motion";
import heroImage from "../../assets/hero_graphic.png";

const HomeHero = () => {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="py-16 px-4 md:px-8"
      >
        <div className="container max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div className="lg:col-start-1 lg:col-end-2">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-semibold mb-4">
                <span className="block text-blue-500">Grow your Laundry</span>
                <span className="block">& Cleaning</span>
                <span className="block">Business</span>
              </h2>
              <p className="text-lg md:text-xl my-16">
                <span className="block">
                  The All-in-one solution for Laundry,
                </span>
                <span className="block">
                  Pickup and Delivery Apps and more.
                </span>
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 transform active:translate-y-[1px] transition-transform text-white text-lg md:text-xl font-semibold py-2 px-4 rounded shadow-md shadow-gray-300">
                Get Started
              </button>
            </m.div>
          </div>
          {/* Right Section */}
          <m.div
            initial={{ opacity: 0, x: 150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="lg:col-start-2 lg:col-end-3 flex justify-center items-center"
          >
            <img
              src={heroImage}
              alt="finccleanapp hero image"
              className="w-full h-auto"
            />
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
};

export default HomeHero;
