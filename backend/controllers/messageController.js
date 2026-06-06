const Message =
    require("../models/Message");

async function saveMessage(req, res) {

    try {

        const {

            sender,

            receiver,

            text

        } = req.body;

        const message =
            new Message({

                sender,

                receiver,

                text
            });

        await message.save();

        res.status(201).json({

            message:
                "Message saved"
        });

    } catch(error) {

        console.log(error);

        res.status(500).json({

            message:
                "Server error"
        });
    }
}

module.exports = {

    saveMessage
};