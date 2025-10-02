// index.js (โค้ดทั้งหมดในไฟล์เดียว แต่จัดระเบียบใหม่)

const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// *********************************
// *** 1. CONFIGURATION (ค่าคงที่ที่ควรแก้ไข) ***
// *********************************

const CONFIG = {
    // LINE Bot Config
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,

    // URL รูปภาพทั้งหมด (ควรใช้ URL ที่เสถียร เช่น Imgur, AWS S3 หรือ Image Hosting อื่นๆ)
    IMAGE_HERO_PROFILE: "https://i.postimg.cc/P57zN4N8/11.jpg",
    IMAGE_SCHEDULE: "https://i.postimg.cc/02c7V0Vt/1500.jpg",

    // 🆕 UPDATED: URL ตั๋วขาไป 2 ใบ (เปลี่ยนจาก GitHub เป็น iPost)
    IMAGE_TICKET_DEPARTURE_THAWORN: "https://i.postimg.cc/NG2ynNT0/Thaworn-to-DMK.jpg",
    IMAGE_TICKET_DEPARTURE_YUWADA: "https://i.postimg.cc/KYKFYWxw/Yuwada-to-DMK.jpg",
    
    IMAGE_TICKET_RETURN: "https://i.postimg.cc/kMYbC4Nd/edit.jpg",
    IMAGE_ACCOMMODATION: "https://i.postimg.cc/76TymTGq/20072400-b16d4ee81ce2dfb773af41d6e08bddf9.jpg",
    IMAGE_PORTFOLIO_1: "https://i.postimg.cc/zvmJgttW/Screenshot-2025-09-17-175022.png",
    
    // URL เว็บไซต์และ LIFF App
    URL_WEBSITE_SCHEDULE: "https://schedule-pcs0.onrender.com/",
    URL_LIFF_REGISTER: "https://liff.line.me/2008162847-jMMzgOn1", 
    URL_LIFF_SPONSOR: "https://liff.line.me/2008162847-GV9l2wmz",
    URL_LIFF_BLESSING: "https://liff.line.me/2008162847-a7gLZonM",

    // ข้อมูลติดต่อ
    PHONE_NUMBER: "083-815-2351",
    EMAIL_ADDRESS: "mawngai0001@gmail.com",
    LINE_ID: "mawzaz0002",
    GITHUB_ID: "PtrwTg",
    
    // ที่อยู่โรงแรม (สำหรับการส่ง Location Message)
    HOTEL_TITLE: 'The Quarter Ratchathewi by UHG',
    HOTEL_ADDRESS: '128/8 Phetchaburi Rd, Thung Phaya Thai, Ratchathewi, Bangkok 10400',
    HOTEL_LATITUDE: 13.754868,
    HOTEL_LONGITUDE: 100.531235,
    HOTEL_BOOKING_URL: "https://www.traveloka.com/en-th/hotel/thailand/the-quarter-ratchathewi-by-uhg-9000002437721"
};


// ตรวจสอบและตั้งค่า LINE Client
if (!CONFIG.channelAccessToken || !CONFIG.channelSecret) {
    console.error("CHANNEL_ACCESS_TOKEN หรือ CHANNEL_SECRET ไม่ถูกกำหนดในไฟล์ .env");
    process.exit(1); 
}

const clientConfig = {
    channelAccessToken: CONFIG.channelAccessToken,
    channelSecret: CONFIG.channelSecret,
};
const client = new line.Client(clientConfig);


// *********************************
// *** 2. FLEX MESSAGE & PAYLOAD FUNCTIONS ***
// *********************************

