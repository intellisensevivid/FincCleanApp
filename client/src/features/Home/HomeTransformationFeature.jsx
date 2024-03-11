import { LazyMotion, domAnimation, m } from "framer-motion";
import manageSysImg from "../../assets/manage-system.jpg";

const HometransformationFeature = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-8">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              FincCleanApp brings your business to new eCommerce era
            </h2>
            <p className="text-lg mb-8">
              Laundry is transforming every day, FincCleanApp makes you ready
              with tools & technologies and puts you ahead of the competition.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="md:w-1/2 mb-4 md:mb-0 flex-grow md:min-h-full">
              <img
                src={manageSysImg}
                alt="Manage System Images"
                className="w-auto h-auto md:max-w-md mx-auto"
              />
            </div>
            <div className="md:w-1/2 md:pl-8 md:pr-24">
              <div className="mb-8">
                <h3 className="font-bold mb-2 text-blue-500">
                  SETUP & CONFIGURE EASILY
                </h3>
                <p className="leading-loose">
                  FincCleanApp is easy to set up and configure. FincCleanApp has
                  a huge collection of articles, videos, ecosystem, and support
                  staff to get onboard easily and become a master in no time.
                </p>
              </div>
              <div className="mb-8">
                <h3 className="font-bold mb-2 text-blue-500">
                  IMPORT CUSTOMERS, PRODUCTS, STAFF
                </h3>
                <p className="leading-loose">
                  You can import customers, business accounts, products quickly
                  and start the business in minutes. FincCleanApp acts as a
                  system of record for any changes. Campaigning & built-in CRM
                  empower you to acquire & retain customers, thereby increasing
                  revenue.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">
                  ANALYZE & IMPROVE
                </h3>
                <p className="leading-loose">
                  Deeper insights & powerful reporting empower you to make
                  informed decisions and alter the business strategy for
                  betterment. Historical analysis on data makes you get more
                  sales, more revenue & more profits.
                </p>
              </div>
            </div>
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default HometransformationFeature;
