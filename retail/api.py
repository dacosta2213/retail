# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


@frappe.whitelist()
def ruta(login_manager):
    ruta = frappe.db.get_value("User", login_manager.user,"ruta_login")
    frappe.errprint(ruta)
    frappe.local.response["home_page"] = ruta
