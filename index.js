const express = require('express');
const line = require('@line/bot-sdk');
require('dotenv').config();

const app = express();
// ใช้ process.env.PORT สำหรับ Render หรือ 3000 เป็นค่าเริ่มต้น
const port = process.env.PORT || 3000;

const config = {
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

app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

function handleEvent(event) {
  if (event.type === 'message' && event.message.type === 'text') {
    const userMessage = event.message.text;

    if (userMessage === 'ประวัติส่วนตัว') {
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
                "text": "  - JavaScript (Node.js)",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - Python",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - PHP (เคยศึกษาแต่ไม่เคยใช้ทำงานจริง)",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - SQL (MySQL, PostgreSQL)",
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
                "text": "  - LINE Messaging API",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - LINE Official Account Manager",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - Git/GitHub",
                "size": "sm",
                "color": "#666666"
              }, {
                "type": "text",
                "text": "  - Express.js",
                "size": "sm",
                "color": "#666666"
              }]
            }]
          }
        }
      };
      return client.replyMessage(event.replyToken, skillsFlexMessage);
    } else if (userMessage === 'ผลงาน') {
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
              "url": "https://example.com/project2.jpg",
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
    } else if (userMessage === 'กำหนดการ') {
      // **ปรับปรุง Text Message ให้สวยงามขึ้น**
      const messages = [{
        type: 'image',
        originalContentUrl: 'https://i.postimg.cc/YSSc053J/1500.jpg',
        previewImageUrl: 'https://i.postimg.cc/YSSc053J/1500.jpg',
      }, {
        type: 'text',
        text: `✨ **กำหนดการงานรับปริญญา** ✨\n\n🗓️ **วันศุกร์ที่ 3 ตุลาคม (วันซ้อม)**\n* 07:00 - 10:45 น. ฝึกซ้อมย่อย\n* 11:30 - 13:30 น. ฝึกซ้อมรับปริญญาบัตรบนเวที\n* 14:00 - 20:00 น. ฝึกซ้อมใหญ่\n\n🗓️ **วันอังคารที่ 7 ตุลาคม 2568 (วันจริง)**\n* 08:00 - 11:00 น. ลงทะเบียน/ถ่ายภาพหมู่/เตรียมตัว\n* 11:00 น. เป็นต้นไป พิธีพระราชทานปริญญาบัตร\n\n📌 สามารถดูรายละเอียดเพิ่มเติมได้จากรูปภาพด้านบนครับ`
      }];
      return client.replyMessage(event.replyToken, messages);
    } else if (userMessage === 'ลงทะเบียน') {
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
    } else if (userMessage === 'อวยพร') {
      // กำหนด LIFF URL ใหม่สำหรับหน้านี้
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

    } else if (userMessage === 'แจ้งชื่อสมาชิกที่จะเดินทางมางานรับปริญญา') {
      // **ปรับปรุง Text Message ให้สวยงามขึ้น**
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '📝 **การแจ้งชื่อผู้เข้าร่วมงาน**\n\nขณะนี้ยังไม่พร้อมให้บริการในส่วนนี้ครับ แต่คุณสามารถส่งรายชื่อผู้ที่จะมาร่วมงานมาให้ผมได้เลยครับ และแจ้งด้วยว่าจะมาวันซ้อม (3 ต.ค.) หรือวันจริง (7 ต.ค.) ครับ'
      });
    } else if (userMessage === 'เพิ่มคำอวยพรให้นิสิต') {
      // **ปรับปรุง Text Message ให้สวยงามขึ้น**
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '🎉 **รับทราบครับ!**\n\nส่งคำอวยพรสุดพิเศษมาได้เลยครับ ผมจะเก็บไว้ให้เป็นอย่างดีและนำไปให้นิสิตได้อ่านในวันสำคัญครับ 😊'
      });
    } else if (userMessage === 'สำหรับสนุนค่าใช้จ่ายในการนับปริญญา') {
      // **ปรับปรุง Text Message ให้สวยงามขึ้น**
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '🙏 **ขอบคุณสำหรับน้ำใจครับ!**\n\nหากต้องการสนับสนุนค่าใช้จ่ายในการรับปริญญา สามารถติดต่อผมได้โดยตรงเลยครับ ผมซาบซึ้งในความเมตตาของท่านมากๆ ครับ'
      });
    } else if (userMessage === 'ขอดูคำอวยพรที่ได้รับ') {
      // **ปรับปรุง Text Message ให้สวยงามขึ้น**
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '📚 **คำอวยพร**\n\nตอนนี้ยังไม่มีการแสดงผลคำอวยพรในช่องทางนี้ครับ แต่ถ้ามีผู้ส่งเข้ามาแล้ว ผมจะรวบรวมไว้ให้คุณดูได้แน่นอนครับ!'
      });
    } else if (userMessage === 'รายละเอียดการสนับสนุน') {
      // **ปรับปรุง Text Message ให้สวยงามขึ้น**
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '💰 **รายละเอียดการสนับสนุน**\n\nตอนนี้ยังไม่มีรายละเอียดที่ชัดเจนครับ แต่ถ้ามี ผมจะอัปเดตข้อมูลให้คุณดูได้แน่นอนครับ'
      });
    } else if (userMessage === 'ตั๋วเครื่องบิน') {
        // **แก้ไขตามที่ผู้ใช้ร้องขอ: เพิ่มไอคอน ✈️ และทำให้ปุ่มกระชับ**
        const ticketOptions = {
            type: 'text',
            text: "✈️ ข้อมูลตั๋วเครื่องบิน\n\nกรุณาเลือกเที่ยวบินที่ต้องการดูรายละเอียด โดยกดที่ปุ่มด้านล่างนี้ได้เลยครับ:",
            quickReply: {
                items: [{
                    type: 'action',
                    action: {
                        type: 'message',
                        // เพิ่มไอคอน ✈️ และปรับป้ายให้กระชับ
                        label: '✈️ ขาไป 6 ต.ค.', 
                        text: 'ตั๋วขาไป'
                    }
                }, {
                    type: 'action',
                    action: {
                        type: 'message',
                        // เพิ่มไอคอน ✈️ และปรับป้ายให้กระชับ
                        label: '✈️ ขากลับ 7 ต.ค.', 
                        text: 'ตั๋วขากลับ'
                    }
                }]
            }
        };
        return client.replyMessage(event.replyToken, ticketOptions);
    } else if (userMessage === 'ตั๋วขาไป') {
      const departureTicket = {
        type: 'image',
        originalContentUrl: 'https://i.postimg.cc/Dz1ryTvP/edit.jpg',
        previewImageUrl: 'https://i.postimg.cc/Dz1ryTvP/edit.jpg'
      };
      return client.replyMessage(event.replyToken, departureTicket);
    } else if (userMessage === 'ตั๋วขากลับ') {
      const returnTicket = {
        type: 'image',
        originalContentUrl: 'https://i.postimg.cc/kMYbC4Nd/edit.jpg',
        previewImageUrl: 'https://i.postimg.cc/kMYbC4Nd/edit.jpg'
      };
      return client.replyMessage(event.replyToken, returnTicket);
    } else if (userMessage === 'ที่พัก') {
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
    } else {
      // **ปรับปรุง Text Message (default) ให้สวยงามขึ้น**
      return client.replyMessage(event.replyToken, {
        type: 'text',
        text: '👋 **ยินดีต้อนรับครับ!**\n\nผมคือ LINE Bot ที่จัดทำขึ้นเพื่อแจ้งข้อมูลต่างๆ เกี่ยวกับงานรับปริญญาและข้อมูลส่วนตัวของผมครับ\n\nคุณสามารถสำรวจข้อมูลที่ต้องการได้จาก **เมนู Rich Menu** ด้านล่างนี้ได้เลยนะครับ! 👇'
      });
    }
  } else if (event.type === 'follow') {
    // **ปรับปรุง Text Message (follow) ให้สวยงามขึ้น**
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});