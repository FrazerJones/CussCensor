document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("Replace").addEventListener("click", Replace);
    document.getElementById("Part_Cens").addEventListener("click", Part_Cens);
    document.getElementById("Full_Cens").addEventListener("click", Full_Cens);
    document.getElementById("Off").addEventListener("click", Off);
  });

  JCensor = chrome.storage.local.get(["Censor"], function(result) {
        if ((result.Censor) == "Replace") {
          document.getElementById("Value").innerText = ("Replace");
          document.getElementById("Replace_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
        }
        else if ((result.Censor) == "Part_Cens") {
          document.getElementById("Value").innerText = ("Partial Censor");
          document.getElementById("Part_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
        }
        else if ((result.Censor) == "Full_Cens") {
          document.getElementById("Value").innerText = ("Full Censor");
          document.getElementById("Full_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
        }
        else if ((result.Censor) == "Off") {
          document.getElementById("Value").innerText = ("Off");
          document.getElementById("Off_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
        }
  });

  function Replace() {
    chrome.storage.local.set({Censor: "Replace"});
    document.getElementById("Value").innerText = ("Replace");
    document.getElementById("Replace_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
  }

  function Part_Cens() {
    chrome.storage.local.set({Censor: "Part_Cens"});
    document.getElementById("Value").innerText = ("Partial Censor");
    document.getElementById("Part_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
  }

  function Full_Cens() {
    chrome.storage.local.set({Censor: "Full_Cens"});
    document.getElementById("Value").innerText = ("Full Censor");
    document.getElementById("Full_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
  }

  function Off() {
    chrome.storage.local.set({Censor: "Off"});
    document.getElementById("Value").innerText = ("Off");
    document.getElementById("Off_Div").style.backgroundColor = "rgba(0, 255, 255, 0.24)";
  }

  function handleText(textNode) {
    var v = textNode.nodeValue;
  
    var cuss = ["fucking", "fucked", "arse", "ass", "asshole", "bitch", "bullshit", "cock", "crap", "cunt", "fuck", "horseshit", "motherfucker", "fucker", "nigga", "nigger", "piss", "prick", "shit", "shitass", "slut", "whore", "twat", "Fucking", "Fucked", "Arse", "Ass", "Asshole", "Bitch", "Bullshit", "Cock", "Crap", "Cunt", "Fuck", "Horseshit", "Motherfucker", "Fucker", "Nigga", "Nigger", "Piss", "Prick", "Shit", "Shitass", "Slut", "Whore", "Twat"]
  
    var cussReplace = ["fudging", "fudged", "butt", "butt", "butt", "female dog", "poo",  "penis", "poo", "vagina", "fudge", "poo", "fudger", "fudger", "black person", "black person", "pee", "penis", "poo", "poo", "person", "person", "vagina", "Fudging", "Fudged", "Butt", "Butt", "Butt", "Female dog", "Poo",  "Penis", "Poo", "Vagina", "Fudge", "Poo", "Fudger", "Fudger", "Black person", "Black person", "Pee", "Penis", "Poo", "Poo", "Person", "Person", "Vagina"]
    var cussFullCens = ["*******", "******", "****", "***", "*******", "*****", "********", "****", "****", "****", "****", "*********", "***********", "******", "*****", "******", "****", "*****", "****", "*******", "****", "*****", "****", "*******", "******", "****", "***", "*******", "*****", "********", "****", "****", "****", "****", "*********", "***********", "******", "*****", "******", "****", "*****", "****", "*******", "****", "*****", "****"]
    var cussPartCens = ["f*cking", "f*cked", "a*se", "a**", "a**hole", "b*tch", "bullsh*t", "c*ck", "cr*p", "c*nt", "f*ck", "horsesh*t", "motherf*cker", "f*cker", "n*gga", "n*gger", "p*ss", "pr*ck", "sh*t", "sh*ta**", "sl*t", "wh*re", "tw*t", "F*cking", "F*cked", "A*se", "A**", "A**hole", "B*tch", "Bullsh*t", "C*ck", "Cr*p", "C*nt", "F*ck", "Horsesh*t", "Motherf*cker", "F*cker", "N*gga", "N*gger", "P*ss", "Pr*ck", "Sh*t", "Sh*ta**", "Sl*t", "Wh*re", "Tw*t"]
  
    JCensor = chrome.storage.local.get(["Censor"], function(result) {
      for (i = 0; i <= cuss.length; i++) {
        if (result.Censor == "Replace") {
          v = v.replace(" " + cuss[i] + " "," " + cussReplace[i] + " ")
        }
        else if (result.Censor == "Full_Cens") {
          v = v.replace(" " + cuss[i] + " "," " + cussFullCens[i] + " ")
        }
        else if (result.Censor == "Part_Cens") {
          v = v.replace(" " + cuss[i] + " "," " + cussPartCens[i] + " ")
        }
        else {

        }
      }
        textNode.nodeValue = v;
      });
    textNode.nodeValue = v;
  }
  
  function walk(node) {
    var child, next;
  
    switch (node.nodeType) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while (child) {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;
  
    case 3: // Text node
      handleText(node);
      break;
    }
  }
  
  walk(document.body);
  
  
  
  
  