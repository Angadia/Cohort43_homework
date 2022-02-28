const express = require("express");
const knex = require("../db/client");

const router = express.Router();

router.get("/", (req, res) => {
  knex("cohorts")
    .orderBy("created_at", "DESC")
    .then(cohorts => {
      res.render("cohorts/index", {cohorts: cohorts});
    });
});

router.get("/new", (req, res) => {
  const members = req.body.members;
  const logo_url = req.body.logo_url;
  const name = req.body.name;

  res.render("cohorts/new", {
    name: name,
    members: members,
    logo_url: logo_url
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  knex("cohorts")
    .where("id", id)
    .first()
    .then(cohort => {
      res.render("cohorts/show", {cohort: cohort});
    });
});

router.post("/new", (req, res) => {
  const members = req.body.members;
  const logo_url = req.body.logo_url;
  const name = req.body.name;

  if (name.length > 0 || logo_url.length > 0 || members.length > 0) {
    knex("cohorts")
      .insert({
        name: name,
        members: members,
        logo_url: logo_url,
      })
      .returning("*")
      .then(cohort => {
        res.redirect(`/:${cohort.id}`);
      });
  } else {
    res.render("cohorts/new", {
      name: name,
      members: members,
      logo_url: logo_url
    });
  };
});

module.exports = router;