/** 2.1 ข้อมูลส่วนตัว: ประวัติส่วนตัว */
const getProfileFlex = () => ({
    type: 'flex',
    altText: 'ข้อมูลประวัติส่วนตัว',
    contents: {
        "type": "bubble",
        "hero": {
            "type": "image",
            "url": CONFIG.IMAGE_HERO_PROFILE,
            "size": "full",
            "aspectRatio": "8:10",
            "aspectMode": "cover"
        },
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                { "type": "text", "text": "เสือ", "weight": "bold", "size": "xl" },
                { "type": "text", "text": "software engineer", "size": "sm", "color": "#666666" },
                { "type": "text", "text": "สาขาวิทยาการคอมพิวเตอร์", "size": "sm", "color": "#666666", "margin": "md" },
                {
                    "type": "box", "layout": "baseline", "contents": [{ "type": "text", "text": "วันเกิด:", "size": "sm", "color": "#666666", "flex": 0 }, { "type": "text", "text": " 29/09/2544", "size": "sm", "color": "#666666", "flex": 0 }], "margin": "md"
                },
                {
                    "type": "box", "layout": "baseline", "contents": [{ "type": "text", "text": "ที่อยู่:", "size": "sm", "color": "#666666", "flex": 0 }, { "type": "text", "text": " บางกอกน้อย, กรุงเทพ", "size": "sm", "color": "#666666", "flex": 0 }], "margin": "md"
                }
            ]
        }
    }
});

/** 2.2 ข้อมูลส่วนตัว: ทักษะ */
const getSkillsFlex = () => ({
    type: 'flex',
    altText: 'ข้อมูลทักษะและความสามารถ',
    contents: {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                { "type": "text", "text": "ทักษะและความสามารถ", "weight": "bold", "size": "xl" },
                { "type": "separator", "margin": "lg" },
                {
                    "type": "box", "layout": "vertical", "margin": "lg", "spacing": "sm",
                    "contents": [
                        { "type": "text", "text": "⭐ ทักษะด้านโปรแกรมมิ่ง:", "weight": "bold", "size": "md", "margin": "md" },
                        { "type": "text", "text": "  - JavaScript (Node.js)", "size": "sm", "color": "#666666" },
                        { "type": "text", "text": "  - Python", "size": "sm", "color": "#666666" },
                        { "type": "text", "text": "  - SQL (MySQL, PostgreSQL)", "size": "sm", "color": "#666666" },
                        
                        { "type": "text", "text": "⭐ ทักษะด้าน Tools และ Frameworks:", "weight": "bold", "size": "md", "margin": "md" },
                        { "type": "text", "text": "  - LINE Messaging API", "size": "sm", "color": "#666666" },
                        { "type": "text", "text": "  - Git/GitHub, Express.js", "size": "sm", "color": "#666666" }
                    ]
                }
            ]
        }
    }
});

/** 2.3 ข้อมูลส่วนตัว: ผลงาน */
const getPortfolioFlex = () => ({
    type: 'flex',
    altText: 'ข้อมูลผลงาน',
    contents: {
        "type": "carousel",
        "contents": [
            {
                "type": "bubble",
                "hero": {
                    "type": "image", "url": CONFIG.IMAGE_PORTFOLIO_1,
                    "size": "full", "aspectRatio": "20:13", "aspectMode": "cover"
                },
                "body": {
                    "type": "box", "layout": "vertical",
                    "contents": [
                        { "type": "text", "text": "Landingpage ร้านนวดที่ออสเตรเลีย", "weight": "bold", "size": "xl" },
                        { "type": "text", "text": "การทำหน้าบ้านเว็บไซต์สำหรับร้านนวดที่ออสเตรเลียโดยจัดการตั้งแต่การออกแบบ การเขียน SEO โมเมน และการ Deploy", "size": "sm", "color": "#666666", "margin": "md", "wrap": true }
                    ]
                },
                "footer": {
                    "type": "box", "layout": "vertical", "spacing": "sm",
                    "contents": [{
                        "type": "button", "style": "link", "height": "sm",
                        "action": { "type": "uri", "label": "ดูผลงาน", "uri": "https://thainestmassage.com.au/" }
                    }]
                }
            },
            {
                "type": "bubble",
                "hero": {
                    "type": "image", "url": "https://via.placeholder.com/600x400?text=Project+Image+Placeholder", 
                    "size": "full", "aspectRatio": "20:13", "aspectMode": "cover"
                },
                "body": {
                    "type": "box", "layout": "vertical",
                    "contents": [
                        { "type": "text", "text": "ชื่อผลงานชิ้นที่ 2", "weight": "bold", "size": "xl" },
                        { "type": "text", "text": "คำอธิบายสั้นๆ เกี่ยวกับผลงานนี้", "size": "sm", "color": "#666666", "margin": "md", "wrap": true }
                    ]
                },
                "footer": {
                    "type": "box", "layout": "vertical", "spacing": "sm",
                    "contents": [{
                        "type": "button", "style": "link", "height": "sm",
                        "action": { "type": "uri", "label": "ดูผลงาน", "uri": "https://example.com/project2" }
                    }]
                }
            }
        ]
    }
});

