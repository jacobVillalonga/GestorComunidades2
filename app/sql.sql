//info propietarios-viviendas-comunidad
SELECT c.id_comunidad,
	v.id_vivienda, v.numero, v.coeficiente,
    pv.id_propietario,
    p.nombre, p.apellidos, p.nif
from comunidad c
join vivienda v
on c.id_comunidad = v.comunidad_fk
left join prop_vivienda pv
on pv.id_vivienda = v.id_vivienda
left join propietario p
on p.id_propietario = pv.id_propietario
where c.id_comunidad = 8


SELECT c.id_comunidad,
	v.id_vivienda, v.numero, v.coeficiente,
    pv.id_propietario,
    p.nombre, p.apellidos, p.nif
from propietario p
join prop_vivienda pv
join vivienda v
join comunidad c
where p.id_propietario = pv.id_propietario
and pv.id_vivienda = v.id_vivienda
and v.comunidad_fk = c.id_comunidad
and c.id_comunidad = 8
order by v.id_vivienda, p.nombre, p.apellidos


SELECT * FROM `pago_cuota` WHERE fecha > "2018" and fecha < "2020"

<div class="">
	<% var d = cuotas[3].fecha %>
	<p>basic Date: <%= d %></p>
	<% var n = new Date(d) %>
	<p>New Date: <%= n %></p>
	<p>month: <%= n.getMonth() %></p>
</div>
