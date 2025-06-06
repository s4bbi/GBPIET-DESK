const Hiring = require("../models/hiringModel");
const CrudRepository = require("./crudRepository");

class HiringRepository extends CrudRepository {
  constructor() {
    super(Hiring);
  }

  async findByDepartment(department) {
    try {
      const hiring = await Hiring.find({
        departments: { $in: [department] },
      }).sort({ lastDate: 1 });
      return hiring;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteExpiredPost() {
    try {
      const currentDate = new Date();
      const expiredPosts = await Hiring.deleteMany({
        lastDate: { $lt: currentDate },
      });
      return expiredPosts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllHiring(filter = {}, sort = {}) {
    console.log("🟨 REPOSITORY LOG:");
    console.log("Final DB Query Filter:", filter);
    // console.log("Sort:", sort, "Skip:", skip, "Limit:", limit);
    const response = await Hiring.find(filter).sort(sort);

    console.log("MongoDB Returned Records:", response.length);
    return response;
  }
}

module.exports = HiringRepository;
