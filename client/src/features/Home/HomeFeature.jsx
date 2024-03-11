import { LazyMotion, domAnimation, m } from "framer-motion";
import { FaCircleCheck } from "react-icons/fa6";
import homeFeatureDevice from "../../assets/home-feature.png";

const HomeFeature = () => {
  return (
    <section className="bg-gray-300 py-16 px-4 md:px-8">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-6xl"
        >
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-semibold mb-4">
              Laundry Management System that works on any device & from anywhere
            </h2>
            <p className="text-lg mb-4">
              Experience seamless laundry management with our innovative system
              that empowers you to oversee operations effortlessly, whether
              you`re at home, in the office, or on the go.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
            <div>
              <ul className="mb-4">
                <li className="flex items-center mb-4">
                  <FaCircleCheck className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Staff can use either Computer, PAD (or) Mobile</span>
                </li>
                <li className="flex items-center mb-4">
                  <FaCircleCheck className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Drivers use pickup & delivery mobile apps</span>
                </li>
              </ul>
            </div>
            <div>
              <ul className="mb-4">
                <li className="flex items-center mb-4">
                  <FaCircleCheck className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Customers use FincCleanApp app to raise requests</span>
                </li>
                <li className="flex items-center mb-4">
                  <FaCircleCheck className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                  <span>
                    Owners can use FincCleanApp Business app (or) browser based
                    portal
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <img
              src={homeFeatureDevice}
              alt="FincCleanApp feature device"
              className="w-full md:w-auto mx-auto"
            />
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default HomeFeature;
