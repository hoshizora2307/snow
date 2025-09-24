const API_KEY = 'c87064f29ceb28115ccf465338fd12ba'; // ★ここにあなたのAPIキーを貼り付けてください
const city = 'Yamanouchi'; // 横手山がある山ノ内町を指定
const snowDepthUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=Yamanouchi&appid=YOUR_API_KEY_HERE&lang=ja&units=metric';

// APIキーを適切に設定してください
const OPENWEATHERMAP_API_KEY = 'c87064f29ceb28115ccf465338fd12ba';

document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData();
    updateTime();
});

function updateTime() {
    const now = new Date();
    const formattedTime = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}時${now.getMinutes()}分更新`;
    document.getElementById('update-time').textContent = formattedTime;
}

async function fetchWeatherData() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHERMAP_API_KEY}&lang=ja&units=metric`);
        if (!response.ok) {
            throw new Error('天気情報を取得できませんでした。');
        }
        const data = await response.json();

        // 天候情報の表示
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('temp-base').textContent = `${Math.round(data.main.temp)}°C`;

        // 積雪情報のダミーデータ
        // OpenWeatherMapのAPIは積雪量のリアルタイムデータを提供していないため、今回はダミーの値を設定します。
        // 実際のアプリでは、横手山スキー場が提供するAPIや手動更新の仕組みが必要です。
        const dummySnowDepth = Math.floor(Math.random() * (200 - 150 + 1) + 150); // 150-200cmのランダムな値
        const dummySnowChange = Math.floor(Math.random() * 20); // 0-20cmのランダムな値

        document.getElementById('snow-depth').textContent = `${dummySnowDepth} cm`;
        document.getElementById('snow-change').textContent = `${dummySnowChange} cm`;

        // 山頂気温のダミーデータ
        const dummySummitTemp = Math.round(data.main.temp - (Math.random() * 5 + 3)); // 山麓より3-8度低いランダムな値
        document.getElementById('temp-summit').textContent = `${dummySummitTemp}°C`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('情報取得中にエラーが発生しました。');
    }
}
