const puppeteer = require('puppeteer');
const http = require('http');

async function runBrowser() {
  try {
    console.log("کروم براؤزر شروع ہو رہا ہے...");
    
    // ہیڈ لیس (بیک گراؤنڈ) براؤزر لانچ کرنا
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--no-first-run',
        '--no-zygote',
        '--single-process'
      ]
    });

    const page = await browser.newPage();
    
    // براؤزر کے اندر آپ کا لنک کھولنا
    const targetUrl = 'https://colourtradingofficial786-cmd.github.io/telegram-signals/';
    console.log(`لنک لوڈ ہو رہا ہے: ${targetUrl}`);
    
    // پیج اوپن کرنا اور اس وقت تک انتظار کرنا جب تک پورا نیٹ ورک لوڈ نہ ہو جائے
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    console.log("براؤزر کامیابی سے کھل گیا ہے اور آپ کا سگنل پیج 24 گھنٹے کے لیے لائیو ہے!");

    // اگر براؤزر میں کوئی ایرر آئے تو وہ ہمیں کونسول میں نظر آئے گا
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  } catch (error) {
    console.error("براؤزر چلانے میں مسئلہ پیش آیا:", error);
  }
}

// کلاؤڈ سرور (Render) کو آن رکھنے کے لیے ایک چھوٹا سا سرور بنانا
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running online 24/7!\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`سرور پورٹ ${PORT} پر کامیابی سے چل رہا ہے.`);
  runBrowser(); // براؤزر کو بیک گراؤنڈ میں اسٹارٹ کریں
});