/** 2.4 ข้อมูลส่วนตัว: ติดต่อ */
const getContactFlex = () => ({
    type: 'flex',
    altText: 'ข้อมูลติดต่อ',
    contents: {
        "type": "bubble",
        "body": {
            "type": "box", "layout": "vertical",
            "contents": [
                { "type": "text", "text": "ข้อมูลติดต่อ", "weight": "bold", "size": "xl" },
                { "type": "separator", "margin": "lg" },
                {
                    "type": "box", "layout": "vertical", "margin": "lg", "spacing": "sm",
                    "contents": [
                        { "type": "text", "text": `📞 โทร: ${CONFIG.PHONE_NUMBER}`, "size": "sm", "color": "#666666" },
                        { "type": "text", "text": `📧 Email: ${CONFIG.EMAIL_ADDRESS}`, "size": "sm", "color": "#666666" },
                        { "type": "text", "text": `📱 LINE ID: ${CONFIG.LINE_ID}`, "size": "sm", "color": "#666666" },
                        { "type": "text", "text": `💻 GitHub: ${CONFIG.GITHUB_ID}`, "size": "sm", "color": "#666666" }
                    ]
                }
            ]
        },
        "footer": {
            "type": "box", "layout": "vertical", "spacing": "sm",
            "contents": [
                { "type": "button", "style": "link", "height": "sm", "action": { "type": "uri", "label": "โทร", "uri": `tel:${CONFIG.PHONE_NUMBER.replace(/-/g, '')}` } },
                { "type": "button", "style": "link", "height": "sm", "action": { "type": "uri", "label": "แชท LINE", "uri": `https://line.me/ti/p/~${CONFIG.LINE_ID}` } },
                { "type": "button", "style": "link", "height": "sm", "action": { "type": "uri", "label": "ดู GitHub", "uri": `https://github.com/${CONFIG.GITHUB_ID}` } }
            ]
        }
    }
});

/** 2.5 ข้อมูลงาน: กำหนดการ */
const getScheduleMessages = () => {
    const scheduleImage = {
        type: 'image',
        originalContentUrl: CONFIG.IMAGE_SCHEDULE,
        previewImageUrl: CONFIG.IMAGE_SCHEDULE
    };

    const scheduleFlexMessage = {
        type: 'flex',
        altText: 'กำหนดการและตารางซ้อมรับปริญญา',
        contents: {
            "type": "bubble",
            "body": {
                "type": "box", "layout": "vertical",
                "contents": [
                    { "type": "text", "text": "🗓️ ตารางงานรับปริญญา 🎓", "weight": "bold", "size": "xl", "wrap": true },
                    { "type": "text", "text": "ดูรายละเอียดตารางซ้อม (3 ต.ค.) และวันจริง (7 ต.ค.) พร้อมเวลาที่บัณฑิตสะดวกที่สุดได้ที่เว็บไซต์ด้านล่างนี้ครับ!", "size": "sm", "color": "#666666", "wrap": true, "margin": "md" }
                ]
            },
            "footer": {
                "type": "box", "layout": "vertical",
                "contents": [{
                    "type": "button", "style": "primary", "color": "#00563b",
                    "action": { "type": "uri", "label": "ดูตารางงาน (เว็บไซต์)", "uri": CONFIG.URL_WEBSITE_SCHEDULE }
                }]
            }
        }
    };
    // ส่งทั้งรูปและ Flex Message ในคราวเดียว
    return [scheduleImage, scheduleFlexMessage];
};

