const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 設置靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));

// 啟動服務器
app.listen(port, () => {
    console.log(`服務器運行在 http://localhost:${port}`);
});
