const axios = require('axios');
const cheerio = require('cheerio');

async function scrape() {
  try {
    const res = await axios.get('https://www.strava.com/clubs/1098891', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const $ = cheerio.load(res.data);
    const result = { avatars: [] };
    
    // Tìm các ảnh profile
    $('.avatar-img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && !src.includes('avatar/athlete/large.png')) {
         result.avatars.push(src);
      }
    });
    
    // Thử xem thông tin leader
    $('table.athletes').find('tr').each((i, el) => {
       const text = $(el).text().trim();
       if (text) {
         console.log("Athlete row:", text.substring(0, 100).replace(/\n/g, ' '));
       }
    });

    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Scrape error:", error.message);
  }
}

scrape();
