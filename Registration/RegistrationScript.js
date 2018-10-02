<script src="~/Scripts/jquery-1.10.2.js"></script>
<script>
    function LoadEmpDetails(empId, empname, EmpEmail) {
        $("#txtEmailId").val(EmpEmail);
        $("#txtfirstname").val(empname);
    }
    function LoadGrid() {
        $.ajax({
            type: "POST",
            url: "/Registration/LoadUserData",
           // data: { userName: name, password: password },
            success: function (response) {
                var empDetailsList = $.parseJSON(response);

                $('#tblcustomerdetails > tbody').children("tr:gt(0)").remove();
                if (empDetailsList["Result"] == undefined || empDetailsList["Result"] == null) {

                    var swapRowStyle = true;
                    for (i = 0; i < empDetailsList.length; i++) {

                        if (swapRowStyle) {
                            $('#tblcustomerdetails').append("<tr><td class='gridsubdes'><a href='#' onclick='LoadEmpDetails(" + empDetailsList[i].EmpId+",\"" + empDetailsList[i].EmpName + "\",\"" + empDetailsList[i].EmpEmail + "\");'>" +empDetailsList[i].EmpName +
                                "</a></td><td class='gridsubdes'>" + empDetailsList[i].EmpEmail + "</td></tr>");
                            swapRowStyle = false;

                        }

                        else {
                            $('#tblcustomerdetails').append("<tr><td class='gridsubdes1'><a href='#' onclick='LoadEmpDetails(\"" + empDetailsList[i].EmpName + "\",\"" + empDetailsList[i].EmpEmail + "\");'>" + empDetailsList[i].EmpName +
                                "</a></td><td class='gridsubdes1'>" + empDetailsList[i].EmpEmail + "</td></tr>");
        
                            swapRowStyle = true;
                        }
                    }

                }
                else {

                    $('#tblcustomerdetails').append("<tr><td colspan='5' class='gridsubdes'>No Records Found</td></tr>");
                }

            },
            failure: function (response) {
            },
            error: function (response) {
            }
        });
    }
    $(document).ready(function () {
        LoadGrid();
        //btnupdate
        $("#btnsubmit").click(function () {
            var txtName = $("#txtfirstname").val();
            var txtEmailId = $("txtEmailId").val();
        });
        $("#btnsubmit").click(function () {
            var txtName = $("#txtfirstname").val();
            var txtEmailId = $("txtEmailId").val();
            var txtPassword = $("txtPassword").val();
            $.ajax({
                type: "POST",
                url: "/Registration/UserDataUpdate",
                data: { name: txtName, mail: txtEmailId, password: txtPassword },
                success: function (response) {
                    if (response.id > 0) {
                       
                    }
                    else {
                        alert("invalid login");
                    }

                },
                failure: function (response) {
                },
                error: function (response) {
                }
            });
        });
    });
    </script>
