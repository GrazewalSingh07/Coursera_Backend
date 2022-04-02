const express = require("express");
const Course = require("../models/course.model");
const router = express.Router();

router.get("", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const pagesize = +req.query.pagesize || 7; // 7

    // if page = 1 then data should be from 1 to 7
    // if page = 2 then data should be from 8 to 14

    const skip = (page - 1) * pagesize; // 1 - 1 = 0 0 * anything  = 0
    // page = 2 then 2 - 1 = 1 and 1 * pagesize = 7

    const query = req.query.duration;
    const name = req.query.name;
    const courses = await Course.find({
      $and: [
        { duration: { $regex: query, $options: "si" } },
        { name: { $regex: name, $options: "si" } },
      ],
    })
      .skip(skip) // 30
      .limit(pagesize) // 31 - 60
      .lean()
      .exec();
    //  { <field>: { $regex: /pattern/, $options: '<options>' } }

    var totalPages = Math.ceil(
      (await Course.find({
        $and: [
          { duration: { $regex: query, $options: "si" } },
          { name: { $regex: name, $options: "si" } },
        ],
      }).countDocuments()) / pagesize
    );

    const currentPage = page;
    const previousPage = page - 1;
    const nextPage = page + 1;

    if (page > 1 && page < totalPages) {
      return res.status(200).send({
        courses,
        currentPage,
        previousPage,
        nextPage,
        totalPages,
      });
    } else if (page == 1) {
      if (page == totalPages) {
        return res.status(200).send({
          courses,
          currentPage,
          previousPage: null,
          nextPage: null,
          totalPages,
        });
      }

      return res.status(200).send({
        courses,
        currentPage,
        previousPage: null,
        nextPage,
        totalPages,
      });
    } else if (page == totalPages) {
      return res
        .status(200)
        .send({
          courses,
          currentPage,
          previousPage,
          nextPage: null,
          totalPages,
        });
    }

    return res.status(200).send({ courses, currentPage, nextPage, totalPages });
  } catch (error) {
    console.log(error);

    return res.status(401).send({ message: error.message });
  }
});

module.exports = router;
