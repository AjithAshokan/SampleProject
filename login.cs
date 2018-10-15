using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TestProject.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public string connection { get; set; }
        [AllowAnonymous]    
        public ActionResult Login()
        {
            return View();
        }
        public JsonResult LoginValidate(string userName, string password)
        {
            int employeeId;
            string employeeName, employeeEmail;
            bool userType = false;


            try
            {
                connection = ConfigurationManager.ConnectionStrings["Connection"].ConnectionString;
                using (SqlConnection con = new SqlConnection(connection))
                {
                    using (SqlCommand cmd = new SqlCommand("USPEmployeeLoginValid", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add("@EmpEmail", SqlDbType.VarChar).Value = userName;
                        cmd.Parameters.Add("@Password", SqlDbType.VarChar).Value = password;
                        con.Open();
                        cmd.ExecuteNonQuery();
                        SqlDataReader dataReader = cmd.ExecuteReader();
                        DataTable dataTable = new DataTable();
                        dataTable.Load(dataReader);
                        con.Close();
                        employeeId = Convert.ToInt32(dataTable.Rows[0]["EmpId"]);
                        if (employeeId > 0)
                        {
                            employeeName = Convert.ToString(dataTable.Rows[0]["EmpName"]);
                            employeeEmail = Convert.ToString(dataTable.Rows[0]["EmpEmail"]);
                            Session["EmployeeID"] =employeeId;
                            userType = Convert.ToBoolean(dataTable.Rows[0]["EmpIsAdmin"]);
                            Session["IsAdmin"] = Convert.ToInt32(userType);
                            Session["EmployeeName"] = employeeName;
                            Session["EmployeeEmail"] = employeeEmail;
                            TempData["empName"] = employeeName;
                        }
                    }
                }
                return Json(new { id = employeeId, type = userType }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { id = 0, type = userType }, JsonRequestBehavior.AllowGet);
            }
            finally
            {
                Dispose();
            }

        }
        public ActionResult Logout()
        {

            Session.RemoveAll();
            Session["EmployeeID"] = null;
            return RedirectToAction("Login");
        }
    }
}
