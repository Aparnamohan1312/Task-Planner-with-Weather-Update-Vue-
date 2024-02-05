
const app = new Vue({
    el: '#app',
    data: {
        newTask: '',
        tasks: [],
        weather: null,
        apiKey: 'API_KEY',//user's key
    },
    created() {
        this.getWeather();
    },
    methods: {
        addTask() {
            if (this.newTask) {
                this.tasks.push({ text: this.newTask, completed: false, datetime: null });
                this.newTask = '';
            }
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
        },
        completeTask(index) {
            this.tasks[index].completed = true;
            this.tasks[index].datetime = new Date().toLocaleString();
        },
        getWeather() {
            // a valid API key from tomorrow.io
            const apiUrl = `https://api.tomorrow.io/v4/timelines?location=MountainView&fields=temperature_2m,precipitationProbability&apikey=${this.apiKey}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    this.weather = {
                        temperature: data.data.timelines[0].intervals[0].values.temperature_2m,
                        precipitation: data.data.timelines[0].intervals[0].values.precipitationProbability,
                    };
                })
                .catch(error => console.error('Error fetching weather:', error));
        },
    },
});

