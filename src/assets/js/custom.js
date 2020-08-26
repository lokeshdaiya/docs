// var signatureSettings = {
//   signerName: "Tim Typer",
//   signerInitials: "TT",
//   uniqueId: "12345-ABCDE",
//   redirectUrlAfterSignature: null,
//   ownerName: "Document Requestor",
//   signatureBoxName: "txsign",
//   showSignatureBar: true
// }

function addSignaturePane() {
  TXTextControl.applicationFields.add(
    TXTextControl.ApplicationFieldFormat.MSWord,
    "MERGEFIELD",
    "FieldText",
    ["FieldName"],
    af => {
      var highlightColor = "rgba(9, 165, 2, 0.3)";
      var highlightMode = TXTextControl.HighlightMode.Always;

      af.setHighlightColor(highlightColor);
      af.setHighlightMode(highlightMode);
    }
  );
  TXTextControl.applicationFields.forEach(function (appField) {
    appField.getName(function (name) {
      console.log(name)
    });
  })
  // var settings = new SignatureSettings();

  // // settings.Dock = DocumentViewerSettings.DockStyle.Fill;
  // // settings.IsSelectionActivated = false;
  // // settings.ShowThumbnailPane = true;
  // // settings.SignatureSettings = new SignatureSettings();
  // // settings.SignatureSettings.OwnerName = "Paul Paulsen";
  // // settings.SignatureSettings.ShowSignatureBar = true;

  // //TXTextControl.addMergeField(mergeField);
  // TXTextControl.DocumentViewer.SignatureSettings = new SignatureSettings();
  // return false;
  // TXTextControl().DocumentViewer(settings => {
  //   settings.DocumentPath = Server.MapPath("~/App_Data/Documents/nda.tx");
  //   settings.Dock = DocumentViewerSettings.DockStyle.Fill;
  //   settings.IsSelectionActivated = false;
  //   settings.ShowThumbnailPane = true;
  //   settings.SignatureSettings = new SignatureSettings();
  //   settings.SignatureSettings.OwnerName = "Paul Paulsen";
  //   settings.SignatureSettings.ShowSignatureBar = true;
  // }).Render();

  // TXTextControl.TextFieldCollection.TextFieldEnumerator fieldEnum = textControl1.TextFields.GetEnumerator();
  // int fieldCounter = textControl1.TextFields.Count;

  // for (int i = 0; i <= fieldCounter; i++) {
  //   fieldEnum.MoveNext();
  //   TXTextControl.TextField curField = (TXTextControl.TextField) fieldEnum.Current;
  //   textControl1.TextFields.Remove(curField);
}


function saveDocument() {
  return new Promise(resolve => {
    TXTextControl.saveDocument(TXTextControl.StreamType.InternalUnicodeFormat, function (e) {
      resolve(e.data);
    });
  });
}

function downloadDocument() {
  TXTextControl.saveDocument(TXTextControl.StreamType.AdobePDF, function (e) {
    bDocument = e.data;

    var element = document.createElement('a');
    element.setAttribute('href', 'data:application/octet-stream;base64,' + e.data);
    element.setAttribute('download', "document.pdf");

    element.style.display = 'none';
    document.body.appendChild(element);
    //console.log(e.data, 'e.data');

    // TXTextControl.LocaleDialog('HI');

    element.click();



    document.body.removeChild(element);
  });
}

function loadDocument(document) {
  var html = document;

  var encoded = btoa(html); // btoa base-64-encodes strings.

  //if (html === true) {
  //  addTextFormField();
  //TXTextControl.loadDocument(TXTextControl.StreamType.HTMLFormat, encoded);
  TXTextControl.loadDocument(TXTextControl.streamType.InternalUnicodeFormat, document);

  //var documentData: TXTextControl.loadDocument(TXTextControl.streamType.InternalUnicodeFormat, document)

  // }
  // TXTextControl.loadDocument(TXTextControl.StreamType.HTMLFormat,
  //   '<strong>Test</strong>');
}

// function loadDocument(document) {
//   TXTextControl.loadDocument(TXTextControl.streamType.InternalUnicodeFormat, document);
// }

function insertField(name) {
  var mergeField = new TXTextControl.MergeField();

  mergeField.name = name;
  mergeField.text = [name];
  mergeField.value = [name];

  TXTextControl.addMergeField(mergeField);
  // var bounds = {
  //   "start": 5,
  //   "length": 0
  // };
  // TXTextControl.selection.setBounds(bounds);
}

function deleteField(name) {
  TXTextControl.getTextFields(function (e) {
    if (e[0] != undefined)
      TXTextControl.removeTextField(e[0])
  }, true);
}


function readDocument(input) {

  if (input.target.files && input.target.files[0]) {
    var fileReader = new FileReader();
    fileReader.onload = function (e) {

      var streamType = TXTextControl.streamType.PlainText;

      // set the StreamType based on the lower case extension
      switch (fileinput.value.split('.').pop().toLowerCase()) {
        case 'doc':
          streamType = TXTextControl.streamType.MSWord;
          break;
        case 'docx':
          streamType = TXTextControl.streamType.WordprocessingML;
          break;
        case 'rtf':
          streamType = TXTextControl.streamType.RichTextFormat;
          break;
        case 'htm':
          streamType = TXTextControl.streamType.HTMLFormat;
          break;
        case 'tx':
          streamType = TXTextControl.streamType.InternalUnicodeFormat;
          break;
        case 'pdf':
          streamType = TXTextControl.streamType.AdobePDF;
          break;
      }

      // load the document beginning at the Base64 data (split at comma)
      TXTextControl.loadDocument(streamType, e.target.result.split(',')[1]);
    };

    // read the file and convert it to Base64
    fileReader.readAsDataURL(input.target.files[0]);
  }
}

