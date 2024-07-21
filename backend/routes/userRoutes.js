const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Kullanıcı bilgilerini getirme
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Kullanıcı bilgilerini güncelleme
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, firstName, lastName, email, contactInfo, address } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        user.username = username;
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;  // E-posta alanı güncelleme
        user.contactInfo = contactInfo;
        user.address = address;

        await user.save();
        res.status(200).json({ message: 'Kullanıcı başarıyla güncellendi', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
