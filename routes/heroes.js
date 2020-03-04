const express = require('express');

const Hero = require('../models/hero');

const router = express.Router();

console.log("Using Heroes Custom Middleware");

router.get('/', async (req, res) => {
    try {
        let heroes = await Hero.find();
            // .find({ isAlive: true });
            // .sort({ name: "asc" })
            // .limit(2)
            // .select({name: 1, isAlive: 1});

        res.status(200).send(heroes);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:heroId', async (req, res) => {
    try {
        // let heroRequested = await Hero.find({_id: req.params.heroId});
        let heroRequested = await Hero.findById(req.params.heroId);

        res.status(200).send(heroRequested);
    } catch (error) {
        return res.status(500).send(error.message); // TODO: fix this for both internal and not found errors
    }
});

// app.get('/api/heroes/:heroId', (req, res) => {
//     const heroes = [
//         {
//             name: "jothi",
//             superPowers: ["Barking", "Laughing"],
//             likeCount: 3
//         },
//         {
//             name: "rathne",
//             superPowers: ["Crying", "Disappearing"],
//             likeCount: 4
//         }
//     ];
//
//     const index = heroes.findIndex((value, index) => {
//         return index === req.params.heroId
//     });
//
//     index !== -1 ? res.send(heroes[index]) : res.send("Identifier not found on this server.");
//
//     // if (req.params.id === '1') {
//     //     res.send(hero);
//     // } else {
//     //     res.send("Identifier not found on this server");
//     // }
// });

router.post('/', async (req, res) => {
    let heroToAdd = new Hero(req.body);

    try {
        let heroCreated = await heroToAdd.save();
        res.status(200).send(heroCreated);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.put('/:heroId', async (req, res) => {
    if (!req.params.heroId) {
        return res.status(400).send("Identifier not available");
    }

    try {
        let heroToEdit = await Hero.findById(req.params.heroId);
        heroToEdit.set(req.body);
        heroToEdit = await heroToEdit.save();
        res.send(heroToEdit);
    } catch (error) {
        res.status(500).send(error.message); // TODO: fix this for both internal and not found errors
    }
});

router.delete('/:heroId', async (req, res) => {
    if (!req.params.heroId) {
        return res.status(400).send("Identifier not available");
    }

    try {
        let heroToDelete = await Hero.findByIdAndDelete(req.params.heroId);
        res.status(200).send(heroToDelete);
    } catch (error) {
        res.status(500).send(error.message); // TODO: fix this for both internal and not found errors
    }
});

module.exports = router;