//form-fields
var emptyWidth = 1000;

function addDropDownFormField() {

  TXTextControl.formFields.getCanAdd(canAdd => {
    if (canAdd) {

      // Add form field
      TXTextControl.formFields.addSelectionFormField(emptyWidth, ff => {
        var genders = ["Male", "Female"];

        // Prevent setting custom text.
        ff.setEditable(false);

        // Set dropdown items.
        ff.setItems(genders);

        // Select second entry.
        ff.setSelectedIndex(0);
      });
    } else {
      $('.alert').show().delay(3000).fadeOut(300);
    }
  });
}

/**
 * Adds a TextFormField.
 */
function addTextFormField() {
  TXTextControl.formFields.getCanAdd(canAdd => {
    if (canAdd) {

      // Add form field
      // TXTextControl.formFields.addTextFormField(emptyWidth);

      var fieldCounter = 5;

      for (i = 0; i <= fieldCounter; i++) {

        //fieldEnum.MoveNext();
        //TXTextControl.TextField
        //curField = (TXTextControl.TextField)
        //fieldEnum.Current;
        TXTextControl.formFields.addTextFormField(emptyWidth);
        //textControl1.TextFields.Remove(curField);
      }

    } else {
      $('.alert').show().delay(3000).fadeOut(300);
    }
  });
}

/**
 * Adds a CheckFormField.
 */
function addCheckFormField() {
  TXTextControl.formFields.getCanAdd(canAdd => {
    if (canAdd) {

      // Add form field
      TXTextControl.formFields.addCheckFormField(true);

    } else {
      $('.alert').show().delay(3000).fadeOut(300);
    }
  });
}

/**
 * Adds a SelectionFormField as ComboBox with a set of different make brands.
 */
function addComboFormField() {

  TXTextControl.formFields.getCanAdd(canAdd => {
    if (canAdd) {

      // Add form field
      TXTextControl.formFields.addSelectionFormField(emptyWidth, ff => {


        var cars = ["Porsche", "Ford", "Daimler", "Mercedes", "Hyundai"];

        // Allow setting custom text.
        ff.setEditable(true);

        // Set drop down items.
        ff.setItems(cars);

        // Select
        ff.setSelectedIndex(4);
      });
    } else {
      $('.alert').show().delay(3000).fadeOut(300);
    }
  });
}

/**
 * Adds a DateFormField.
 */
function addDateFormField() {
  TXTextControl.formFields.getCanAdd(canAdd => {
    if (canAdd) {

      // Add form field
      TXTextControl.formFields.addDateFormField(emptyWidth);
    } else {
      $('.alert').show().delay(3000).fadeOut(300);
    }
  });
}

function looping() {

  TXTextControl.TextFieldCollection.TextFieldEnumerator;
  fieldEnum = textControl1.TextFields.GetEnumerator();
  var fieldCounter = textControl1.TextFields.Count;

  for (i = 0; i <= fieldCounter; i++) {

    fieldEnum.MoveNext();
    TXTextControl.TextField
    curField = (TXTextControl.TextField)
    fieldEnum.Current;
    textControl1.TextFields.Remove(curField);
  }
}

function loadData(JsonData) {
  TXTextControl.addEventListener("textControlLoaded", function () {
    TXTextControl.loadJsonData(JSON.stringify(JsonData));
  });



}

function changeData(JsonData) {
  TXTextControl.loadJsonData(JSON.stringify(JsonData));
}

function readDocument2(input, docName) {

  //input = input.srcElement;

  //if (input.files && input.files[0]) {
  //var fileReader = new FileReader();
  //var signatureSettings = {}

  //fileReader.onload = function (e) {
  //loadDocument
  // TXDocumentViewer.loadDocument(
  //   input.split(',')[1],
  //   'abc',
  // );
  //};
  var signatureSettings = {
    showSignatureBar: true,
    signatureBoxName: 'txsign',
    redirectUrlAfterSignature: false,
    ownerName: 'Sujal',
    signerName: 'Sujal',
    signerInitials: 'SR'
  }

  var base64 = 'data:application/msword;base64,' + input;
  TXDocumentViewer.loadDocument(base64.split(',')[1], "abc",
    signatureSettings);
  TXDocumentViewer.setSubmitCallback(exportPDF, docName);
  localStorage.setItem('docName', docName);
  // read the file and convert it to Base64
  //fileReader.readAsDataURL(input.files[0]);
  // }

}

// set the callback method after submit


function exportPDF(e, docName) {
  console.log('coming', e);
  console.log('coming', JSON.stringify(e));

  var data = {};

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://40.87.9.103:8080/api/docapi/savedocument", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      // Response
      var response = this.responseText;
      console.log('response', response);
    }
  };

  // var data = {name:'yogesh',salary: 35000,email: 'yogesh@makitweb.com'};
  e.name = localStorage.getItem('docName');
  xhttp.send(JSON.stringify(e));
}


$(document).on('click', '.panel-heading span.clickable', function (e) {
  var $this = $(this);
  if (!$this.hasClass('panel-collapsed')) {
    $this.parents('.panel').find('.panel-body').slideUp();
    $this.addClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');

  } else {
    $this.parents('.panel').find('.panel-body').slideDown();
    $this.removeClass('panel-collapsed');
    $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');

  }
})
