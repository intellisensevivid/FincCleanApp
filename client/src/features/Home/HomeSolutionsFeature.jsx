import { LazyMotion, domAnimation, m } from "framer-motion";
import pickupImg from "../../assets/pickup.jpg";
import crmImg from "../../assets/crm.jpg";
import garmentImg from "../../assets/garment.jpg";
import referralsImg from "../../assets/referrals.jpg";
import paymentsImg from "../../assets/payments.jpg";
import packagesImg from "../../assets/packages.jpg";
import inventoryImg from "../../assets/inventory.png";
import expenseImg from "../../assets/expenses.png";

const HomeSolutionsFeature = () => {
  return (
    <section className="bg-blue-200 py-16 px-4 md:px-8">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-6xl"
        >
          <div className="max-w-4xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              Pickup & Delivery Apps, CRM, Inventory, Loyalty & Payroll
              components brings 360° control over business
            </h2>
            <p className="text-lg mb-8">
              Communication, Transparency, Eazy Payments, Staff Efficiency,
              Customer Relationships acts as steroids for business growth.
              FincCleanApp has components to take care of the above and put your
              business in growth path.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* First Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={pickupImg}
                  alt="New Business"
                  className="w-auto h-16 mb-4 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">
                  Pickup & Delivery Apps
                </h3>
                <p className="leading-loose min-h-20">
                  Pickup & Delivery is new norm of laundry business, enables you
                  to reach new territories & customer segments.
                </p>
              </div>
            </div>
            {/* Second Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={crmImg}
                  alt="New Business"
                  className="w-auto h-16 mb-4 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">
                  CRM & Campaigns
                </h3>
                <p className="leading-loose min-h-20">
                  Acquire & retain customers by communicating - discounts,
                  promos, referrals etc on periodic basis through camapigns
                </p>
              </div>
            </div>
            {/* Third Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={garmentImg}
                  alt="New Business"
                  className="w-auto h-16 mb-4 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">Garment tags</h3>
                <p className="leading-loose min-h-20">
                  Assemble garments from different orders & wash them together,
                  segregate together for economical & speedy delivery.
                </p>
              </div>
            </div>
            {/* Fourth Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={referralsImg}
                  alt="New Business"
                  className="w-auto h-16 mb-4 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">
                  Loyalties & Referrals
                </h3>
                <p className="leading-loose min-h-20">
                  Only to expand business - provide excellent service, give
                  loyalty to regular customers and get referrals from them.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Fifth Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={paymentsImg}
                  alt="New Business"
                  className="w-auto h-16 mb-4 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">
                  Digital Payments
                </h3>
                <p className="leading-loose min-h-20">
                  Get payments from customers with eazy links, mobile apps, and
                  websites using digital payments support.
                </p>
              </div>
            </div>
            {/* Sixth Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={packagesImg}
                  alt="Factory / Plant"
                  className="w-auto h-16 mb-4 rounded-md align-middle"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">Prepaid Plans</h3>
                <p className="leading-loose min-h-20">
                  New steroids to laundry business to get sticky customers that
                  too get payments in advance from them.
                </p>
              </div>
            </div>
            {/* Seventh Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={inventoryImg}
                  alt="Franchise"
                  className="w-auto h-16 mb-4 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">Inventory</h3>
                <p className="leading-loose min-h-20">
                  Maintain a system of record for all - chemicals, powders,
                  machines, accessories etc. Record all usage patterns, and put
                  close tab on wastage.
                </p>
              </div>
            </div>
            {/* Eighth Card */}
            <div className="bg-white p-6 rounded-md shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <img
                  src={expenseImg}
                  alt="Aggregator"
                  className="w-auto h-16 mb-4 rounded-md"
                />
              </div>
              <div>
                <h3 className="font-bold mb-2 text-blue-500">
                  Expense Management
                </h3>
                <p className="leading-loose min-h-20">
                  Capture all expenses happening in the store, get approval from
                  them, categorize them. Analyze at later time for better
                  control.
                </p>
              </div>
            </div>
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default HomeSolutionsFeature;
