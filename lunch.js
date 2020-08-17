const instaTouch = require('instatouch');
const fs = require('fs');
const path = require('path');
const cron = require("node-cron");

cron.schedule("50 11 * * mon,tue,wed,thu,fri", function(){

fs.readdir('./restorenorthbridge', (err, files) => { 
  if (err) throw err;

  //remove all files which exist in the directory
  for (const file of files) {
      console.log(file);
    fs.unlink(path.join('./restorenorthbridge', file), err => {
      if (err) throw err;
    });
  }
});

//Get the latest post from the instagram account
(async () => {
    try {
        const options = { count: 1, mediaType: 'image', download: true, filepath: './', filename: 'image.jpeg'};
        const user = await instaTouch.user('restorenorthbridge', options);
        console.log(user.collector[0].thumbnail_src);

        //get the (only) file which exists in the directory
        fs.readdir('./restorenorthbridge', (err, files) => { 
            if (err) throw err;
          
            for (const file of files) {
                console.log(file);
                var imagePath = path.join(__dirname, './restorenorthbridge/' + file);

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                    host: "XXX",
                    port:   465,
                    secure: true, //upgrade later with STARTTLS
                    auth: {
                      user: "XXX",
                      pass: "XXX"
                    }
                  });

                var mailOptions = {
                from: 'XXX',
                to: 'XXX',
                subject: "Today's menu!",
                html: '<img src="XXX"/>',
                attachments: [{
                    filename: file,
                    path: imagePath,
                    cid: 'XXX' //same cid value as in the html img src
                }]
                };

                transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
                });
            }
          });

    } catch (error) {
        console.log(error);
    }
})();
});