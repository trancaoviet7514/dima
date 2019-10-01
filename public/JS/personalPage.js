function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

// validate phone number
var setTotalNumberOfWordCounter = "10";
function displayWordCounter() {
    // upload
    var textValue = document.getElementsByName("phone")[0].value;
    textValue = textValue.replace(/ /g, '');
    var gettextLength = textValue.length;

    if (gettextLength == setTotalNumberOfWordCounter) {
        textValue = textValue.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
        document.getElementsByName("phone")[0].value = textValue;
    }

    if (gettextLength > setTotalNumberOfWordCounter) {
        textValue = textValue.replace(/ /g, '');
        textValue = textValue.substring(0, setTotalNumberOfWordCounter);
        textValue = textValue.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
        document.getElementsByName("phone")[0].value = textValue;
        return false;
    }

    // edit
    var edit = document.getElementsByName("edit_phone")[0].value;
    edit = edit.replace(/ /g, '');
    var gettextLength = edit.length;

    if (gettextLength == setTotalNumberOfWordCounter) {
        edit = edit.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
        document.getElementsByName("edit_phone")[0].value = edit;
    }

    if (gettextLength > setTotalNumberOfWordCounter) {
        edit = edit.replace(/ /g, '');
        edit = edit.substring(0, setTotalNumberOfWordCounter);
        edit = edit.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
        document.getElementsByName("edit_phone")[0].value = edit;
        return false;
    }
}

// format price in upload form
$('#priceId').keyup(function () {
    var a = $(this).val();
    document.getElementById('priceId').style.borderColor = "#ccc";
    document.getElementById('priceId').style.backgroundColor = "#f1f1f1";
    var temp = a.replace(/,/g, '');
    var curren = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    document.getElementById("priceId").value = curren;
});
$('#nameId').keyup(function () {
    document.getElementById('nameId').style.borderColor = "#ccc";
    document.getElementById('nameId').style.backgroundColor = "#f1f1f1";
});
$('#phonenumberId').keyup(function () {
    document.getElementById('phonenumberId').style.borderColor = "#ccc";
    document.getElementById('phonenumberId').style.backgroundColor = "#f1f1f1";
});

// format price in edit form
$('#edit_price_id').keyup(function () {
    var a = $(this).val();
    document.getElementById('edit_price_id').style.borderColor = "#ccc";
    document.getElementById('edit_price_id').style.backgroundColor = "#f1f1f1";
    var temp = a.replace(/,/g, '');
    var curren = temp.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    document.getElementById("edit_price_id").value = curren;
});
$('#edit_name_id').keyup(function () {
    document.getElementById('edit_name_id').style.borderColor = "#ccc";
    document.getElementById('edit_name_id').style.backgroundColor = "#f1f1f1";
});
$('#edit_phone_id').keyup(function () {
    document.getElementById('edit_phone_id').style.borderColor = "#ccc";
    document.getElementById('edit_phone_id').style.backgroundColor = "#f1f1f1";
});

// format file
$(document).ready(function () {
    $('input[type="file"]').change(function (e) {
        var fileName = e.target.files[0].name;
        document.getElementById('Label1').innerHTML = fileName;
        document.getElementById('Label1').style.borderColor = "#ccc";
        document.getElementById('Label1').style.backgroundColor = "#f1f1f1";

        // document.getElementById('Label2').innerHTML = fileName;
        // document.getElementById('Label2').style.borderColor = "#ccc";
        // document.getElementById('Label2').style.backgroundColor = "#f1f1f1";

        document.getElementById('Label3').innerHTML = fileName;
        document.getElementById('Label3').style.borderColor = "#ccc";
        document.getElementById('Label3').style.backgroundColor = "#f1f1f1";
    });
});

//check empty upload
$('#upload').bind("click", function () {
    var imgVal = $('#imageUpload').val();
    var nameVal = $('#nameId').val();
    var priceVal = $('#priceId').val();
    var phoneNumberVal = $('#phonenumberId').val();
    var check = true;

    if (imgVal == '') {
        document.getElementById('Label1').style.borderColor = "#ff5c33";
        document.getElementById('Label1').style.backgroundColor = "#ffd6cc";
        document.getElementById('Label1').innerHTML = "Bạn chưa chọn ảnh";
        check = false;
    }

    if (nameVal == '') {
        document.getElementById('nameId').style.backgroundColor = "#ffd6cc";
        check = false;
    }

    if (priceVal == '') {
        document.getElementById('priceId').style.backgroundColor = "#ffd6cc";
        check = false;
    }

    if (phoneNumberVal == '') {
        document.getElementById('phonenumberId').style.backgroundColor = "#ffd6cc";
        check = false;
    }
    return check;
})

