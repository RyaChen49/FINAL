// 獲取URL參數
const urlParams = new URLSearchParams(window.location.search);
const city = urlParams.get('city');

// 設定頁面標題
document.getElementById('cityTitle').textContent = `${city}停車場列表`;

// 載入停車場資料
fetch('../parking-data.json')
    .then(response => response.json())
    .then(data => {
        const parkingList = document.getElementById('parkingList');
        const cityFacilities = data.ParkingFacilities.filter(f => f.City === city);

        cityFacilities.forEach(facility => {
            const card = document.createElement('div');
            card.className = 'parking-card';
            
            // 計算主要設施
            const mainFacilities = facility.Facilities
                .filter(f => [2, 3, 4, 7, 9].includes(f.FacilityType))
                .map(f => f.FacilityName)
                .slice(0, 3);

            card.innerHTML = `
                <div class="parking-name">${facility.CarParkName.Zh_tw}</div>
                <div class="parking-info">
                    <div>地址：${facility.Address}</div>
                    <div>主要設施：</div>
                    <ul class="facility-list">
                        ${mainFacilities.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
                <a href="../detail.html?id=${facility.CarParkID}" class="more-info">查看詳細資訊</a>
            `;
            parkingList.appendChild(card);
        });
    })
    .catch(error => console.error('Error:', error));
