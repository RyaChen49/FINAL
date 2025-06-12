// 載入停車場資料
fetch('parking-data.json')
    .then(response => response.json())
    .then(data => {
        // 依城市分組
        const cities = {};
        data.ParkingFacilities.forEach(facility => {
            if (!cities[facility.City]) {
                cities[facility.City] = [];
            }
            cities[facility.City].push(facility);
        });

        // 顯示城市卡片
        const cityList = document.getElementById('cityList');
        Object.entries(cities).forEach(([city, facilities]) => {
            const card = document.createElement('div');
            card.className = 'city-card';
            card.innerHTML = `
                <div class="city-name">${city}</div>
                <div class="parking-count">停車場數量: ${facilities.length}</div>
            `;
            card.onclick = () => {
                window.location.href = `city.html?city=${encodeURIComponent(city)}`;
            };
            cityList.appendChild(card);
        });
    })
    .catch(error => console.error('Error:', error));
