//filtro de tablas
function filtra(tableId, inputId) {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue, txtValue2;
  input = document.getElementById(inputId);
  filter = input.value.toUpperCase();
  table = document.getElementById(tableId);
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td1 = tr[i].getElementsByTagName("td")[1];
    if (td || td1) {
      txtValue = (td.textContent || td.innerText) + " " + (td1.textContent || td1.innerText);
      txtValue = txtValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
//select por año de las tablas tablaViviendasComunidad, tablaCuotas
function search(input, ref, id) {
  var year = document.getElementById(input).value;
  if (ref == "comunidad") {
    location.href = "/comunidades/"+id+"/year/"+year;
  } else if (ref == "cuotas"){
    location.href = "/viviendas/"+id+"/year/"+year;
  }
}
