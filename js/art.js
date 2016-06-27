$(document).ready(function(){

  $("td").click(function(){
    var this1 = this.innerHTML;
    if(this1.length === 2){
      langs.push(this1);
    }
    console.log(langs);
  })
  $('.modtext').click(function(){
    if(langs.length === 0){
      confirm("Are you sure you would not like any tranlations?")
    }
    var is = confirm(`Are you sure you want to translate to ${langs}?`);

    if(is === true){
      $(langs).each(function(i, val){
        localStorage.setItem(`${i}`, `${val}`);
        $('.mid').append(`<option value="${val}">${val}</option>`)
      })
    }
  })
  $('#viz').click(function(){
    var text = $("#ben").val();
    var lan1 = $("#lan10").val();
    var lan2 = $("#lan20").val();
    translate2(text, lan1, lan2);
    ajaxWord69(text);
    ajaxBay69(text);
  })
})
