import { LazyMotion, domAnimation, m } from "framer-motion";
import { Link } from "react-router-dom";
import signupImg from "../../assets/signup.png";

const HomeSignup = () => {
  return (
    <section className="bg-gray-300 py-16 px-4 md:px-8">
      <LazyMotion features={domAnimation}>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          <div className="md:col-4">
            <img src={signupImg} alt="Signup" className="w-auto h-auto" />
          </div>
          <div className="md:col-8 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Sign Up today with FincCleanApp
            </h2>
            <p className="text-center text-lg">
              Best Laundry management system with inventory & accounting
              features.
            </p>
            <div className="mx-auto text-center mt-8">
              <Link
                to={`/signup`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-xl font-semibold px-12 py-4 rounded-full transition-transform transform active:translate-y-[1px] active:shadow-md"
              >
                Sign up Now!
              </Link>
            </div>
            <p className="mt-4 text-center text-lg text-gray-500">
              Sign up to get premium access and enjoy all features.
            </p>
          </div>
        </m.div>
      </LazyMotion>
    </section>
  );
};

export default HomeSignup;
