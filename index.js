const express = require('express');
const line = require('@line/bot-sdk');
// ตรวจสอบให้แน่ใจว่าได้ติดตั้ง dotenv: npm install dotenv
require('dotenv').config();

const app = express();
// ใช้ process.env.PORT สำหรับ Render หรือ 3000 เป็นค่าเริ่มต้น
const port = process.env.PORT || 3000;

const config = {
  // **!!! ต้องกำหนดค่าเหล่านี้ในไฟล์ .env !!!**
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// ตรวจสอบว่ามี Access Token และ Secret หรือไม่
if (!config.channelAccessToken || !config.channelSecret) {
    console.error("CHANNEL_ACCESS_TOKEN หรือ CHANNEL_SECRET ไม่ถูกกำหนดในไฟล์ .env");
    // ออกจากการทำงานของแอปพลิเคชันอย่างเร็วเพื่อให้ Render ตรวจจับปัญหาได้
    process.exit(1); 
}

const client = new line.Client(config);

// Middleware สำหรับ LINE Bot Webhook
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// ฟังก์ชันสำหรับจัดการเหตุการณ์ (Events)
function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    const userMessage = event.message.text;

    // *********************************
    // *** Case: ประวัติส่วนตัว ***
    // *********************************
    if (userMessage === 'ประวัติส่วนตัว') {
      // **หมายเหตุ: ควรเปลี่ยน URL รูปภาพ (Hero Image) ไปใช้โฮสติ้งที่ถาวร**
      const profileFlexMessage = {
        type: 'flex',
        altText: 'ข้อมูลประวัติส่วนตัว',
        contents: {
          "type": "bubble",
          "hero": {
            "type": "image",
            "url": "https://i.postimg.cc/P57zN4N8/11.jpg",
            "size": "full",
            "aspectRatio": "8:10",
            "aspectMode": "cover"
          },
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "text",
              "text": "เสือ",
              "weight": "bold",
              "size": "xl"
            }, {
              "type": "box",
              "layout": "vertical",
              "contents": [{
                "type": "text",
                "text": "นักศึกษาจบใหม่",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "สาขาวิทยาการคอมพิวเตอร์",
                "size": "sm",
                "color": "#666666",
                "margin": "md"
              }, {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                  "type": "text",
                  "text": "วันเกิด:",
                  "size": "sm",
                  "color": "#666666",
                  "flex": 0
                }, {
                  "type": "text",
                  "text": " 29/09/2544",
                  "size": "sm",
                  "color": "#666666",
                  "flex": 0
                }],
                "margin": "md"
              }, {
                "type": "box",
                "layout": "baseline",
                "contents": [{
                  "type": "text",
                  "text": "ที่อยู่:",
                  "size": "sm",
                  "color": "#666666",
                  "flex": 0
                }, {
                  "type": "text",
                  "text": " บางกอกน้อย, กรุงเทพ",
                  "size": "sm",
                  "color": "#666666",
                  "flex": 0
                }],
                "margin": "md"
              }]
            }]
          }
        }
      };
      return client.replyMessage(event.replyToken, profileFlexMessage);
    
    // *********************************
    // *** Case: ทักษะ ***
    // *********************************
    } else if (userMessage === 'ทักษะ') {
      const skillsFlexMessage = {
        type: 'flex',
        altText: 'ข้อมูลทักษะและความสามารถ',
        contents: {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "text",
              "text": "ทักษะและความสามารถ",
              "weight": "bold",
              "size": "xl"
            }, {
              "type": "separator",
              "margin": "lg"
            }, {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [{
                "type": "text",
                "text": "⭐ ทักษะด้านโปรแกรมมิ่ง:",
                "weight": "bold",
                "size": "md",
                "margin": "md"
              }, {
                "type": "text",
                "text": "  - JavaScript (Node.js)",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - Python",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - PHP (เคยศึกษาแต่ไม่เคยใช้ทำงานจริง)",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - SQL (MySQL, PostgreSQL)",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "⭐ ทักษะด้าน Tools และ Frameworks:",
                "weight": "bold",
                "size": "md",
                "margin": "md"
              }, {
                "type": "text",
                "text": "  - LINE Messaging API",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - LINE Official Account Manager",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - Git/GitHub",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - Express.js",
                "size": "sm",
                "color": "#666666"
              }]
            }]
          }
        }
      };
      return client.replyMessage(event.replyToken, skillsFlexMessage);
    
    // *********************************
    // *** Case: ผลงาน ***
    // *********************************
    } else if (userMessage === 'ผลงาน') {
      // **หมายเหตุ: ควรเปลี่ยน URL รูปภาพ (Hero Image) ไปใช้โฮสติ้งที่ถาวร**
      const portfolioFlexMessage = {
        type: 'flex',
        altText: 'ข้อมูลผลงาน',
        contents: {
          "type": "carousel",
          "contents": [{
            "type": "bubble",
            "hero": {
              "type": "image",
              "url": "https://i.postimg.cc/zvmJgttW/Screenshot-2025-09-17-175022.png",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [{
                "type": "text",
                "text": "Landingpage ร้านนวดที่ออสเตรเลีย",
                "weight": "bold",
                "size": "xl"
              }, {
                "type": "text",
                "text": "การทำหน้าบ้านเว็บไซต์สำหรับร้านนวดที่ออสเตรเลียโดยจัดการตั้งแต่การออกแบบ การเขียน SEO โมเมน และการ Deploy",
                "size": "sm",
                "color": "#666666",
                "margin": "md",
                "wrap": true
              }]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [{
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "ดูผลงาน",
                  "uri": "https://thainestmassage.com.au/"
                }
              }]
            }
          }, {
            "type": "bubble",
            "hero": {
              "type": "image",
              // **!!! Placeholder: กรุณาเปลี่ยนเป็น URL รูปภาพผลงานชิ้นที่ 2 ของคุณ !!!**
              "url": "https://via.placeholder.com/600x400?text=Project+Image+Placeholder", 
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "contents": [{
                "type": "text",
                "text": "ชื่อผลงานชิ้นที่ 2",
                "weight": "bold",
                "size": "xl"
              }, {
                "type": "text",
                "text": "คำอธิบายสั้นๆ เกี่ยวกับผลงานนี้",
                "size": "sm",
                "color": "#666666",
                "margin": "md",
                "wrap": true
              }]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [{
                "type": "button",
                "style": "link",
                "height": "sm",
                "action": {
                  "type": "uri",
                  "label": "ดูผลงาน",
                  "uri": "https://example.com/project2"
                }
              }]
            }
          }]
        }
      };
      return client.replyMessage(event.replyToken, portfolioFlexMessage);
    
    // *********************************
    // *** Case: ติดต่อ ***
    // *********************************
    } else if (userMessage === 'ติดต่อ') {
      const contactFlexMessage = {
        type: 'flex',
        altText: 'ข้อมูลติดต่อ',
        contents: {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "text",
              "text": "ข้อมูลติดต่อ",
              "weight": "bold",
              "size": "xl"
            }, {
              "type": "separator",
              "margin": "lg"
            }, {
              "type": "box",
              "layout": "vertical",
              "margin": "lg",
              "spacing": "sm",
              "contents": [{
                "type": "text",
                "text": "📞 โทร: 083-815-2351",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "📧 Email: mawngai0001@gmail.com",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "📱 LINE ID: mawzaz0002",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "💻 GitHub: PtrwTg",
                "size": "sm",
                "color": "#666666"
              }]
            }]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [{
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "โทร",
                "uri": "tel:0838152351"
              }
            }, {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "แชท LINE",
                "uri": "https://line.me/ti/p/~mawzaz0002"
              }
            }, {
              "type": "button",
              "style": "link",
              "height": "sm",
              "action": {
                "type": "uri",
                "label": "ดู GitHub",
                "uri": "https://github.com/PtrwTg"
              }
            }]
          }
        }
      };
      return client.replyMessage(event.replyToken, contactFlexMessage);
    
    // *********************************
    // *** Case: กำหนดการ (ปรับปรุงแล้ว) ***
    // *********************************
    } else if (userMessage === 'กำหนดการ') {
      // **ใช้ Flex Message พร้อมปุ่ม URI ไปยังเว็บไซต์กำหนดการ**
      const scheduleFlexMessage = {
        type: 'flex',
        altText: 'กำหนดการและตารางซ้อมรับปริญญา',
        contents: {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "text",
              "text": "🗓️ ตารางงานรับปริญญา 🎓",
              "weight": "bold",
              "size": "xl",
              "wrap": true
            }, {
              "type": "text",
              "text": "ดูรายละเอียดตารางซ้อม (3 ต.ค.) และวันจริง (7 ต.ค.) พร้อมเวลาที่บัณฑิตสะดวกที่สุดได้ที่เว็บไซต์ด้านล่างนี้ครับ!",
              "size": "sm",
              "color": "#666666",
              "wrap": true,
              "margin": "md"
            }]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "button",
              "style": "primary",
              "color": "#00563b", // สีเขียวเข้มตามธีม มก.
              "action": {
                "type": "uri",
                "label": "ดูตารางงาน (เว็บไซต์)",
                "uri": "https://schedule-pcs0.onrender.com/" // **URL เว็บไซต์ของคุณ**
              }
            }]
          }
        }
      };
      return client.replyMessage(event.replyToken, scheduleFlexMessage);
    
    // *********************************
    // *** Case: ลงทะเบียน ***
    // *********************************
    } else if (userMessage === 'ลงทะเบียน') {
      // **!!! กรุณาเปลี่ยนเป็น LIFF ID สำหรับลงทะเบียนของคุณ !!!**
      const liffUrl = 'https://liff.line.me/2008162847-jMMzgOn1'; 
      const registerMessage = {
        type: 'flex',
        altText: 'ลงทะเบียนเข้าร่วมงานรับปริญญา',
        contents: {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "text",
              "text": "ลงทะเบียนเข้าร่วมงาน",
              "weight": "bold",
              "size": "xl",
              "wrap": true
            }, {
              "type": "text",
              "text": "คลิกที่ปุ่มด้านล่างเพื่อเข้าสู่ระบบลงทะเบียน กรุณากรอกข้อมูลเพื่อความสะดวกในการจัดเตรียมงาน",
              "size": "sm",
              "color": "#666666",
              "wrap": true,
              "margin": "md"
            }]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "button",
              "style": "primary",
              "action": {
                "type": "uri",
                "label": "ลงทะเบียน",
                "uri": liffUrl
              }
            }]
          }
        }
      };
      return client.replyMessage(event.replyToken, registerMessage);
    
    // *********************************
    // *** Case: สนับสนุน ***
    // *********************************
    } else if (userMessage === 'สนับสนุน') { 
      const sponsorFlexMessage = {
        type: 'flex',
        altText: 'มาขอสปอนเซอร์หน่อยน้า',
        contents: {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [{
              "type": "text",
              "text": "📣 ขอแวะมาขอสปอนเซอร์หน่อยน้า 😆",
              "weight": "bold",
              "size": "xl",
              "wrap": true,
              "color": "#FF6B6B"
            }, {
              "type": "text",
              "text": "🙏 ขอบคุณมากๆ ที่อยากมาสนับสนุนค่าใช้จ่ายสำหรับงานรับปริญญาของเค้านะครับ!",
              "size": "sm",
              "color": "#666666",
              "wrap": true,
              "margin": "md"
            }, {
              "type": "text",
              "text": "💰 เงินที่ได้จะถูกนำไปใช้เป็นค่า **เช่าชุดครุย** สุดหล่อ และ **ค่าใช้จ่ายจิปาถะในวันงาน** ส่วนที่เหลือ เค้าจะนำไปใช้ในการ **ฉลองจบอย่างมีความสุข** แน่นอนฮะ!",
              "size": "sm",
              "color": "#333333",
              "wrap": true,
              "margin": "lg"
            }, {
              "type": "separator",
              "margin": "lg"
            }]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [{
              "type": "button",
              "style": "primary",
              "color": "#F8B400", // สีเหลือง/ทองสำหรับปุ่มสนับสนุน
              "action": {
                "type": "uri",
                "label": "โอนเงิน & แนบสลิปที่นี่เลย 🥳",
                // **!!! กรุณาเปลี่ยนเป็น LIFF ID สำหรับแนบสลิปของคุณ !!!**
                "uri": "https://liff.line.me/2008162847-GV9l2wmz" 
              }
            }]
          }
        }
      };
      return client.replyMessage(event.replyToken, sponsorFlexMessage);
    
    // *********************************
    // *** Case: อวยพร ***
    // *********************************
    } else if (userMessage === 'อวยพร') {
      // **!!! กรุณาเปลี่ยนเป็น LIFF ID สำหรับหน้าจออวยพรของคุณ !!!**
      const liffUrl = 'https://liff.line.me/2008162847-a7gLZonM';
      
      const blessingFlexMessage = {
        type: 'flex',
        altText: 'เขียน/แก้ไขคำอวยพร',
        contents: {
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "💌 ส่งคำอวยพรให้นิสิต",
                "weight": "bold",
                "size": "xl",
                "wrap": true
              },
              {
                "type": "text",
                "text": "ท่านสามารถเขียนคำอวยพรเพื่อร่วมแสดงความยินดีในงานรับปริญญาได้ที่นี่ครับ",
                "size": "sm",
                "color": "#666666",
                "wrap": true,
                "margin": "md"
              },
              {
                "type": "text",
                "text": "แต่ละ LINE ID สามารถส่งได้ 1 ข้อความเท่านั้น (สามารถแก้ไขหรือลบได้ในภายหลัง)",
                "size": "xs",
                "color": "#ff0000",
                "wrap": true,
                "margin": "lg"
              }
            ]
          },
          "footer": {
            "type": "box",
            "layout": "vertical",
            "spacing": "sm",
            "contents": [
              {
                "type": "button",
                "style": "primary",
                "action": {
                  "type": "uri",
                  "label": "เขียน/แก้ไข คำอวยพร",
                  "uri": liffUrl
                }
              }
            ]
          }
        }
      };
      return client.replyMessage(event.replyToken, blessingFlexMessage);

    // *********************************
    // *** Case: ตั๋วเครื่องบิน (Sub-Menu) ***
    // *********************************
    } else if (userMessage === 'ตั๋วเครื่องบิน') {
        // Quick Reply Sub-Menu สำหรับตั๋วเครื่องบิน
        const ticketOptions = {
            type: 'text',
            text: "✈️ ข้อมูลตั๋วเครื่องบิน\n\nกรุณาเลือกเที่ยวบินที่ต้องการดูรายละเอียด โดยกดที่ปุ่มด้านล่างนี้ได้เลยครับ:",
            quickReply: {
                items: [{
                    type: 'action',
                    action: {
                        type: 'message',
                        label: '✈️ ขาไป 6 ต.ค.', 
                        text: 'ตั๋วขาไป'
                    }
                }, {
                    type: 'action',
                    action: {
                        type: 'message',
                        label: '✈️ ขากลับ 7 ต.ค.', 
                        text: 'ตั๋วขากลับ'
                    }
                }]
            }
        };
        return client.replyMessage(event.replyToken, ticketOptions);
    
    // *********************************
    // *** Case: ตั๋วขาไป ***
    // *********************************
    } else if (userMessage === 'ตั๋วขาไป') {
      // **หมายเหตุ: ควรเปลี่ยน URL รูปภาพไปใช้โฮสติ้งที่ถาวร**
      const departureTicket = {
        type: 'image',
        originalContentUrl: 'https://i.postimg.cc/Dz1ryTvP/edit.jpg',
        previewImageUrl: 'https://i.postimg.cc/Dz1ryTvP/edit.jpg'
      };
      return client.replyMessage(event.replyToken, departureTicket);
    
    // *********************************
    // *** Case: ตั๋วขากลับ ***
    // *********************************
    } else if (userMessage === 'ตั๋วขากลับ') {
      // **หมายเหตุ: ควรเปลี่ยน URL รูปภาพไปใช้โฮสติ้งที่ถาวร**
      const returnTicket = {
        type: 'image',
        originalContentUrl: 'https://i.postimg.cc/kMYbC4Nd/edit.jpg',
        previewImageUrl: 'https://i.postimg.cc/kMYbC4Nd/edit.jpg'
      };
      return client.replyMessage(event.replyToken, returnTicket);
    
    // *********************************
    // *** Case: ที่พัก ***
    // *********************************
    } else if (userMessage === 'ที่พัก') {
      // **หมายเหตุ: ควรเปลี่ยน URL รูปภาพไปใช้โฮสติ้งที่ถาวร**
      const accommodationMessages = [
        {
          type: 'flex',
          altText: 'ข้อมูลที่พัก The Quarter Ratchathewi by UHG',
          contents: {
            "type": "bubble",
            "hero": { 
              "type": "image",
              "url": "https://i.postimg.cc/76TymTGq/20072400-b16d4ee81ce2dfb773af41d6e08bddf9.jpg",
              "size": "full",
              "aspectRatio": "20:13",
              "aspectMode": "cover"
            },
            "body": {
              "type": "box",
              "layout": "vertical",
              "paddingAll": "sm", 
              "contents": [
                {
                  "type": "text",
                  "text": "The Quarter Ratchathewi by UHG",
                  "weight": "bold",
                  "size": "xl",
                  "wrap": true
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "sm", 
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "box",
                      "layout": "baseline",
                      "spacing": "sm",
                      "contents": [
                        {
                          "type": "text",
                          "text": "ที่อยู่",
                          "color": "#aaaaaa",
                          "size": "sm",
                          "flex": 0 
                        },
                        {
                          "type": "text",
                          "text": "128/8 Phetchaburi Rd, Thung Phaya Thai, Ratchathewi, Bangkok 10400",
                          "wrap": true,
                          "color": "#666666",
                          "size": "sm",
                          "flex": 1 
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            "footer": {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "contents": [
                {
                  "type": "button",
                  "style": "link",
                  "height": "sm",
                  "action": {
                    "type": "uri",
                    "label": "ดูรายละเอียดและจองที่พัก",
                    "uri": "https://www.traveloka.com/en-th/hotel/thailand/the-quarter-ratchathewi-by-uhg-9000002437721"
                  }
                }
              ],
              "flex": 0
            }
          }
        },
        {
          type: 'text',
          text: 'คุณสามารถกดดูแผนที่ด้านล่างเพื่อนำทางได้เลยครับ'
        },
        {
          type: 'location',
          title: 'The Quarter Ratchathewi by UHG',
          address: '128/8 Phetchaburi Rd, Thung Phaya Thai, Ratchathewi, Bangkok 10400',
          latitude: 13.754868,
          longitude: 100.531235
        }
      ];
      return client.replyMessage(event.replyToken, accommodationMessages);
      
    // *********************************
    // *** Case: เมนูข้อมูลส่วนตัว (Quick Reply Sub-Menu 1) ***
    // *********************************
    } else if (userMessage === 'เมนูข้อมูลส่วนตัว') {
      // เมนูย่อย 1: แนะนำให้ใช้ Rich Menu สำหรับข้อมูลส่วนตัว
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '👤 **ข้อมูลส่วนตัว**\n\nสำหรับข้อมูลส่วนตัว เช่น ประวัติ ทักษะ ผลงาน และช่องทางการติดต่อ ท่านสามารถเข้าถึงได้สะดวกที่สุดผ่าน **Rich Menu (เมนูหลัก)** ด้านล่างจอครับ! 👇',
      });

    // *********************************
    // *** Case: เมนูงานรับปริญญา (Quick Reply Sub-Menu 2) ***
    // *********************************
    } else if (userMessage === 'เมนูงานรับปริญญา') {
      // เมนูย่อย 2: เมนู Quick Reply สำหรับงานรับปริญญา (กำหนดการอยู่ลำดับแรก)
      const graduationMenu = {
        type: 'text',
        text: "🎓 **ข้อมูลงานรับปริญญา:**\n\nกรุณาเลือกหัวข้อที่ต้องการครับ:",
        quickReply: {
          items: [{
            // ลำดับที่ 1: กำหนดการ (ย้ายขึ้นมาอันดับแรก)
            type: 'action',
            action: {
              type: 'message',
              label: 'กำหนดการ 🗓️', 
              text: 'กำหนดการ' 
            }
          }, {
            // ลำดับที่ 2: ลงทะเบียน
            type: 'action',
            action: {
              type: 'message',
              label: 'ลงทะเบียน 📝', 
              text: 'ลงทะเบียน' 
            }
          }, {
            // ลำดับที่ 3: สนับสนุน
            type: 'action',
            action: {
              type: 'message',
              label: 'สนับสนุน 💰', 
              text: 'สนับสนุน' 
            }
          }, {
            // ลำดับที่ 4: อวยพร
            type: 'action',
            action: {
              type: 'message',
              label: 'อวยพร 💌', 
              text: 'อวยพร'
            }
          }, {
            // ลำดับที่ 5: ที่พัก
            type: 'action',
            action: {
              type: 'message',
              label: 'ที่พัก 🏨', 
              text: 'ที่พัก' 
            }
          }, {
            // ลำดับที่ 6: ตั๋วเครื่องบิน
            type: 'action',
            action: {
              type: 'message',
              label: 'ตั๋วเครื่องบิน ✈️', 
              text: 'ตั๋วเครื่องบิน' 
            }
          }]
        }
      };
      return client.replyMessage(event.replyToken, graduationMenu);
      
    // *********************************
    // *** Default Catch-All ***
    // *********************************
    } else {
      // Default Catch-All: แสดงเมนูหลัก (Quick Reply)
      const mainMenu = {
        type: 'text',
        text: '👋 **สวัสดีครับ!**\n\nคุณต้องการสอบถามข้อมูลส่วนตัว หรือข้อมูลงานรับปริญญาครับ? (สามารถใช้ Rich Menu ด้านล่างจอได้เช่นกันครับ)',
        quickReply: {
          items: [{
            type: 'action',
            action: {
              type: 'message',
              label: 'ข้อมูลส่วนตัว',
              text: 'เมนูข้อมูลส่วนตัว' // คำสั่งสำหรับเมนูย่อย 1
            }
          }, {
            type: 'action',
            action: {
              type: 'message',
              label: 'งานรับปริญญา',
              text: 'เมนูงานรับปริญญา' // คำสั่งสำหรับเมนูย่อย 2
            }
          }]
        }
      };
      return client.replyMessage(event.replyToken, mainMenu);
    }
  } else if (event.type === 'follow') {
    // ข้อความต้อนรับเมื่อผู้ใช้กดติดตาม
    const welcomeMessage = {
      type: 'flex',
      altText: 'ยินดีต้อนรับ',
      contents: {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [{
            "type": "text",
            "text": "🎉 สวัสดีครับ! ยินดีต้อนรับสู่ LINE Bot ของผม",
            "weight": "bold",
            "size": "xl",
            "wrap": true
          }, {
            "type": "text",
            "text": "LINE นี้มีไว้เพื่อแจ้งข้อมูลเบื้องต้นเกี่ยวกับผม และสำหรับการรับปริญญาที่จะมีขึ้นในวันที่ 7 ตุลาคม และสำหรับการซ้อมรับปริญญาในวันที่ 3 ตุลาคมครับ",
            "size": "sm",
            "color": "#666666",
            "wrap": true,
            "margin": "md"
          }, {
            "type": "text",
            "text": "สามารถใช้ **เมนู Rich Menu** ด้านล่างเพื่อดูข้อมูลต่างๆ ได้เลยครับ! 👇",
            "size": "sm",
            "color": "#666666",
            "margin": "md"
          }]
        }
      }
    };
    return client.replyMessage(event.replyToken, welcomeMessage);
  }
  return Promise.resolve(null);
}

// เริ่มต้น Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
