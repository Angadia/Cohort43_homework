const express = require("express");
const knex = require("../db/client");

const router = express.Router();

router.get("/", (req, res) => {
  knex("cohorts")
    .orderBy("created_at", "DESC")
    .then((cohorts) => {
      res.render("cohorts/index", { cohorts: cohorts });
    });
});

router.get("/new", (req, res) => {
  res.render("cohorts/new", { cohort: false });
});

router.get("/:id", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .first()
    .then((cohort) => {
      res.render("cohorts/show", { cohort: cohort });
    });
});

router.post("/new", (req, res) => {
  const members = req.body.members;
  const name = req.body.name;

  if (name.length > 0 || members.length > 0) {
    knex("cohorts")
      .insert({
        name: name,
        members: members,
        logo_url: req.body.logo_url,
      })
      .returning("*")
      .then((cohorts) => {
        const cohort = cohorts[0];
        res.redirect(`/cohorts/${cohort.id}`);
      });
  } else {
    res.render("cohorts/new", { cohort: false });
  }
});

router.get("/:id/edit", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .first()
    .then((cohort) => {
      res.render("cohorts/edit", { cohort: cohort });
    });
});

router.patch("/:id", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .update({
      name: req.body.name,
      logo_url: req.body.logo_url,
      members: req.body.members,
    })
    .then(() => {
      res.redirect(`/cohorts/${req.params.id}`);
    });
});

router.delete("/:id", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .delete()
    .then(() => {
      res.redirect("/cohorts");
    });
});

module.exports = router;
