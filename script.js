function init() {
    console.log("Hello World");
    take();

    $(document).on("click", "p.delete", delete_item);

    $("form.input button").click(items_Input);
}

$(document).ready(init);

// funzione per prendere elementi dal server
function take() {
  $.ajax ({
    url: "http://157.230.17.132:3008/todos",
    method: "GET",
    success: function(data) {
      var item_download = data;

      for (var i = 0; i < item_download.length; i++) {
        var item_print = item_download[i];

        var source = document.getElementById("item-template").innerHTML;
        var template = Handlebars.compile(source);

        var context = {text: item_print.text, id: item_print.id};
        var html = template(context);

        $(".container .note").append(html);
      }
    },
    error: function() {
      alert("Error to downloading item");
    }
  });
}

// funzione per eliminare elementi scaricati
function delete_item() {

  var box = $(this);
  var theBox = box.parent(); //per prendere il padre dell'elemento selezionato
  var idSelect = theBox.data("id"); //per prendere quel data-id che abbiamo inserito

  $.ajax ({
    url: "http://157.230.17.132:3008/todos/" + idSelect,
    method: "DELETE",
    success: function() {

      theBox.remove(); //per rimuovere l'elemento selezionato
    },
    error: function() {
      alert("Error to delete element");
    }
  })
  console.log(idSelect);
}

// funzione per inserire oggetti sul server
function items_Input() {
  var item_inserito = $("form.input input").val();
  console.log(item_inserito);

  $.ajax({
    url: "http://157.230.17.132:3008/todos",
    method: "POST",
    data: {text: item_inserito},
    success: function(data) {
      $(".note").html("");
      take();
    },
    error: function() {
      alert("Error to Upload items")
    }
  })

  $("form.input input").val("");
}
