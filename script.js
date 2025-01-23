
// all element find from html file 
const greeting = document.getElementById('greeting');
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const weatherElement = document.getElementById('weather');
const themeToggleBtn = document.getElementById('themeToggle');


// Function to get user name and display greeting 

const getUserName = () => {
    let name = localStorage.getItem('name');
    if (!name) {
        name = prompt('What is your name?');
        localStorage.setItem('name', JSON.stringify(name));
    }

    const getName = JSON.parse(localStorage.getItem('name'));
    greeting.textContent = `Hello, ${getName}`;


}



// Function to update time and date 
const updateTimeAndDate = () => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    timeElement.textContent = `Time: ${time}`;
    dateElement.textContent = `Date: ${date}`;

}


// Function to fetch weather information 
const fetchWeather = async () => {
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.0060&current_weather=true');
        const data = await response.json();
        const currentWeather = data.current_weather.temperature + 'C';

        weatherElement.textContent = `Weather: ${currentWeather}`;

    } catch (error) {
        weatherElement.textContent = `Weather : Unable to fetch`;
    }


}


// Function to toggle theme 
const toggleTheme = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.body.className = newTheme;

    localStorage.setItem('theme', newTheme);
}

// Apply saved theme 
const applyTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme;
};


// initialize functions 
const init = () => {

    // getUserName function call in here 
    getUserName();

    // updateTimeAndDate function call in here 

    updateTimeAndDate();


    // fetchWeather function call in here 
    fetchWeather();



    // applyTheme function call in here 
    applyTheme();



    setInterval(() => updateTimeAndDate, 1000)

    themeToggleBtn.addEventListener('click', toggleTheme)

}

// initialize function called 
init()
