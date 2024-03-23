const roles = ["Admin", "Owner", "Manager", "Employee"];

const isValidPermission = (permissions) => {
  for (const permission of permissions) {
    if (!permissionsData.includes(permission)) {
      return false; // Return false if any permission is invalid
    }
  }
  return true; // Return true if all permissions are valid
};
const permissionsData = [
  "Edit Orders",
  "Edit Completed Orders",
  "Edit Paid Orders",
  "Edit Price List of Order & Customer",
  "Delete Orders",
  "Add Discounts to Orders",
  "Add Discounts to Customer Account",
  "Add Credit to Customer Account",
  "Open Cash Drawer Manually",
  "Manage Products & Prices",
  "Manage User Accounts",
  "Add Customers",
  "Edit Customers",
  "Manage Invoices",
  "Metrics",
  "Edit Printer Settings",
  "Marketing",
  "Manage Audits",
  "Manage Admin Settings",
  "Cash Up Confirm",
  "Allow Visibility of Revenue",
  "Manage Payrolls",
  "Manage Refund",
  "Export Data",
];

module.exports = {
  isValidPermission,
  permissionsData,
  roles,
};