/** 2.6 ข้อมูลงาน: ลงทะเบียน */
const getRegisterMessage = () => ({
    type: 'flex',
    altText: 'ลงทะเบียนเข้าร่วมงานรับปริญญา',
    contents: {
        "type": "bubble",
        "body": {
            "type": "box", "layout": "vertical",
            "contents": [
                { "type": "text", "text": "ลงทะเบียนเข้าร่วมงาน", "weight": "bold", "size": "xl", "wrap": true },
                { "type": "text", "text": "คลิกที่ปุ่มด้านล่างเพื่อเข้าสู่ระบบลงทะเบียน กรุณากรอกข้อมูลเพื่อความสะดวกในการจัดเตรียมงาน", "size": "sm", "color": "#666666", "wrap": true, "margin": "md" }
            ]
        },
        "footer": {
            "type": "box", "layout": "vertical",
            "contents": [{
                "type": "button", "style": "primary", "color": "#00563b",
                "action": { "type": "uri", "label": "ลงทะเบียน", "uri": CONFIG.URL_LIFF_REGISTER }
            }]
        }
    }
});

/** 2.7 ข้อมูลงาน: สนับสนุน */
const getSponsorMessage = () => ({
    type: 'flex',
    altText: 'มาขอสปอนเซอร์หน่อยน้า',
    contents: {
        "type": "bubble",
        "body": {
            "type": "box", "layout": "vertical",
            "contents": [
                { "type": "text", "text": "📣 ขอแวะมาขอสปอนเซอร์หน่อยน้า 😆", "weight": "bold", "size": "xl", "wrap": true, "color": "#FF6B6B" },
                { "type": "text", "text": "🙏 ขอบคุณมากๆ ที่อยากมาสนับสนุนค่าใช้จ่ายสำหรับงานรับปริญญาของเค้านะครับ!", "size": "sm", "color": "#666666", "wrap": true, "margin": "md" },
                { "type": "text", "text": "💰 เงินที่ได้จะถูกนำไปใช้เป็นค่า **เช่าชุดครุย** สุดหล่อ และ **ค่าใช้จ่ายจิปาถะในวันงาน** ส่วนที่เหลือ เค้าจะนำไปใช้ในการ **ฉลองจบอย่างมีความสุข** แน่นอนฮะ!", "size": "sm", "color": "#333333", "wrap": true, "margin": "lg" },
                { "type": "separator", "margin": "lg" }
            ]
        },
        "footer": {
            "type": "box", "layout": "vertical", "spacing": "sm",
            "contents": [{
                "type": "button", "style": "primary", "color": "#F8B400",
                "action": { "type": "uri", "label": "โอนเงิน & แนบสลิปที่นี่เลย 🥳", "uri": CONFIG.URL_LIFF_SPONSOR }
            }]
        }
    }
});

/** 2.8 ข้อมูลงาน: อวยพร */
const getBlessingMessage = () => ({
    type: 'flex',
    altText: 'เขียน/แก้ไขคำอวยพร',
    contents: {
        "type": "bubble",
        "body": {
            "type": "box", "layout": "vertical",
            "contents": [
                { "type": "text", "text": "💌 ส่งคำอวยพรให้นิสิต", "weight": "bold", "size": "xl", "wrap": true },
                { "type": "text", "text": "ท่านสามารถเขียนคำอวยพรเพื่อร่วมแสดงความยินดีในงานรับปริญญาได้ที่นี่ครับ", "size": "sm", "color": "#666666", "wrap": true, "margin": "md" },
                { "type": "text", "text": "แต่ละ LINE ID สามารถส่งได้ 1 ข้อความเท่านั้น (สามารถแก้ไขหรือลบได้ในภายหลัง)", "size": "xs", "color": "#ff0000", "wrap": true, "margin": "lg" }
            ]
        },
        "footer": {
            "type": "box", "layout": "vertical", "spacing": "sm",
            "contents": [{
                "type": "button", "style": "primary",
                "action": { "type": "uri", "label": "เขียน/แก้ไข คำอวยพร", "uri": CONFIG.URL_LIFF_BLESSING }
            }]
        }
    }
});

