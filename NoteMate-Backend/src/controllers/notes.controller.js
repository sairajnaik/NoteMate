const fs = require('fs');
const dataPath = './src/data/notes.json';


const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
        if (err) { throw err; }
        callback(returnJson ? JSON.parse(data) : data);
    });
};

const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) { throw err; }
        callback();
    });
};

function IDGenerator() {
    this.length = 8;
    this.timestamp = +new Date;
    const _getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.generate = function() {
        const ts = this.timestamp.toString();
        const parts = ts.split("").reverse();
        let id = "";

        for (let i = 0; i < this.length; ++i) {
            const index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
        }

        return id;
    }


}

// Get all notes
exports.getAllNotes = (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
}

// Add new note
exports.addNewNote = (req, res) => {
    readFile(data => {
            let newNote = req.body;
            const generator = new IDGenerator();
            newNote.id = generator.generate();
            data.notes.push(newNote);
            writeFile(JSON.stringify(data, null, 2), () => { res.status(200).send(newNote); });
        },
        true);
}


// Delete a note
exports.deleteNote = (req, res) => {
    readFile(data => {
            const atIndex = data.notes.findIndex(x => x.id === req.params["id"]);
            if (atIndex > -1) {
                data.notes.splice(atIndex, 1);
                writeFile(JSON.stringify(data, null, 2), () => { res.status(200).send(req.params["id"]); });
            } else {
                res.status(404).send('Note not found');
            }
        },
        true);
}


// update a note
exports.updateNote = (req, res) => {
    readFile(data => {
            console.log('*********************', req)
            const atIndex = data.notes.findIndex(x => x.id === req.body.id);
            if (atIndex > -1) {
                data.notes[atIndex].content = req.body.content;
                data.notes[atIndex].date = req.body.date;
                writeFile(JSON.stringify(data, null, 2), () => { res.status(200).send({ 'message': 'Note is updated' }); });
            } else {
                res.status(404).send('Note not found');
            }
        },
        true);
}