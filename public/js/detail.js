// 設施類型對照表
const facilityTypes = {
    1: "電梯設施",
    2: "一般廁所",
    3: "無障礙廁所",
    4: "哺乳室",
    6: "無線網路",
    7: "商店/餐飲",
    9: "遊客中心",
    10: "飲水機",
    11: "手機充電",
    14: "置物設施",
    16: "AED設備",
    18: "繳費機",
    19: "充電設備",
    21: "祈禱室"
};

// 獲取URL參數
const urlParams = new URLSearchParams(window.location.search);
const parkingId = urlParams.get('id');

// 載入停車場資料
fetch('../parking-data.json')
    .then(response => response.json())
    .then(data => {
        const facility = data.ParkingFacilities.find(f => f.CarParkID === parkingId);
        if (!facility) {
            throw new Error('找不到停車場資料');
        }

        // 更新返回城市列表按鈕
        document.getElementById('backToCity').href = `city.html?city=${encodeURIComponent(facility.City)}`;

        const detailHtml = `
            <h1>${facility.CarParkName.Zh_tw}</h1>
            
            <div class="info-section">
                <h2>基本資訊</h2>
                <p>地址：${facility.Address}</p>
                <p>所在地：${facility.City} ${facility.District}</p>
            </div>

            <div class="info-section">
                <h2>設施列表</h2>
                <div class="facility-grid">
                    ${facility.Facilities.map(f => `
                        <div class="facility-item">
                            <div><strong>${f.FacilityName}</strong></div>
                            <div>類型：${facilityTypes[f.FacilityType] || "其他"}</div>
                            <div>位置：${f.LocationDescription}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${facility.Description ? `
                <div class="info-section">
                    <h2>停車場說明</h2>
                    <p>${facility.Description}</p>
                </div>
            ` : ''}

            ${facility.Recommendations ? `
                <div class="recommendations">
                    <h2>特色推薦</h2>
                    <ul>
                        ${facility.Recommendations.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        `;

        document.getElementById('parkingDetail').innerHTML = detailHtml;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('parkingDetail').innerHTML = `
            <div style="color: red; text-align: center;">
                <h2>錯誤</h2>
                <p>${error.message}</p>
            </div>
        `;
    });
