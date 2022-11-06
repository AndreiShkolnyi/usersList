const Profession = require("../models/Profession");
const Quality = require("../models/Quality");

const professionMock = require("../mock/profession.json");
const qualitiesMock = require("../mock/qualities.json");

module.exports = async () => {
  const profession = await Profession.find();
  if (profession.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock);
  }

  const qualities = await Quality.find();
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock);
  }
};

const createInitialEntity = async (Model, data) => {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (e) {
        return console.log(e.message);
      }
    })
  );
};
