const apiUrl = 'https://api.green-api.com';

async function callApi(method, body = null, httpMethod = 'GET') {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const responseField = document.getElementById('responseField');

    const url = `${apiUrl}/waInstance${idInstance}/${method}/${apiTokenInstance}`;
    
    const options = {
        method: httpMethod,
        headers: body ? { 'Content-Type': 'application/json' } : {}
    };
    if (body) options.body = JSON.stringify(body);

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        responseField.value = JSON.stringify(data, null, 4); // Display result [cite: 13, 22]
    } catch (error) {
        responseField.value = "Error: " + error.message;
    }
}

function getSettings() { callApi('getSettings'); }
function getStateInstance() { callApi('getStateInstance'); }

function sendMessage() {
    const chatId = `${document.getElementById('phoneNumber').value}@c.us`;
    const message = document.getElementById('messageText').value;
    callApi('sendMessage', { chatId, message }, 'POST');
}

function sendFileByUrl() {
    const chatId = `${document.getElementById('phoneFile').value}@c.us`;
    const urlFile = document.getElementById('fileUrl').value;
    const fileName = urlFile.split('/').pop();
    callApi('sendFileByUrl', { chatId, urlFile, fileName }, 'POST');
}
