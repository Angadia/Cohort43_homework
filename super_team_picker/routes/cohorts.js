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

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomizedArray(membersArray) {
  const randomizedArray = [];
  for (let i = membersArray.length-1; i >= 0; i--) {
    randomizedArray.push(membersArray.splice(getRandomIntInclusive(0, i), 1)[0]);
  };
  return randomizedArray;
};

function generateAssignedTeams(members, method, quantity) {
  const emptyArray = [];
  const membersRandomizedArray = getRandomizedArray(members.split(',').map(member => member.trim()));

  if (!method || !quantity) {
    return emptyArray;
  };

  const numQuantity = parseInt(quantity, 10);
  if (isNaN(numQuantity) || numQuantity <= 0) {
    return emptyArray;
  };

  const teams = [];
  if (method == "team_count") {
    let numTeams = numQuantity;
    let minMembersPerTeam = 1;
    if (numTeams > membersRandomizedArray.length) {
      numTeams = membersRandomizedArray.length;
    } else {
      minMembersPerTeam = Math.floor(membersRandomizedArray.length/numQuantity);
      if (minMembersPerTeam <= 0)
        minMembersPerTeam = 1;
    };
    while (membersRandomizedArray.length > 0) {
      teams.unshift(membersRandomizedArray.splice(0,minMembersPerTeam).join(', '));
      numTeams -= 1;
      if (numTeams < 1)
        numTeams = 1;
      if (membersRandomizedArray.length%numTeams == 0)
        minMembersPerTeam = membersRandomizedArray.length/numTeams;
    };
  } else if (method == "number_per_team") {
    while (membersRandomizedArray.length > 0) {
      teams.push(membersRandomizedArray.splice(0,numQuantity).join(', '));
    };
  };
  return teams;
};

router.get("/:id", (req, res) => {
  knex("cohorts")
    .where("id", req.params.id)
    .first()
    .then((cohort) => {
      res.render("cohorts/show", {
        cohort: cohort,
        method: req.query.method,
        quantity: req.query.quantity,
        teams: generateAssignedTeams(cohort.members, req.query.method, req.query.quantity)
      });
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
