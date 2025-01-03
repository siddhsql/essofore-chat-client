const { EventSource } = require('eventsource');

// Replace with your Spring Boot endpoint
const url = 'http://localhost:8080/completion?query=what is the Matrix';
//const url = 'http://localhost:8080/test';
const eventSource = new EventSource(url);

// Handle incoming messages
eventSource.onmessage = (event) => {
    process.stdout.write(event.data);
};

// Handle errors
eventSource.onerror = (error) => {
    console.error('Error occurred:', error);
};

// Optional: Listen for specific event types
eventSource.addEventListener('custom-event', (event) => {
    console.log('Custom event received:', event.data);
});

