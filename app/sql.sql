//info propietarios-viviendas-comunidad
SELECT c.nombre_comunidad,
	v.id_vivienda, v.numero, v.coeficiente,
    pv.id_propietario,
    p.nombre, p.apellidos, p.nif
FROM vivienda v
JOIN comunidad c
on c.id_comunidad = v.comunidad_fk
join prop_vivienda pv
on v.id_vivienda = pv.id_vivienda
join propietario p
on pv.id_propietario = p.id_propietario
WHERE c.id_comunidad = 2
ORDER by c.nombre_comunidad


SELECT
	v.id_vivienda, v.numero, v.coeficiente,
    pv.id_propietario,
    p.nombre, p.apellidos, p.nif
from propietario p
join prop_vivienda pv
join vivienda v
where p.id_propietario = pv.id_propietario
and pv.id_vivienda = v.id_vivienda
and v.comunidad_fk = 2
order by v.id_vivienda, p.nombre, p.apellidos
