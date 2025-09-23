const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

async function createRichMenu() {
  try {
    // 1. สร้างโครงสร้าง Rich Menu ในรูปแบบ JSON
    const richMenuObject = {
      size: { width: 2500, height: 1686 },
      selected: true,
      name: 'Resume Menu',
      chatBarText: 'แตะเพื่อดูเมนู',
      areas: [
        {
          bounds: { x: 0, y: 0, width: 1250, height: 843 },
          action: { type: 'message', text: 'ประวัติส่วนตัว' },
        },
        {
          bounds: { x: 1250, y: 0, width: 1250, height: 843 },
          action: { type: 'message', text: 'ทักษะ' },
        },
        {
          bounds: { x: 0, y: 843, width: 1250, height: 843 },
          action: { type: 'message', text: 'ผลงาน' },
        },
        {
          bounds: { x: 1250, y: 843, width: 1250, height: 843 },
          action: { type: 'message', text: 'ติดต่อ' },
        },
      ],
    };

    // 2. ส่งคำขอสร้าง Rich Menu และรับ Rich Menu ID
    const createResponse = await axios.post(
      'https://api.line.me/v2/bot/richmenu',
      richMenuObject,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.channelAccessToken}`,
        },
      }
    );

    const richMenuId = createResponse.data.richMenuId;
    console.log('Rich Menu ID:', richMenuId);

    // 3. อัปโหลดรูปภาพ Rich Menu
    // โค้ดส่วนนี้คือส่วนที่ถูกแก้ไขเพื่อให้ใช้งานได้กับ LINE API
    const imagePath = './linerichmenu.jpg';
    const imageBuffer = fs.readFileSync(imagePath);

    await axios.post(
      `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`,
      imageBuffer,
      {
        headers: {
          'Content-Type': 'image/jpeg',
          Authorization: `Bearer ${config.channelAccessToken}`,
        },
      }
    );

    // 4. ตั้งค่า Rich Menu ให้เป็นค่าเริ่มต้นสำหรับทุกคน
    await axios.post(
      `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.channelAccessToken}`,
        },
      }
    );

    console.log('Rich Menu ถูกตั้งค่าสำเร็จแล้ว!');
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการสร้าง Rich Menu:');
    if (error.response) {
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request:', error.request);
    } else {
      console.error('Error Message:', error.message);
    }
  }
}

createRichMenu();