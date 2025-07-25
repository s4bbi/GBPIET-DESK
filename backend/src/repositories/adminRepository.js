const Admin = require("../models/adminModel");
const Hiring = require("../models/hiringModel");
const Student = require("../models/studentModel");
const CrudRepository = require("./crudRepository");

class AdminRepository extends CrudRepository {
  constructor() {
    super(Admin, "Admin");
  }

  async findByEmail(email) {
    try {
      const admin = await Admin.findOne({ email });
      return admin;
    } catch (error) {
      throw error;
    }
  }
  async getAllAdmins(){
    try{
      const admin=await Admin.find({role:'admin'},"-password");
      return admin;
    }
    catch(error){
      throw error;
    }
  }
  async getStats(){
    try{
      const [totalStudents,totalAdmin,totalHirings]=await Promise.all([

        Student.countDocuments(),
        Admin.countDocuments(),
        Hiring.countDocuments()
      ]);
      return {totalStudents,totalAdmin,totalHirings}
    }
    catch(error){
      throw error;
    }
  }
    async getUserSignupsPerDayThisWeek (){
  const today = new Date();
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday

  return await Student.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfWeek }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { "_id": 1 }
    }
  ]);
};
}

module.exports = AdminRepository;