//check empty edit
$('#edit').bind("click", function () {
    // var imgVal = $('#edit_file_id').val();
    var nameVal = $('#edit_name_id').val();
    var priceVal = $('#edit_price_id').val();
    var phoneNumberVal = $('#edit_phone_id').val();
    var check = true;

    // if (imgVal == '') {
    //     document.getElementById('Label2').style.borderColor = "#ff5c33";
    //     document.getElementById('Label2').style.backgroundColor = "#ffd6cc";
    //     document.getElementById('Label2').innerHTML = "Bạn chưa chọn ảnh";
    //     check = false;
    // }

    if (nameVal == '') {
        document.getElementById('edit_name_id').style.backgroundColor = "#ffd6cc";
        check = false;
    }

    if (priceVal == '') {
        document.getElementById('edit_price_id').style.backgroundColor = "#ffd6cc";
        check = false;
    }

    if (phoneNumberVal == '') {
        document.getElementById('edit_phone_id').style.backgroundColor = "#ffd6cc";
        check = false;
    }
    return check;
})

// edit product
jQuery('.editbtn').on('click', function () {
    document.getElementById('id02').style.display = 'block';
    var $row = jQuery(this).closest('tr');
    var $columns = $row.find('td');

    $columns.addClass('row-highlight');
    var values = "";

    jQuery.each($columns, function (i, item) {
        if (i == 1) {
            $('.edit_id').val(item.innerHTML);
        }
        else if (i == 2) {
            $('.edit_name').val(item.innerHTML);
        }
        else if (i == 3) {
            $('.edit_price').val(item.innerHTML);
        }
        else if (i == 4) {
            $('.edit_phone').val(item.innerHTML);
        }
        else if (i == 5) {
            var temp = getFilename(item.innerHTML);
            $('.edit_file').text(temp);
        }
        else if(i==6){
            if(item.innerHTML == "Sách"){
                $("#edit_tag").val("Sách");
            }
            else if(item.innerHTML == "Đồ dùng"){
                $("#edit_tag").val("Đồ dùng");
            }
            else if(item.innerHTML == "Khác"){
                $("#edit_tag").val("Khác");
            }
            else if(item.innerHTML == "Quần áo"){
                $("#edit_tag").val("Quần áo");
            }
        }
    });
});

// handling edit image
var currentImage;
jQuery('.image').on('click', function () {
    var $row = jQuery(this).closest('tr');
    var $columns = $row.find('td');

    $columns.addClass('row-highlight');
    var values = "";

    jQuery.each($columns, function (i, item) {
        if(i == 1){
            $('.image_id').val(item.innerHTML);
        }
        if (i == 5) {
            var temp = getFilename(item.innerHTML);
            $('.edit_file').text(temp);
            currentImage = temp;
        }
    });
});
jQuery('#edit_image').on('click', function () {
    var temp = $("#Label3").text();
    if(temp == currentImage){
        document.getElementById('id04').style.display='none';
        return false;
    }
});
function getFilename(fileName){
    var temp = fileName.split("/");
    var result = temp[2].split("\"");
    return result[0];
}

// delete
jQuery('.deletebtn').on('click', function () {
    document.getElementById('id03').style.display = 'block';
    var $row = jQuery(this).closest('tr');
    var $columns = $row.find('td');

    $columns.addClass('row-highlight');
    var values = "";

    jQuery.each($columns, function (i, item) {
        if (i == 1) {
            $('#delete_id').val(item.innerHTML);
        }
        else if(i == 2){
            $('#name_product_id').text(item.innerHTML);
        }
    });
});

// Get the modal
var modal = document.getElementById('id01');
var modal2 = document.getElementById('id02');
var modal3 = document.getElementById('id03');
var modal4 = document.getElementById('id04');
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    if (event.target == modal2) {
        modal2.style.display = "none";
    }
    if (event.target == modal3) {
        modal3.style.display = "none";
    }
    if (event.target == modal4) {
        modal4.style.display = "none";
    }
}

// ID
$(document).ready(function () {
    var id = 0;
    $("tr").each(function(){
        var temp = $(this).find("td:first").html(id);
        id++;
    });
});