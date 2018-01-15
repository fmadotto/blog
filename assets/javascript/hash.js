$(document).ready(function() {
  
    // hash
    var $inputText = $("#inputText"),
      $outputHash = $("#outputHash");
  
    $inputText.keyup(function() {
      $outputHash.val(CryptoJS.SHA256($inputText.val()).toString());
  
      if ($outputHash.val() === CryptoJS.SHA256("Hello, world!").toString()) {
        $outputHash.css("border-color","#5cb85c");
        $outputHash.css("background-color","rgba(92,184,92,0.2)");
      } else if ($outputHash.val() === "8d2de0e5adc70f24ca39da628d785f8a6f987e8e46078f222ad66b57e88d6397") {
        $outputHash.css("border-color","#d9534f");
        $outputHash.css("background-color","rgba(217,83,79,0.2)");
      } else {
        $outputHash.css("border-color","rgba(0,0,0,.15)");
        $outputHash.css("background-color","transparent");
      }
  
    });

  // dummy calculator
  var $buttons = $(".number"),
  $result = $("#calculator-display-content"),
  $hash = $("#hash"),
  $clear = $("#clear");
  var computed = false;

  $clear.click(function () {
    $result.text("");
    computed = false;
  });

  $hash.click(function () {
    var hash = CryptoJS.SHA256($result.text()).toString();
    var decimalHash = parseInt(hash, 16);
    var reducedHash = decimalHash % 100000;
    $result.text(reducedHash);
    computed = true;
  });

  $buttons.each(function() {
    $(this).click(function () {
      if (computed) {
        $result.text("");
        computed = false;
      }
      var $buttonContent = $(this).text();
      $result.append($buttonContent);
    });
  });

});