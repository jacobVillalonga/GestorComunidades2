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
SELECT * FROM `pago_cuota` WHERE year(fecha) = 2019 (*elimina index de fecha*)
<!-- propietario.fecha_nacimiento.toLocaleDateString('en-GB') -->

SELECT * FROM `vivienda` v
left join pago_cuota p
on p.vivienda_fk = v.id_vivienda
WHERE v.comunidad_fk = 8
and p.fecha is null
or year(p.fecha) = 2019
order by v.numero, p.fecha


	SELECT c.id_comunidad,
  	v.id_vivienda, v.numero, v.coeficiente,
    pv.id_propietario,
    p.id_propietario, p.nombre, p.apellidos, p.nif
  from comunidad c
  join vivienda v
  on c.id_comunidad = v.comunidad_fk
  left join prop_vivienda pv
  on pv.id_vivienda = v.id_vivienda
  left join propietario p
  on p.id_propietario = pv.id_propietario
  where c.id_comunidad = 8
  order by v.id_vivienda, p.nombre, p.apellidos

	select pc.fecha, pc.importe, pc.vivienda_fk,
	v.numero, v.coeficiente,
	v.comunidad_fk
	from pago_cuota pc
	join vivienda v on v.id_vivienda = pc.vivienda_fk
	where pc.vivienda_fk in (
	    select vin.id_vivienda
		from vivienda vin
		where vin.comunidad_fk = 8
	)
	and year(pc.fecha) = 2019
	order by pc.fecha
//
	Select coalesce(sum(importe), 0) as deuda, vivienda_fk
	from pago_cuota
	where vivienda_fk = 15
	and year(fecha) < 2019
	and pagado = 0
