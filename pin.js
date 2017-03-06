var PDK = require("node-pinterest")

var pinterest = PDK.init("APIKEYHERE");

var fs = require('fs');

var pinterestAPI = require('pinterest-api');

var accountName = "ACCOUNTNAME";

var imageUrlArray = [];

var pAPI = pinterestAPI(accountName);

var pinArray = [];

function setupPins(array) {
  for (pin in array) {
    var pinData = array[pin];
    console.log(pinData.description);
    for (img in array[pin].images) {
      var imageUrl = array[pin].images[img].url;
      postPin(pinData.description, pinData.link, imageUrl);
    }
  }
  console.log('done!');
}

function postPin(note, link, imageUrl) {
  pinterest.api('me/boards').then(function (json) {
    pinterest.api('pins', {
      method: 'POST',
      body : {
        board: 'NEWBOARDID',
        note: note,
        link: link,
        image_url: imageUrl
      }
    });
  });
}

pAPI.getPinsFromBoard("OLDBOARDNAME", false, function (pins) {

  setupPins(pins);

  // for (d in data) {
  //   var finalD = data[d];
  //   for (img in finalD.images) {
  //   }
  // }

  // for (p in pins) {
  //   // console.log(pins[p]);
  //   for (i in pins[p]) {
  //     console.log(pins[p][i].id);
  //   }
  // }

  // fs.writeFile("pins.json", str, function(err) {
  //   if (err) {
  //     return console.log(err);
  //   }
  //
  //   console.log('file saved!');
  // });

  // fs.readFile('pins.json', 'utf8', function (err, fileData) {
  //   if (err) throw err;
  //   var data = JSON.parse(fileData);
  //   // console.log(d);
  //
  //   // pinterest.api('pins', {
  //   //   method: 'POST',
  //   //   body: {
  //   //
  //   //   }
  //   // });
  //
  //   for (d in data) {
  //     // console.log(data[d].id);
  //     var datum = data[d];
  //
  //     for (i in datum) {
  //       // console.log(datum[i]);
  //       // pinArray.push(datum[i].description);
  //       var finalD = data[d][i];
  //       console.log(finalD.description);
  //       console.log(finalD.link);
  //       for (img in finalD.images) {
  //         // console.log(finalD.images[img].url);
  //       }
  //     }
  //   }
  // });
});

// pinterest.api('me/boards').then(function (json) {
//     pinterest.api('pins', {
//         method: 'POST',
//         body: {
//             board: json.data[0].id,
//             note: 'this is a test',
//             link: 'http://gizmodo.com/amazon-prime-music-finally-gets-tunes-from-universal-mu-1733540468',
//             image_url: 'http://i.kinja-img.com/gawker-media/image/upload/s--4Vp0Ks1S--/1451895062187798055.jpg'
//         }
//     }).then(function(json) {
//         pinterest.api('me/pins').then(console.log);
//     });
// });
