const Role = require('../models/Role');

exports.createRole = async (req, res) => {
  const { role } = req.body;

  try {
    const existingRole = await Role.findOne({ role });

    if (existingRole) {
      return res.status(409).json({ message: 'Role already exists' });
    }

    const newRole = new Role({ role });

    await newRole.save();

    res.status(201).json({ message: 'Role created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred' });
  }
};