const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Role = require('../models/Role');

//ROUTE 1: Fetch All Roles using: GET 'api/role/'. Login required
router.get('/', fetchuser, async (req, res) => {
    const role = await Role.find({ user: req.user.id });
    res.send(role);
})

//ROUTE 2: Create Role using: POST 'api/role/'. Login required
router.post('/', fetchuser, [
    body('rolename', 'Please enter a Role name').not().isEmpty().trim().escape(),
    body('roledescription', 'Description must be atleast 5 charaters').isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors);
        }
        try {
            const { rolename, roledescription } = req.body;
            //Check whether the role already exists
            let role = await Role.findOne({ roleName: rolename });
            if (role) {
                return res.status(400).json({ message: 'Role already exist with this name.' })
            }
            role = await Role.create({
                roleName: rolename,
                roleDescription: roledescription,
                user: req.user.id
            })
            res.send(role);
        } catch (error) {
            console.error(error.message);
            res.status(400).json(error.message);
        }
    })

//ROUTE 3: Update Role using: PUT 'api/role/'. Login required
router.put('/:id', fetchuser, async (req, res) => {

    try {
        const { rolename, roledescription } = req.body;
        const newRole = {};
        if (rolename) { newRole.roleName = rolename }
        if (roledescription) { newRole.roleDescription = roledescription }
        //Find the role to be updated and update it.
        let role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).send('Role not found');
        }
        if (role.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        role = await Role.findByIdAndUpdate(req.params.id, { $set: newRole }, { new: true })
        res.json(role);

    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
})

//ROUTE 4: Delete Role using: DELETE 'api/role/'. Login required
router.delete('/:id', fetchuser, async (req, res) => {

    try {
        //Find the role to be updated and update it.
        let role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).send('Role not found');
        }
        if (role.user.toString() !== req.user.id) {
            return res.status(401).send('Not Allowed');
        }

        role = await Role.findByIdAndDelete(req.params.id);
        res.json({ success: "Role has been deleted successfully", role: role });

    } catch (error) {
        console.error(error.message);
        res.status(400).json(error.message);
    }
})

module.exports = router;