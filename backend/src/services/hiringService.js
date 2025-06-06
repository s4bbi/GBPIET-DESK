const { HiringRepository } = require("../repositories");

const hiringRepository = new HiringRepository();

async function createHiring(hiringData) {
  try {
    const hiring = await hiringRepository.create(hiringData);
    return hiring;
  } catch (error) {
    if (error.name === "ValidationError") {
      // error.errors is an object where each key is the name of an invalid field.
      const errors = Object.keys(error.errors).map((field) => ({
        field, // Field name (e.g., "password")
        message: error.errors[field].message, // Error message (e.g., "Path password (1234) is shorter than the minimum allowed length (8).")
      }));
      throw new BadRequestError(
        "Validation failed for the provided data. Please correct the errors and try again.",
        errors
      );
    }
    throw error;
  }
}
async function getHiringByDepartment(department) {
  try {
    const hiring = await hiringRepository.findByDepartment(department);
    return hiring;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function deleteExpiredHiringPosts() {
  try {
    const expiredPosts = await hiringRepository.deleteExpiredPost();
    return expiredPosts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function deletePosts(id) {
  try {
    const deletedPost = await hiringRepository.destroy(id);
    return deletedPost;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
async function getAllHiring(query) {
  try {
    const sortFilter = {};
    const customFilter = {};
    // const page =
    //   query.page && parseInt(query.page, 10) > 0 ? parseInt(query.page, 10) : 1;
    // const limit =
    //   query.limit && parseInt(query.limit, 10) > 0
    //     ? parseInt(query.limit, 10)
    //     : 10;

    // const skip = (page - 1) * limit;

    // Location filter
    if (query.location) {
      customFilter.location = { $regex: query.location, $options: "i" };
    }

    // Company name filter
    if (query.companyName) {
      customFilter.companyName = {
        $regex: query.companyName,
        $options: "i",
      };
    }

    // Department filter
    if (query.departments) {
      customFilter.departments = { $in: [query.departments] };
    }

    // Sorting (e.g., sort=companyName_asc,lastDate_desc)
    if (query.sort) {
      query.sort.split(",").forEach((param) => {
        const [field, dir] = param.split("_");
        sortFilter[field] = dir === "desc" ? -1 : 1;
      });
    }

    // Debug logs
    console.log("Query:", query);
    console.log("Custom Filter:", customFilter);
    console.log("🟩 SERVICE LOG:");
    console.log("Query Received:", query);
    console.log("Custom Filter to Repo:", customFilter);
    console.log("Sort Filter:", sortFilter);
    // console.log("Pagination - Page:", page, "Limit:", limit, "Skip:", skip);

    const hiring = await hiringRepository.getAllHiring(
      customFilter,
      sortFilter
    );

    return hiring;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createHiring,
  getHiringByDepartment,
  deleteExpiredHiringPosts,
  getAllHiring,
  deletePosts,
};