/** 2.9 เมนูย่อย: ตั๋วเครื่องบิน (Quick Reply Sub-Menu) */
const getTicketSubMenu = () => ({
    type: 'text',
    text: "✈️ ข้อมูลตั๋วเครื่องบิน\n\nกรุณาเลือกเที่ยวบินที่ต้องการดูรายละเอียด โดยกดที่ปุ่มด้านล่างนี้ได้เลยครับ:",
    quickReply: {
        items: [
            { type: 'action', action: { type: 'message', label: '✈️ ขาไป 6 ต.ค.', text: 'ตั๋วขาไป' } },
            { type: 'action', action: { type: 'message', label: '✈️ ขากลับ 7 ต.ค.', text: 'ตั๋วขากลับ' } }
        ]
    }
});

/** 2.10 ข้อมูลงาน: ตั๋วขาไป (Text Message + Image Messages แทน Flex Carousel) */
const getDepartureTicket = () => ([
    {
        type: 'text',
        text: `✈️ ตั๋วเครื่องบินขาไป (One-way)\n\n✅ วันที่: 6 ตุลาคม 2568 (จันทร์)\n✅ สายการบิน: Thai AirAsia (FD 3189)\n✅ เส้นทาง: นครศรีธรรมราช (NST) -> ดอนเมือง (DMK)\n✅ เวลาออกเดินทาง: 08:35 น.\n✅ ผู้โดยสาร: คุณถาวร ดวงมาก (19F) และ คุณยุวดา ดวงมาก (19E)\n\nกรุณาใช้รูปภาพด้านล่างเป็น Boarding Pass และเผื่อเวลาไปสนามบินก่อนเวลาบอร์ดดิ้ง (07:55 น.) ด้วยนะครับ/คะ!`,
    },
    {
        type: 'image',
        originalContentUrl: CONFIG.IMAGE_TICKET_DEPARTURE_THAWORN,
        previewImageUrl: CONFIG.IMAGE_TICKET_DEPARTURE_THAWORN,
    },
    {
        type: 'image',
        originalContentUrl: CONFIG.IMAGE_TICKET_DEPARTURE_YUWADA,
        previewImageUrl: CONFIG.IMAGE_TICKET_DEPARTURE_YUWADA,
    },
]);


/** 2.11 ข้อมูลงาน: ตั๋วขากลับ (รูปภาพ) */
const getReturnTicket = () => ({
    type: 'image',
    originalContentUrl: CONFIG.IMAGE_TICKET_RETURN,
    previewImageUrl: CONFIG.IMAGE_TICKET_RETURN
});

/** 2.12 ข้อมูลงาน: ที่พัก (Flex Message + Location) */
const getAccommodation = () => ([
    {
        type: 'flex',
        altText: `ข้อมูลที่พัก ${CONFIG.HOTEL_TITLE}`,
        contents: {
            "type": "bubble",
            "hero": { "type": "image", "url": CONFIG.IMAGE_ACCOMMODATION, "size": "full", "aspectRatio": "20:13", "aspectMode": "cover" },
            "body": {
                "type": "box", "layout": "vertical", "paddingAll": "sm",
                "contents": [
                    { "type": "text", "text": CONFIG.HOTEL_TITLE, "weight": "bold", "size": "xl", "wrap": true },
                    {
                        "type": "box", "layout": "vertical", "margin": "sm", "spacing": "sm",
                        "contents": [{
                            "type": "box", "layout": "baseline", "spacing": "sm",
                            "contents": [
                                { "type": "text", "text": "ที่อยู่", "color": "#aaaaaa", "size": "sm", "flex": 0 },
                                { "type": "text", "text": CONFIG.HOTEL_ADDRESS, "wrap": true, "color": "#666666", "size": "sm", "flex": 1 }
                            ]
                        }]
                    }
                ]
            },
            "footer": {
                "type": "box", "layout": "vertical", "spacing": "sm",
                "contents": [{
                    "type": "button", "style": "link", "height": "sm",
                    "action": { "type": "uri", "label": "ดูรายละเอียดและจองที่พัก", "uri": CONFIG.HOTEL_BOOKING_URL }
                }]
            }
        }
    },
    { type: 'text', text: 'คุณสามารถกดดูแผนที่ด้านล่างเพื่อนำทางได้เลยครับ' },
    {
        type: 'location',
        title: CONFIG.HOTEL_TITLE,
        address: CONFIG.HOTEL_ADDRESS,
        latitude: CONFIG.HOTEL_LATITUDE,
        longitude: CONFIG.HOTEL_LONGITUDE
    }
]);

