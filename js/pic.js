$(document).ready(function(){
  $(".cont1").animate({
    left: '50%',
    })
    var num = 0;
    var ans1 = prime(num).split("$");
    var ans = ans1[0];
    var mean = ans1[1];
    $('#sub').click(function(){
      var val = $('#anz1').val();
      console.log(val);
      if(val === ans){
        alert(`Nice Work! "${ans}" means: ${mean}`);
        $('.catch').empty();
        $('#anz1').val("");
        num ++;
        ans1 = prime(num).split("$");
        ans = ans1[0];
        mean = ans1[1];
      } else {
        alert(`Sorry keep trying (hint: ${mean})`);
      }
    })
    $('#doit').click(function(){
      translate($('#word').val(), $('#lang').val());
    })
    $('#doit1').click(function(){
      translate(mean, $('#lang1').val())
    })
})
