import HomeFeatures from "./HomeFeature";
import HomeHero from "./HomeHero";
import HomeGrowthFeature from "./HomeGrowthFeature";
import HomeSolutionsFeature from "./HomeSolutionsFeature";
import HometransformationFeature from "./HomeTransformationFeature";
import HomeSignup from "./HomeSignup";

const HomePage = () => {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeGrowthFeature />
      <HomeSolutionsFeature />
      <HometransformationFeature />
      <HomeSignup />
    </>
  );
};

export default HomePage;