/** 2.13 เมนูย่อย: เมนูงานรับปริญญา (Carousel Flex Message) */
const getGraduationMenu = () => ({
    type: 'flex',
    altText: 'เมนูหลักงานรับปริญญา',
    contents: {
        type: 'carousel',
        contents: [
            // Bubble 1: กำหนดการ
            { "type": "bubble", "body": { "type": "box", "layout": "vertical", "contents": [{ "type": "text", "text": "🗓️ กำหนดการ", "weight": "bold", "size": "xl" }, { "type": "text", "text": "ดูตารางซ้อม (3 ต.ค.) และวันจริง (7 ต.ค.)", "size": "sm", "color": "#666666", "wrap": true, "margin": "sm" }] }, "footer": { "type": "box", "layout": "vertical", "contents": [{ "type": "button", "style": "primary", "color": "#00563b", "action": { "type": "message", "label": "ดูตารางงาน", "text": "กำหนดการ" } }] } },
            // Bubble 2: ลงทะเบียน
            { "type": "bubble", "body": { "type": "box", "layout": "vertical", "contents": [{ "type": "text", "text": "📝 ลงทะเบียน", "weight": "bold", "size": "xl" }, { "type": "text", "text": "บันทึกชื่อผู้ร่วมงานและเบอร์ติดต่อ", "size": "sm", "color": "#666666", "wrap": true, "margin": "sm" }] }, "footer": { "type": "box", "layout": "vertical", "contents": [{ "type": "button", "style": "primary", "color": "#00563b", "action": { "type": "message", "label": "ลงทะเบียน", "text": "ลงทะเบียน" } }] } },
            // Bubble 3: สนับสนุน
            { "type": "bubble", "body": { "type": "box", "layout": "vertical", "contents": [{ "type": "text", "text": "💰 สนับสนุน", "weight": "bold", "size": "xl" }, { "type": "text", "text": "มาขอสปอนเซอร์เป็นค่าเช่าชุดครุยและค่าใช้จ่ายในงานครับ!", "size": "sm", "color": "#666666", "wrap": true, "margin": "sm" }] }, "footer": { "type": "box", "layout": "vertical", "contents": [{ "type": "button", "style": "primary", "color": "#F8B400", "action": { "type": "message", "label": "ร่วมสนับสนุน", "text": "สนับสนุน" } }] } },
            // Bubble 4: อวยพร
            { "type": "bubble", "body": { "type": "box", "layout": "vertical", "contents": [{ "type": "text", "text": "💌 อวยพร", "weight": "bold", "size": "xl" }, { "type": "text", "text": "เขียนคำอวยพรแสดงความยินดีในความสำเร็จ", "size": "sm", "color": "#666666", "wrap": true, "margin": "sm" }] }, "footer": { "type": "box", "layout": "vertical", "contents": [{ "type": "button", "style": "primary", "action": { "type": "message", "label": "เขียนคำอวยพร", "text": "อวยพร" } }] } },
            // Bubble 5: ตั๋วและที่พัก (รวมกัน)
            { "type": "bubble", "body": { "type": "box", "layout": "vertical", "contents": [{ "type": "text", "text": "🏨 ที่พัก / ✈️ ตั๋ว", "weight": "bold", "size": "xl" }, { "type": "text", "text": "ข้อมูลที่พักและการเดินทางสำหรับครอบครัว", "size": "sm", "color": "#666666", "wrap": true, "margin": "sm" }] }, "footer": { "type": "box", "layout": "vertical", "spacing": "sm", "contents": [{ "type": "button", "style": "link", "height": "sm", "action": { "type": "message", "label": "ดูที่พัก 🏨", "text": "ที่พัก" } }, { "type": "button", "style": "link", "height": "sm", "action": { "type": "message", "label": "ดูตั๋วเครื่องบิน ✈️", "text": "ตั๋วเครื่องบิน" } }] } }
        ]
    }
});

