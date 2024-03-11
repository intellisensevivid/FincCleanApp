import { LazyMotion, domAnimation, m } from "framer-motion";
import singleStoreImg from "../../assets/singlestore.jpg";
import multiStoreImg from "../../assets/multistore.jpg";
import factoryImg from "../../assets/factory.png";
import startupImg from "../../assets/startup.jpg";
import franchiseImg from "../../assets/franchise.png";
import aggregatorImg from "../../assets/aggregator.jpg";

const HomeGrowthFeature = () => {
  return (
    <section className="bg-slate-800 py-16 px-4 md:px-8">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-6xl"
        >
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Laundry Platform helps you in every stage of your growth path
            </h2>
            <p className="text-lg text-white mb-8">
              Whatever might be the size of your business, FincCleanApp
              addresses your needs like a tailor-made solution. You can start
              with a single store and gradually scale to multi-store with
              multiple plants. FincCleanApp supports that. We travel with your
              growth story as a technology partner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* First Card */}
            <div className=" bg-white p-6 md:p-10 rounded-md shadow-md">
              <div className="flex flex-col md:flex-row items-center md:items-start transition transform hover:scale-105">
                <img
                  src={singleStoreImg}
                  alt="Single Store"
                  className="w-auto h-20 md:w-32 rounded-full mx-auto md:mr-6 mb-4 md:mb-0"
                />
                <div>
                  <h3 className="font-bold mb-2 text-blue-500">SINGLE STORE</h3>
                  <p className="leading-loose min-h-20">
                    Automate end-to-end operations: customer acquisition, order
                    capture, payment collection, garment tagging, inventory
                    tracking, reviews capture, and communication.
                  </p>
                </div>
              </div>
            </div>
            {/* Second Card */}
            <div className=" bg-white p-6 md:p-10 rounded-md shadow-md">
              <div className="flex flex-col md:flex-row items-center md:items-start transition transform hover:scale-105">
                <img
                  src={multiStoreImg}
                  alt="Multi Store"
                  className="w-auto h-20 md:w-32 rounded-full mx-auto md:mr-6 mb-4 md:mb-0"
                />
                <div>
                  <h3 className="font-bold mb-2 text-blue-500">MULTI STORE</h3>
                  <p className="leading-loose min-h-20">
                    Automate entire business: Manage stores, plants, drivers,
                    and service territories. Garment flow between stores &
                    plants, central inventory, and staff management.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Third Card */}
            <div className="bg-white p-6 rounded-md shadow-md">
              <div className="transition transform hover:scale-105">
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={startupImg}
                    alt="New Business"
                    className="w-auto h-16 mb-4 rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-blue-500">NEW BUSINESS</h3>
                  <p className="leading-loose min-h-20">
                    Start operations quickly with best processes, minimize time
                    to get into self-sustain mode ahead of competition.
                  </p>
                </div>
              </div>
            </div>
            {/* Fourth Card */}
            <div className="bg-white p-6 rounded-md">
              <div className="transition transform hover:scale-105">
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={factoryImg}
                    alt="Factory / Plant"
                    className="w-auto h-16 mb-4 rounded-md align-middle"
                  />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-blue-500">
                    FACTORY / PLANT
                  </h3>
                  <p className="leading-loose min-h-20">
                    Assemble garments from different stores & wash/iron them
                    together, segregate and ship for economical & speedy
                    delivery.
                  </p>
                </div>
              </div>
            </div>
            {/* Fifth Card */}
            <div className="bg-white p-6 rounded-md">
              <div className="transition transform hover:scale-105">
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={franchiseImg}
                    alt="Franchise"
                    className="w-auto h-16 mb-4 rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-blue-500">FRANCHISE</h3>
                  <p className="leading-loose min-h-20">
                    Expand your business to new horizons without investing money
                    in establishing physical stores and plants.
                  </p>
                </div>
              </div>
            </div>
            {/* Sixth Card */}
            <div className="bg-white p-6 rounded-md">
              <div className="transition transform hover:scale-105">
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={aggregatorImg}
                    alt="Aggregator"
                    className="w-auto h-16 mb-4 rounded-md"
                  />
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-blue-500">AGGREGATOR</h3>
                  <p className="leading-loose min-h-20">
                    Get up from the ground quickly, run a multi-million dollar
                    business without you spending a dime on your development
                    team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default HomeGrowthFeature;
