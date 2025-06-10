const fs = require('fs');
const path = require('path');

const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
};

module.exports = async (req, res) => {
    const dbPath = path.join(__dirname, 'db.json');
    let data;
    try {
        data = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    } catch (error) {
        console.error('Error reading db.json:', error);
        res.status(500).send('Error interno del servidor al leer los datos.');
        return;
    }

    const url = req.url;
    const parts = url.split('/');
    const resourceName = parts[2];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).send();
        return;
    }

    if (resourceName && data[resourceName]) {
        if (req.method === 'GET') {
            if (parts.length === 4) {
                const id = parseInt(parts[3]);
                const item = data[resourceName].find(item => item.id === id);
                if (item) {
                    res.status(200).json(item);
                } else {
                    res.status(404).send('Recurso no encontrado.');
                }
                return;
            } else if (parts.length === 3) {
                const queryString = url.split('?')[1];
                if (queryString) {
                    const queryParams = new URLSearchParams(queryString);
                    const email = queryParams.get('email');

                    if (email && resourceName === 'users') {
                        const filteredUsers = data[resourceName].filter(user => user.email === email);
                        res.status(200).json(filteredUsers);
                        return;
                    }
                }
                res.status(200).json(data[resourceName]);
                return;
            }
            res.status(404).send('Ruta de API GET no encontrada.');
            return;
        } else if (req.method === 'POST') {
            try {
                const body = await getRequestBody(req);
                const newId = (data[resourceName].length > 0
                    ? Math.max(...data[resourceName].map(item => item.id || 0))
                    : 0) + 1;
                const newItem = { id: newId, ...body };

                data[resourceName].push(newItem);

                res.status(201).json(newItem);
                return;

            } catch (error) {
                console.error('Error al procesar POST:', error);
                res.status(400).send('Solicitud POST inválida.');
                return;
            }
        } else if (req.method === 'PUT' || req.method === 'PATCH') {
            if (parts.length === 4) {
                try {
                    const id = parseInt(parts[3]);
                    if (isNaN(id)) {
                        res.status(400).send('ID de recurso no válido.');
                        return;
                    }
                    const body = await getRequestBody(req);
                    let itemIndex = data[resourceName].findIndex(item => item.id === id);

                    if (itemIndex !== -1) {
                        data[resourceName][itemIndex] = { ...data[resourceName][itemIndex], ...body, id };
                        res.status(200).json(data[resourceName][itemIndex]);
                    } else {
                        res.status(404).send('Recurso para actualizar no encontrado.');
                    }
                    return;
                } catch (error) {
                    console.error('Error al procesar PUT/PATCH:', error);
                    res.status(400).send('Solicitud PUT/PATCH inválida.');
                    return;
                }
            } else {
                res.status(404).send('Ruta de API PUT/PATCH no encontrada (falta ID).');
                return;
            }
        } else if (req.method === 'DELETE') {
            if (parts.length === 4) {
                const id = parseInt(parts[3]);
                if (isNaN(id)) {
                    res.status(400).send('ID de recurso no válido.');
                    return;
                }
                const initialLength = data[resourceName].length;
                data[resourceName] = data[resourceName].filter(item => item.id !== id);

                if (data[resourceName].length < initialLength) {
                    res.status(200).json({});
                } else {
                    res.status(404).send('Recurso para eliminar no encontrado.');
                }
                return;
            } else {
                res.status(404).send('Ruta de API DELETE no encontrada (falta ID).');
                return;
            }
        } else {
            res.status(405).send('Método no permitido para este recurso.');
            return;
        }
    } else if (url === '/api' || url === '/api/') {
        res.status(200).json(data);
        return;
    } else {
        res.status(404).send('Ruta de API no encontrada.');
        return;
    }
};