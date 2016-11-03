$(document).ready(function() {
  $('#url').keyup(function() {
    if($.trim($('#url').val())!=='') $('select').attr('disabled', false);
    else $('select').attr('disabled',true);
  });

  $('#n').change(function() {
    $('#form .form-group').remove();
    for (var i = 0; i < $(this).val(); i++) {
      createForm(i+1);
    }
    if($.trim($('#url').val())!=='') $('#form form.form-inline button').attr('disabled', false);
    else $('#form form.form-inline button').attr('disabled', true);
  });

  $('button').click(function(e) {
    e.preventDefault();
    $(this).blur();
    consultar();
  });
});

function createForm(id) {
  $('#form form.form-horizontal').append('<div class="form-group"><label for="nom'
    +id+
    '" class="col-xs-3 control-label">Variable '
    +id+
    '</label><div class="col-xs-9"><input type="text" class="form-control" id="nom'
    +id+
    '"></div></div><div class="form-group"><label for="var'
    +id+
    '" class="col-xs-3 control-label">Valor '
    +id+
    '</label><div class="col-xs-9"><input type="text" class="form-control" id="var'
    +id+
    '"></div></div>');
}

function consultar() {
  var a=new Object();
  for (var i = 0; i < $('#n').val(); i++) {
    a[$('#nom'+(i+1)).val()]=$('#var'+(i+1)).val();
  }
  $('#envio').empty().append(JSON.stringify(a,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;&nbsp;'));
  $.ajax({
    url: $('#url').val(),
    type: $('#t').val(),
    dataType: 'json',
    data: a,
  }).done(function(r) {
    console.log("done");
    $('#respuesta').empty().append(JSON.stringify(r,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;'));
  }).fail(function(e) {
    console.log("fail");
    $('#respuesta').empty().append(JSON.stringify(e,null,'\t').replace(/\n/g,'<br>').replace(/\t/g,'&nbsp;&nbsp;'));
  }).always(function() {
    console.log("finished");
  });
}