/** 2.14 Default Catch-All */
const getDefaultMenu = () => ({
    type: 'text',
    text: '🤖 ยินดีต้อนรับครับ!\n\nท่านสามารถเข้าถึงเมนูต่างๆ ได้ง่ายที่สุดผ่าน **Rich Menu (เมนูภาพด้านล่างจอ)** หรือเลือกหัวข้อหลักจาก Quick Reply ด้านล่างนี้ได้เลยครับ:',
    quickReply: {
        items: [
            { type: 'action', action: { type: 'message', label: 'เมนูงานรับปริญญา 🎓', text: 'เมนูงานรับปริญญา' } },
            { type: 'action', action: { type: 'message', label: 'ข้อมูลส่วนตัว 👤', text: 'ประวัติส่วนตัว' } }
        ]
    }
});

/** 2.15 เมนูข้อมูลส่วนตัว (แนะนำให้ใช้ Rich Menu) */
const getInfoSubMenu = () => ({
    type: 'text',
    text: '👤 **ข้อมูลส่วนตัว**\n\nสามารถเลือกดูข้อมูลหลักทั้งหมด (ประวัติ, ทักษะ, ผลงาน, ติดต่อ) ได้ที่ **Rich Menu (เมนูภาพด้านล่างจอ)** เลยครับ!',
});


// *********************************
// *** 3. MESSAGE HANDLERS (LOGIC) ***
// *********************************

// Object/Map สำหรับแมปข้อความกับฟังก์ชันการตอบกลับ
const menuHandlers = {
    // ข้อมูลส่วนตัว
    'ประวัติส่วนตัว': getProfileFlex,
    'ทักษะ': getSkillsFlex,
    'ผลงาน': getPortfolioFlex,
    'ติดต่อ': getContactFlex,
    
    // ข้อมูลงานรับปริญญา
    'กำหนดการ': getScheduleMessages,
    'ลงทะเบียน': getRegisterMessage,
    'สนับสนุน': getSponsorMessage,
    'อวยพร': getBlessingMessage,
    'ที่พัก': getAccommodation,
    
    // Sub-Menu
    'ตั๋วเครื่องบิน': getTicketSubMenu,
    'ตั๋วขาไป': getDepartureTicket, // ใช้งาน Text + Images ตัวใหม่
    'ตั๋วขากลับ': getReturnTicket,
    'เมนูข้อมูลส่วนตัว': getInfoSubMenu,
    'เมนูงานรับปริญญา': getGraduationMenu
};

/**
 * ฟังก์ชันในการจัดการข้อความที่ผู้ใช้ส่งมา
 * @param {object} event - LINE event object
 */
function handleMessage(event) {
    const userMessage = event.message.text;

    // 1. ตรวจสอบเมนูที่ตรง
    if (menuHandlers[userMessage]) {
        // เรียกใช้ฟังก์ชันที่เกี่ยวข้องเพื่อสร้าง Payload
        const replyPayload = menuHandlers[userMessage]();
        return client.replyMessage(event.replyToken, replyPayload);
    }
    
    // 2. ถ้าไม่ตรงกับเมนูใดๆ ให้ตอบกลับ Default
    return client.replyMessage(event.replyToken, getDefaultMenu());
}

/**
 * จัดการ Follow Event (เหตุการณ์ติดตาม)
 * ปล่อยให้ Greeting Message ใน LINE OA Manager จัดการแทน
 */
function handleFollow(event) {
    return Promise.resolve(null);
}

/**
 * ฟังก์ชันหลักในการจัดการเหตุการณ์ (Events)
 */
function handleEvent(event) {
    if (event.type === 'message' && event.message.type === 'text') {
        return handleMessage(event);
    } 
    
    if (event.type === 'follow') {
        return handleFollow(event);
    }
    
    // จัดการ Event อื่นๆ ที่เราไม่สนใจ
    return Promise.resolve(null);
}


// *********************************
// *** 4. WEBHOOK & START SERVER ***
// *********************************

// Middleware สำหรับ LINE Bot Webhook
app.post('/webhook', line.middleware(clientConfig), (req, res) => {
    // ใช้ Promise.all เพื่อจัดการหลายอีเวนต์พร้อมกัน
    Promise.all(req.body.events.map(event => handleEvent(event)))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// เริ่มต้น Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
