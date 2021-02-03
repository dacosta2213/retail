# -*- coding: utf-8 -*-
# Copyright (c) 2017, C0D1G0 B1NAR10 and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Turno(Document):
	pass

@frappe.whitelist()
def totales_cierre(caja,apertura,cierre, filters=None):	
	data = frappe.db.sql("""
		select SUM(s.grand_total) as total 
		from  `tabSales Invoice` s 
		where s.creation >= '%s' and s.creation <= '%s' and s.status = 'Paid' and s.caja = '%s'
		union
		select SUM(s.grand_total) as efectivo 
		from `tabSales Invoice Payment` p,  `tabSales Invoice` s 
		WHERE  s.name = p.parent AND p.mode_of_payment = "Efectivo" AND s.status = "Paid" 
		AND s.creation >= '%s' AND s.creation <= '%s' AND s.caja = '%s' 
		union
		select SUM(s.grand_total) as tarjetas 
		from `tabSales Invoice Payment` p,  `tabSales Invoice` s 
		WHERE  s.name = p.parent AND p.mode_of_payment = "Tarjetas de credito" AND s.status = "Paid" 
		AND s.creation >= '%s' AND s.creation <= '%s' AND s.caja = '%s' """ % (apertura,cierre,caja,apertura,cierre,caja,apertura,cierre,caja), 
		as_dict=1)

	frappe.errprint(data)
	return data




