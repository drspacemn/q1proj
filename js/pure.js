function ajaxPic(insert, i){
  var cx = "014538893091199514000:zjljuakjzby";
  var key = "AIzaSyA4uoEK2XXccLYRtf4_wzBvjV_tRpQUqos";
  var key2 = "AIzaSyC-UUVgd4D825FLYRnECtTJ45ntm5PMGhg";
  return $.ajax({
    method: "GET",
    dataType: 'jsonp',
    url: `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${insert}&searchType=image`,
    success: function(result){
      var arr = result.items;
      console.log(arr);
        $(`.${insert}`).append(`<img class="stuff" id="${i}" src="${arr[i].link}"/><input type="button" id="change${i}" class="btn btn1" value="next">`);
        $(`#change${i}`).click(function(){
          $(`#${i}`).remove();
          $(`#change${i}`).remove();
          i++;
          ajaxPic(insert, i);
        })
    }
  })
}

//just switch from ajaxBay to ajaxWord to switch between Google and Pixbay
function ajaxWord(word, i){
  var pos = '';
  $.ajax({
    method: "GET",
    url: `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=71b822f1-e0af-4112-affc-f192553b9e76`,
    success: function(result){
      var json = xmlToJson(result);
      pos = json.entry_list.entry[0].fl["#text"];
        if(word.toLowerCase() === "a" || pos === undefined || word === "insult"){
          $(`.${word}`).addClass('text');
          $(`.${word}`).append(`<h2>${word}</h2>`);
        }
        else if (pos === "noun" || pos === "verb"){
          ajaxPic(word, i);
        } else {
          $(`.${word}`).addClass('text');
          $(`.${word}`).append(`<h2>${word}</h2>`);
      }
    }
  })
}

function ajaxBay(insert, i){
  $.getJSON({
    method: "GET",
    dataType: 'jsonp',
    url: `https://pixabay.com/api/?key=2698784-511c7f267c2eae102b4399f86&q=${insert}&image_type=photo`,
    success: function(result){
      var arr = result.hits;
        $(`.${insert}`).append(`<img class="stuff" id="${arr[i].id}" src="${arr[i].webformatURL}"/><input type="button" id="change${i}" class="btn btn1" value="next">`);
        $(`#change${i}`).click(function(){
          $(`#${arr[i].id}`).remove();
          $(`#change${i}`).remove();
          i++;
          ajaxBay(insert, i);
        })
    }
  })
}

function ajaxBay2(insert, i){
  $('#pos_catch').empty();
  $('#pos_catch').append(`<div class="${insert}"></div>`)
  $.getJSON({
    method: "GET",
    dataType: 'jsonp',
    url: `https://pixabay.com/api/?key=2698784-511c7f267c2eae102b4399f86&q=${insert}&image_type=photo`,
    success: function(result){
      var arr = result.hits;
        $(`.${insert}`).append(`<img class="stuff" id="${arr[i].id}" src="${arr[i].webformatURL}"/><input type="button" id="change${i}" class="btn btn1" value="next">`);
        $(`#change${i}`).click(function(){
          $(`#${arr[i].id}`).remove();
          $(`#change${i}`).remove();
          i++;
          ajaxBay(insert, i);
        })
    }
  })
}

function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

function prime(num){
  var ans = '';
  for(var key in data[num]){
    ans = key + "$";
    ans += data[num][key];
    var arr = key.split(' ');
    $(arr).each(function(i, val){
      $('.catch').append(`<div class="item ${val}"></div>`);
      ajaxWord(val, i)
    })
  }
  return ans;
}

function translate(text, lan){
  var key = "trnsl.1.1.20160622T163325Z.6c9491f7b8d1b87e.69a2ab2510d377b52582d29fd03982abfb329393";
  var lang = `en-${lan}`;
  $.ajax({
    method: "POST",
    url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}&[format=plain]]`,
    success: function(result){
      alert(result.text[0]);
    }
  })
}
function translate2(text, lan1, lan2){
  var key = "trnsl.1.1.20160622T163325Z.6c9491f7b8d1b87e.69a2ab2510d377b52582d29fd03982abfb329393";
  var lang = `${lan1}-${lan2}`;
  $.ajax({
    method: "POST",
    url: `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${key}&text=${text}&lang=${lang}&[format=plain]]`,
    success: function(result){
      $(".catches").append(`<h2>${result.text[0]}</h2>`);
    }
  })
}

function def(word){
  $.ajax({
    method: "GET",
    url: `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=71b822f1-e0af-4112-affc-f192553b9e76`,
    success: function(result){
      var json = xmlToJson(result);
      def = json.entry_list.entry[0].def.dt[0]["#text"];

      if(typeof def === "object"){
        alert(def[0].replace(/:/g, "") + " (remember you only get one hint)");
      } else {
        alert(def.replace(/:/g, "") + " (remember you only get one hint)");
      }
    }
  })
}

function reveal(word){
  $("#pos_catch").empty();
  $("#pos_catch").append(`<h2>${word}</h2>`)
}

function pos(word){
  $.ajax({
    method: "GET",
    url: `http://words.bighugelabs.com/api/2/715e1dffe493327e1bae1ff50d401033/${word}/json`,
    success: function(result){
      var res = result.split(":")[0].replace(/{/g, "");
      var pos1 = res.replace(/['"]+/g, '');
      var ans = $('#ward').val().toLowerCase();
      var pos = $('#pos1').val().toLowerCase();

      if(ans !== word){
        $('.wrong1').remove();
        $("#wer").append(`<span class="wrong1">sorry incorrect word</span>`)
      } else if (pos !== pos1){
        $('.wrong2').remove();
        $("#war").append(`<span class="wrong2">sorry incorrect part of speech</span>`)
      } else if(ans === word && pos !== pos1) {
        $('.wrong1').remove();
      } else if(pos === pos1 && ans !== word){
        $('.wrong2').remove();
      } else {
        alert("Congratulations!")
        $('.wrong1').remove();
        $('.wrong2').remove();
        $('#ward').val('');
        $("#pos1").val('');
      }
    }
  })
}

function ajaxWord69(word){
  $.ajax({
    method: "GET",
    url: `http://www.dictionaryapi.com/api/v1/references/collegiate/xml/${word}?key=71b822f1-e0af-4112-affc-f192553b9e76`,
    success: function(result){
      var json = xmlToJson(result);
      var pos = json.entry_list.entry[0].fl["#text"];
        $(".cat").append(`<h5>Part of Speech: ${pos}</h5>`)
      }
  })
}

function ajaxBay69(word){
  $.getJSON({
    method: "GET",
    dataType: 'jsonp',
    url: `https://pixabay.com/api/?key=2698784-511c7f267c2eae102b4399f86&q=${word}&image_type=photo`,
    success: function(result){
      var arr = result.hits;
        $(arr).each(function(i, val){
          if (i===0){
            $(".carousel-inner").append(`<div class="item active"><img src="${val.webformatURL}"></div>`);
          } else if (i < 4){
          $(".carousel-inner").append(`<div class="item active"><img src="${val.webformatURL}"></div>`);
            }
        })
    }
  })
}
