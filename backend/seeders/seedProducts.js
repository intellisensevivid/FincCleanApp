const { Product, ProductSection } = require("../models/Product");

const defaultSections = [
  { name: "washDryFold" },
  { name: "retail" },
  { name: "pickupAndDelivery" },
  { name: "alterationsAndRepair" },
  { name: "dryCleaning" },
];

const defaultProducts = [
  {
    name: "Laundry",
    section: "washDryFold",
    productType: "parent",
    children: [
      {
        name: "Premium Laundry",
        section: "washDryFold",
        price: 15.0,
        productType: "weight",
      },
      {
        name: "Laundry",
        section: "washDryFold",
        price: 10.0,
        productType: "weight",
      },
    ],
  },
  {
    name: "Bedding",
    section: "washDryFold",
    productType: "parent",
    children: [
      {
        name: "Bedding Large",
        section: "washDryFold",
        price: 25.0,
        productType: "normal",
      },
      {
        name: "Bedding Medium",
        section: "washDryFold",
        price: 20.0,
        productType: "normal",
      },
      {
        name: "Bedding Small",
        section: "washDryFold",
        price: 15.0,
        productType: "normal",
      },
      {
        name: "Sheet",
        section: "washDryFold",
        price: 10.0,
        productType: "normal",
      },
      {
        name: "Duvet",
        section: "washDryFold",
        price: 30.0,
        productType: "normal",
      },
      {
        name: "Duvet Cover",
        section: "washDryFold",
        price: 15.0,
        productType: "normal",
      },
    ],
  },
  {
    name: "Bags",
    section: "washDryFold",
    price: 5.0,
    productType: "normal",
  },
  {
    name: "Towels",
    section: "washDryFold",
    productType: "parent",
    children: [
      {
        name: "Large Towel",
        section: "washDryFold",
        price: 10.0,
        productType: "normal",
      },
      {
        name: "Small Towel",
        section: "washDryFold",
        price: 8.0,
        productType: "normal",
      },
    ],
  },
];

const addDefaultProducts = async (storeId) => {
  const createdProductSections = await Promise.all(
    defaultSections.map(async (section) => {
      const createdSection = await ProductSection.create({
        name: section.name,
        business: storeId,
      });
      console.log(
        `ProductSection ${createdSection.name} with id ${createdSection._id} seeded successfully`
      );
    })
  );

  const sectionNameMap = {};
  const sections = await ProductSection.find({ business: storeId });
  console.log(sections);
  sections.forEach((section) => {
    sectionNameMap[section.name] = section._id;
  });

  //create new childProducts and parentProducts and fill in parentId in child products and children ids in children field of parent products
  await Promise.all(
    defaultProducts.map(async (productData) => {
      const { section, children, ...rest } = productData;
      const childProductsId = [];

      const parentProduct = await Product.create({
        ...rest,
        business: storeId,
        section: sectionNameMap[section],
        children: childProductsId,
      });

      if (children && children.length > 0) {
        await Promise.all(
          children.map(async (childData) => {
            const childProduct = await Product.create({
              ...childData,
              business: storeId,
              parent: parentProduct._id,
              section: sectionNameMap[childData.section],
            });
            childProductsId.push(childProduct._id);
            console.log(
              `Child product ${childData.name} created with ID: ${childProduct._id}`
            );
          })
        );
      }

      if (childProductsId.length) {
        parentProduct.children = childProductsId;
        await parentProduct.save();
      }

      console.log(`Product ${rest.name} created with ID: ${parentProduct._id}`);
    })
  );
};

module.exports = { addDefaultProducts };
